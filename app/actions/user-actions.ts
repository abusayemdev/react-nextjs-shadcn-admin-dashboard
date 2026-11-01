"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as z from "zod";

// ==========================================
// ZOD SCHEMAS
// ==========================================
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
});

// ==========================================
// CREATE USER
// ==========================================
export async function createUser(values: Record<string, unknown> | FormData) {
  try {
    // 1. Auth check — only admins can create users
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "You must be an admin to create a user",
      };
    }

    // 2. Parse form data
    const rawData =
      values instanceof FormData
        ? Object.fromEntries(values.entries())
        : values;

    const parsedData = createUserSchema.parse(rawData);

    // 3. Create account via Better Auth (handles password hashing)
    const newUser = await auth.api.signUpEmail({
      body: {
        name: parsedData.name,
        email: parsedData.email,
        password: parsedData.password,
      },
    });

    // 4. Update custom fields (role & phone) — signUpEmail doesn't accept them
    const needsUpdate =
      (parsedData.role && parsedData.role !== "user") ||
      (parsedData.phone && parsedData.phone.trim() !== "");

    if (needsUpdate) {
      await db
        .update(users)
        .set({
          role: parsedData.role || "user",
          phone:
            parsedData.phone && parsedData.phone.trim() !== ""
              ? parsedData.phone
              : null,
        })
        .where(eq(users.id, newUser.user.id));
    }

    // 5. Revalidate cache
    revalidatePath("/admin/user");

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (e: any) {
    console.error("Create user error:", e);

    // Handle Better Auth duplicate email error gracefully
    if (e.message?.includes("already exists")) {
      return {
        success: false,
        message: "A user with this email already exists",
      };
    }

    return {
      success: false,
      message: e.message || "Failed to create user",
    };
  }
}

// ==========================================
// UPDATE USER
// ==========================================
export async function updateUser(
  userId: string,
  values: Record<string, unknown> | FormData
) {
  try {
    // 1. Auth check
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to edit a user",
      };
    }

    // 2. Parse form data
    const rawData =
      values instanceof FormData
        ? Object.fromEntries(values.entries())
        : values;

    const parsedData = updateUserSchema.parse(rawData);

    // 3. Check if email is taken by another user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, parsedData.email),
    });

    if (existingUser && existingUser.id !== userId) {
      return {
        success: false,
        message: "A user with this email already exists",
      };
    }

    // 4. Check if target user exists
    const userToUpdate = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!userToUpdate) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // 5. Authorization — only admins or the user themselves can edit
    if (session.user.role !== "admin" && userToUpdate.id !== session.user.id) {
      return {
        success: false,
        message: "You can only edit your own profile",
      };
    }

    // 6. Update DB
    await db
      .update(users)
      .set({
        name: parsedData.name,
        email: parsedData.email,
        phone:
          parsedData.phone && parsedData.phone.trim() !== ""
            ? parsedData.phone
            : null,
        ...(parsedData.role && { role: parsedData.role }),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // 7. Revalidate
    revalidatePath("/admin/user");
    revalidatePath(`/admin/user/${userId}/edit`);

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (e: any) {
    console.error("Update user error:", e);
    return {
      success: false,
      message: e.message || "Failed to update user",
    };
  }
}

// ==========================================
// DELETE USER
// ==========================================
export async function deleteUser(userId: string) {
  try {
    // 1. Auth check
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to delete a user",
      };
    }

    // 2. Check if target user exists
    const userToDelete = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!userToDelete) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // 3. Authorization — only admins can delete, and you can't delete yourself
    if (session.user.role !== "admin") {
      return {
        success: false,
        message: "You must be an admin to delete a user",
      };
    }

    if (session.user.id === userId) {
      return {
        success: false,
        message: "You cannot delete your own account",
      };
    }

    // 4. Delete from DB
    await db.delete(users).where(eq(users.id, userId));

    // 5. Revalidate
    revalidatePath("/admin/user");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (e: any) {
    console.error("Delete user error:", e);
    return {
      success: false,
      message: e.message || "Failed to delete user",
    };
  }
}