import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditUserForm } from "./edit-form";

export default async function EditUserPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const user = await db.query.users.findFirst({
    where: eq(users.id, slug),
    columns: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
    },
  });

  if (!user) notFound();

  const { id, ...initialData } = user;

  return <EditUserForm userId={id} initialData={initialData} />;
}