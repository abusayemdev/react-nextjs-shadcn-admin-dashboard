"use server";

import { auth } from "@/lib/auth";
import { getSessionUser, requireAdmin } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { User, NewUser, UpdateUserInput } from "@/lib/types";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as z from "zod";


const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(8, "Phone must be at least 8 characters").or(z.literal("")).optional(),
  role: z.enum(["admin", "user"]).optional(),
});

const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 characters").or(z.literal("")).optional(),
  role: z.enum(["admin", "user"]).optional(),
  status: z.enum(["true", "false"]).transform((val) => val === "true"),
});

export type UserInput = {
    name: string;
    email: string;
    phone?: string | null;
    role: "admin" | "user";
    status: boolean;

}


export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role: "admin" | "user";
  status: boolean;
};



export async function getUsers() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if(!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "You must be an admin to get users data.",
        data: [],
      }
    }

    const usersData = await db.select().from(users).orderBy(desc(users.createdAt));

    return { 
      success: true, 
      data: usersData 
    };

  } catch (error) {
    console.error("Get users error:", error);

    return {
      success: false,
      message: "Failed to get users data",
      data: [],
    };
  }

}

export async function createUser(input: CreateUserInput) {
  try {
    // auth check
    await requireAdmin();

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, input.email),
    });

    if (existingUser) {
      return {
        success: false,
        message: "A user with this email already exists.",
      };
    }

    // 3. Create the account via Better Auth
    const newUser = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
      },
    });

    if (!newUser?.user?.id) {
      return {
        success: false,
        message: "Failed to create user account.",
      };
    }

    // Update custom fields (role, phone, status)
    // signUpEmail doesn't accept these, so we update after creation
    await db
      .update(users)
      .set({
        role: input.role,
        phone: input.phone?.trim() || null,
        status: input.status,
      })
      .where(eq(users.id, newUser.user.id));

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User created successfully.",
    };
  } catch (error: any) {
    console.error("Create user error:", error);

    if (error.message === "Forbidden") {
      return {
        success: false,
        message: "You must be an admin to create users.",
      };
    }
    if (error.message === "Unauthorized") {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    // Better Auth duplicate email error (fallback)
    if (error.message?.includes("already exists")) {
      return {
        success: false,
        message: "A user with this email already exists.",
      };
    }

    return {
      success: false,
      message: error.message || "Failed to create user.",
    };
  }
}


export async function getUser(userId: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "User fetched successfully",
      data: user,
    };

  } catch (error: any) {
    console.error("Error:", error);
    return {
      success: false,
      message: "Failed to fetch user",
      data: null,
    };
  }
}


export async function updateUser(userId: string, input: UserInput) {

    try {
      //auth check
      const sessionUser = await getSessionUser();
      if (!sessionUser) {
        return {
          success: false,
          message: "You must be logged in.",
        };
      }

      //get the user
      const user = await getUser(userId);
      if (!user.success || !user.data) {
        return {
          success: false,
          message: "User not found.",
        };
      }

      //check the owner of the user
      const isAdmin = sessionUser.role === "admin";
      const isOwner = user.data.id === sessionUser.id;

      if (!isAdmin && !isOwner) {
        return {
          success: false,
          message: "You can only edit your own profile.",
        };
      }

      //check requested email is existed or not 
      if (input.email !== user.data.email) {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, input.email),
        });

        if (existingUser && existingUser.id !== userId) {
          return {
            success: false,
            message: "A user with this email already exists.",
          };
        }
      }

      await db.update(users)
              .set({
                  name: input.name,
                  email: input.email,
                  phone: input.phone?.trim() || null,
                  ...(isAdmin && { role: input.role }),
                  updatedAt: new Date(),
              })
              .where(eq(users.id, userId));


      revalidatePath("/admin/users");
      revalidatePath(`/admin/users/${userId}/edit`);

      return {
        success: true,
        message: "User updated successfully",
      };
  } catch (error) {
      console.error("Update user error:", error);
      return {
        success: false,
        message: "Failed to update user",
      };
  }
}


export async function deleteUser(userId: string) {
  try {
    //check Auth
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { success: false, message: "You must be logged in." };
    }

    // Admin check
    if (sessionUser.role !== "admin") {
      return { success: false, message: "You must be an admin to delete users." };
    }

    // Cannot delete self
    if (sessionUser.id === userId) {
      return { success: false, message: "You cannot delete your own account." };
    }

    // get user
    const user = await getUser(userId);
    if (!user.success || !user.data) {
      return { success: false, message: "User not found." };
    }

    // Delete via Better Auth (cascades sessions, accounts)
    await auth.api.removeUser({
      body: { userId },
      headers: await headers(),
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully." };
  } catch (e: any) {
    console.error("Delete user error:", e);
    return {
      success: false,
      message: e.message || "Failed to delete user.",
    };
  }
}