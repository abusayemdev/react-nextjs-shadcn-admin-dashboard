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
}: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Dynamically build the Zod schema
  const formSchema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};
    fields.forEach((field) => {
      shape[field.name] = field.schema || z.any();
    });
    return z.object(shape);
  }, [fields]);

  type FormValues = z.infer<typeof formSchema>;

  // 2. Initialize the form with the DB data directly
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<FormValues>,
  });

  // 3. Handle form submission
  const handleFormSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const hasFiles = fields.some((f) => f.type === "file");

      if (hasFiles) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value instanceof FileList) {
            if (value.length > 0) formData.append(key, value[0]);
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        await onSubmit(formData);
      } else {
        await onSubmit(values as Record<string, unknown>);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Render inputs
  const renderField = (fieldConfig: FieldConfig) => {
    return (
      <Controller
        key={fieldConfig.name}
        control={form.control}
        name={fieldConfig.name as any}
        render={({ field, fieldState }) => (
          <Field className="">
            {fieldConfig.label && (
              <FieldLabel htmlFor={fieldConfig.name}>
                {fieldConfig.label}
                {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
              </FieldLabel>
            )}

            {fieldConfig.type === "select" ? (
              <Select
                onValueChange={field.onChange}
                value={field.value as string} 
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder={fieldConfig.placeholder || "Select an option"} />
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
                disabled={isSubmitting}
                placeholder={fieldConfig.placeholder}
                onChange={(e) => {
                  if (fieldConfig.type === "file") {
                    field.onChange(e.target.files);
                  } else {
                    field.onChange(e);
                  }
                }}
                value={fieldConfig.type === "file" ? undefined : (field.value as string) || ""}
              />
            )}

            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
    );
  };

  const gridCols = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3" };
  
  const finalTitle = title || (mode === "create" ? "Create Record" : "Edit Record");
  const finalSubmitLabel = submitLabel || (mode === "create" ? "Create" : "Update");

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AppBreadcrumb items={breadcrumbItems} />
        <Button size="sm" className="me-4" render={<Link href={backUrl}>{backLabel}</Link>} />
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-semibold">{finalTitle}</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FieldGroup className={`grid grid-cols-1 ${gridCols[columns]} gap-6 mt-4 mb-8`}>
              {fields.map(renderField)}
            </FieldGroup>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : finalSubmitLabel}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}