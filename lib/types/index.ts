import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as z from "zod";
import { users } from "../db/schema";

export interface PostListProps {
  posts: Array<{
    id: number;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    author: {
      name: string;
    };
  }>;
}

export interface PostCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    author: {
      name: string;
    };
  };
}

export interface PostContentProps {
  post: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
      name: string;
    };
  };
  isAuthor: Boolean;
}

export interface DeletePostButtonProps {
  postId: number;
}


//input field config
export type FieldConfig = {
  name: string;
  label?: string;
  placeholder?: string;
  type: "text" | "email" | "number" | "password" | "select" | "file";
  schema?: z.ZodType<any>; 
  options?: { label: string; value: string }[]; 
  required?: boolean;
};

//Dynamic form props
export type DynamicFormProps = {
  mode: "create" | "edit";
  title: string;
  breadcrumbItems: { label: string; href?: string }[];
  backUrl: string;
  backLabel: string;
  fields: FieldConfig[];
  defaultValues?: Record<string, any>; 
  onSubmit: (values: Record<string, unknown> | FormData) => void | Promise<void>;
  submitLabel?: string;
  columns?: 1 | 2 | 3;
  isLoading?: boolean;
};

//user types

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UpdateUserInput = Pick<NewUser, "name" | "email" | "phone" | "role" | "status">;



