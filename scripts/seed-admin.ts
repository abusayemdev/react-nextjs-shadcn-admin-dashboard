import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  const email = "admin@example.com";

  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: "Admin",
      email,
      password: "123456789",
    },
  });

  console.log("Admin created:", result.user.email);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });