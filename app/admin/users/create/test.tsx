"use client";

import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10).max(15),
  location: z.string().min(2),
  role: z.enum(["admin", "user"]),
});

type FormValues = z.infer<typeof formSchema>;

const CreateUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      role: "user",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("submit", values);
    // call your API / server action here
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AppBreadcrumb
            items={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Users", href: "#" },
            { label: "Create" },
            ]}
        />

        <Button size="sm" render={
            <Link href="#"> User Index</Link>
        }>
          
        </Button>
        </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create User</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4 mb-8">
              <Controller
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Field className="">
                    <Input id="name" {...field} placeholder="name" />
                    <FieldError></FieldError>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Field className="">
                    <Input id="email" {...field} placeholder="email" />
                    <FieldError></FieldError>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <Field className="">
                    <Input id="phone" {...field} placeholder="phone" />
                    <FieldError></FieldError>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                  <Field className="">
                    <Input id="location" {...field} placeholder="location" />
                    <FieldError></FieldError>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                  <Field className="">
                    <FieldLabel htmlFor="role">Role </FieldLabel>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user"> User </SelectItem>
                          <SelectItem value="admin"> Admin </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUser;
