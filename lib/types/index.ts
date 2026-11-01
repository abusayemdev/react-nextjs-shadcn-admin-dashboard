import * as z from "zod";

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



export type FieldConfig = {
  name: string;
  label?: string;
  placeholder?: string;
  type: "text" | "email" | "number" | "password" | "select" | "file";
  schema?: z.ZodType<any>; 
  options?: { label: string; value: string }[]; 
  required?: boolean;
};

export type DynamicFormProps = {
  mode: "create" | "edit"; // <-- New: Defines the form behavior
  title: string;
  breadcrumbItems: { label: string; href?: string }[];
  backUrl: string;
  backLabel: string;
  fields: FieldConfig[];
  defaultValues?: Record<string, any>; 
  onSubmit: (values: Record<string, unknown> | FormData) => void | Promise<void>;
  submitLabel?: string;
  columns?: 1 | 2 | 3;
  isLoading?: boolean; // <-- New: For edit mode fetching
};