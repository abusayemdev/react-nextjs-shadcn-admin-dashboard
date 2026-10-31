import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { post } from "./schema";

//get all posts
export async function getAllPosts() {
  try {
    const allPosts = await db.query.post.findMany({
      orderBy: [desc(post.createdAt)],
      with: {
        author: true,
      },
    });

    return allPosts;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const firstPost = await db.query.post.findFirst({
      where: eq(post.slug, slug),
      with: {
        author: true,
      },
    });

    return firstPost;
  } catch (e) {
    console.log(e);
    return null;
  }
}
