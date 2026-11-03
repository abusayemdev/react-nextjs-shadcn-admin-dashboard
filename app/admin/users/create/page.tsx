"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { DynamicForm } from "@/components/dynamicForm";
import { FieldConfig } from "@/lib/types";
import { createUser } from "@/app/actions/user-actions";


const userFields: FieldConfig[] = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
    schema: z.string().min(3, "Name must be at least 3 characters"),
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    schema: z.string().email("Invalid email"),
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "••••••••",
    schema: z.string().min(8, "Password must be at least 8 characters"),
    required: true,
  },
  {
    name: "phone",
    type: "text",
    label: "Phone (Optional)",
    placeholder: "+1 555-0000",
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


export default function CreateUserPage() {
  const router = useRouter();

  const onSubmit = async (values: Record<string, unknown> | FormData) => {
    const result = await createUser(values);

    if (result.success) {
      router.push("/admin/users");
      router.refresh();
    } else {
      alert(result.message);
    }
  };

  return (
    <DynamicForm
      mode="create"
      title="Create User"
      breadcrumbItems={[
        { label: "Dashboard", href: "/admin/dashboard" },
        { label: "Users", href: "/admin/users" },
        { label: "Create" },
      ]}
      backUrl="/admin/users"
      backLabel="User Index"
      fields={userFields}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "user",
      }}
      onSubmit={onSubmit}
      columns={2}
    />
  );
}