"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  try {
    //get the current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must be logged in to create a post",
      };
    }

    //get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    // homework -> implement a extra validation check

    //create the slug from post title
    const slug = slugify(title);

    //check if the slug already exists
    const existingPost = await db.query.post.findFirst({
      where: eq(post.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with the same title already exists! Please try with a diff one",
      };
    }

    const [newPost] = await db
      .insert(post)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    //revalidate the homepage to get the latest posts
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully",
      slug,
    };
  } catch (e) {
    console.log(e, "failed to add");

    return {
      success: false,
      message: "Failed to create new post",
    };
  }
}

export async function updatePost(postId: number, formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must logged in to edit a post!",
      };
    }

    //get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    // homework -> implement a extra validation check

    const slug = slugify(title);
    const existingPost = await db.query.post.findFirst({
      where: and(eq(post.slug, slug), ne(post.id, postId)),
    });

    if (existingPost) {
      return {
        success: false,
        message: "A post with this title already exists",
      };
    }

    const postToUpdate = await db.query.post.findFirst({
      where: eq(post.id, postId),
    });

    if (postToUpdate?.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only edit your own posts!",
      };
    }

    await db
      .update(post)
      .set({
        title,
        description,
        content,
        slug,
        updatedAt: new Date(),
      })
      .where(eq(post.id, postId));

    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post edited succesfully",
      slug,
    };
  } catch (e) {
    console.log(e, "failed to edit");

    return {
      success: false,
      message: "Failed to create new post",
    };
  }
}

export async function deletePost(postId: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must logged in to delete post",
      };
    }

    const postToDelete = await db.query.post.findFirst({
      where: eq(post.id, postId),
    });

    if (!postToDelete) {
      return {
        success: false,
        message: "Post not found",
      };
    }
    if (postToDelete?.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only delete your own posts!",
      };
    }

    await db.delete(post).where(eq(post.id, postId));

    revalidatePath("/");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (e) {
    console.log(e, "failed to edit");

    return {
      success: false,
      message: "Failed to create new post",
    };
  }
}
