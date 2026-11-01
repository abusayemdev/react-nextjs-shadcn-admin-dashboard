
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seedAdmin() {
  const { auth } = await import("@/lib/auth");
  const { db } = await import("@/lib/db");
  const { users } = await import("@/lib/db/schema");
  const { eq } = await import("drizzle-orm");

  const email = "admin@example.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password || password.length < 9) {
    throw new Error("ADMIN_PASSWORD must contain at least 9 characters.");
  }

  // Check existing user
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    if (existingUser.role !== "admin") {
      await db
        .update(users)
        .set({ role: "admin" })
        .where(eq(users.id, existingUser.id));
    }

    console.log(`Admin already exists: ${email}`);
    return;
  }

  // Register admin through Better Auth
  const result = await auth.api.signUpEmail({
    body: {
      name: "Admin",
      email,
      password,
    },
  });

  if (!result.user) {
    throw new Error("Admin registration failed.");
  }

  // Assign admin role
  await db
    .update(users)
    .set({ role: "admin" })
    .where(eq(users.id, result.user.id));

  console.log(`Admin created successfully: ${email}`);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Admin seeding failed:", error);
    process.exit(1);
  });
