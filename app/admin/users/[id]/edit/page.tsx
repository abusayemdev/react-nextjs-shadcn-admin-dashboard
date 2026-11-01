import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditUserForm } from "./edit-form";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  // 1. Fetch from DB
  const user = await db.query.users.findFirst({
    where: eq(users.id, params.id),
  });

  if (!user) notFound();

  // 2. Pass DB data to the client form
  return <EditUserForm initialData={user} />;
}