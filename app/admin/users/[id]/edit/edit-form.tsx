"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { DynamicForm } from "@/components/dynamicForm";
import { FieldConfig } from "@/lib/types/index";
import { updateUser } from "@/app/actions/user-actions";

const userFields: FieldConfig[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    schema: z.string().min(3, "Too short"),
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    schema: z.string().email("Invalid email"),
    required: true,
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    schema: z.string().min(8, "Too short").or(z.literal("")).optional(),
    required: false,
  },
  {
    name: "role",
    type: "select",
    label: "Role",
    schema: z.enum(["admin", "user"]),
    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" },
    ],
    required: true,
  },
];

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "admin" | "user";
};

export function EditUserForm({ initialData }: { initialData: User }) {
  const router = useRouter();

  const onSubmit = async (values: Record<string, unknown> | FormData) => {
    const result = await updateUser(initialData.id, values);

    if (result.success) {
      router.push("/admin/user");
      router.refresh();
    } else {
      alert(result.message);
    }
  };

  return (
    <DynamicForm
      mode="edit"
      title={`Edit User: ${initialData.name}`}
      breadcrumbItems={[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Users", href: "/admin/user" },
        { label: "Edit" },
      ]}
      backUrl="/admin/user"
      backLabel="Back"
      fields={userFields}
      defaultValues={initialData}
      onSubmit={onSubmit}
      columns={2}
    />
  );
}