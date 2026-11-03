"use client";

import React, { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, DefaultValues } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { DynamicFormProps, FieldConfig } from "@/lib/types/index";

export function DynamicForm({
  mode = "create",
  title,
  breadcrumbItems,
  backUrl,
  backLabel,
  fields,
  defaultValues,
  onSubmit,
  submitLabel,
  columns = 2,
  isLoading = false,
}: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamically build the Zod schema from field configs
  const formSchema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};
    fields.forEach((field) => {
      shape[field.name] = field.schema || z.any();
    });
    return z.object(shape);
  }, [fields]);

  type FormValues = z.infer<typeof formSchema>;

  // Initialize the form with the provided default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (defaultValues ?? {}) as DefaultValues<FormValues>,
  });

  // Handle form submission — pass plain values directly to onSubmit
  const handleFormSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values as Record<string, unknown>);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render a single field based on its config
  const renderField = (fieldConfig: FieldConfig) => {
    return (
      <Controller
        key={fieldConfig.name}
        control={form.control}
        name={fieldConfig.name as any}
        render={({ field, fieldState }) => (
          <Field>
            {fieldConfig.label && (
              <FieldLabel htmlFor={fieldConfig.name}>
                {fieldConfig.label}
                {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
              </FieldLabel>
            )}

            {fieldConfig.type === "select" ? (
              <Select
                onValueChange={field.onChange}
                value={(field.value as string) ?? ""}
                disabled={isSubmitting || isLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={fieldConfig.placeholder || "Select an option"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {fieldConfig.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={fieldConfig.name}
                type={fieldConfig.type}
                disabled={isSubmitting || isLoading}
                placeholder={fieldConfig.placeholder}
                onChange={(e) => {
                  // Keep raw values in state — parent decides how to handle files
                  if (fieldConfig.type === "file") {
                    field.onChange(e.target.files ?? undefined);
                  } else {
                    field.onChange(e);
                  }
                }}
                value={
                  fieldConfig.type === "file"
                    ? undefined
                    : (field.value as string) ?? ""
                }
              />
            )}

            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
    );
  };

  const gridCols: Record<1 | 2 | 3, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
  };

  const finalTitle = title || (mode === "create" ? "Create Record" : "Edit Record");
  const finalSubmitLabel =
    submitLabel || (mode === "create" ? "Create" : "Update");
  const isDisabled = isSubmitting || isLoading;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AppBreadcrumb items={breadcrumbItems} />
        <Button
          size="sm"
          className="me-4"
          render={<Link href={backUrl}>{backLabel}</Link>}
        />
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-semibold">{finalTitle}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FieldGroup
              className={`grid grid-cols-1 ${gridCols[columns]} gap-6 mt-4 mb-8`}
            >
              {fields.map(renderField)}
            </FieldGroup>

            <Button type="submit" disabled={isDisabled}>
              {isSubmitting ? "Saving..." : finalSubmitLabel}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}