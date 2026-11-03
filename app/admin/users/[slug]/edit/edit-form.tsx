"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { DynamicForm } from "@/components/dynamicForm";
import { FieldConfig, NewUser, UpdateUserInput } from "@/lib/types";
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
    schema: z.string().min(8, "Too short").or(z.literal("")).nullable().optional(),
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



export function EditUserForm({ userId, initialData } : {
  userId: string;
  initialData: UpdateUserInput;
}) {
  const router = useRouter();

  const onSubmit = async (values: UpdateUserInput) => {
    const result = await updateUser(userId, values);

    if (result.success) {
      router.push("/admin/users");
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
        { label: "Users", href: "/admin/users" },
        { label: "Edit" },
      ]}
      backUrl="/admin/users"
      backLabel="User Index"
      fields={userFields}
      defaultValues={initialData}
      onSubmit={onSubmit}
      columns={2}
    />
  );
}