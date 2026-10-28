"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "123456789",
    },
  });

  // Optional: redirect if already authenticated.
  // Replace with your auth client's session hook if available, e.g.:
  //   const { data: session } = useSession();
  //   useEffect(() => {
  //     if (session) router.replace("/admin/dashboard");
  //   }, [session, router]);

  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    form.clearErrors("root");

    try {
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
      });

      if (error) {
        console.log("signIn error:", error);
        console.log("error.status:", error.status);
        console.log("error.message:", error.message);
        const message = error.message ?? "Login failed. Please try again.";
        form.setError("root", { message });
        toast.error(message);
        return;
      }

      toast.success("Login success");
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (e) {
      console.error(e);
      const message = "Something went wrong. Please try again.";
      form.setError("root", { message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLoginSubmit)}
        className="space-y-4"
        noValidate
        aria-busy={isLoading}
      >
        {rootError && (
          <p
            role="alert"
            className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {rootError}
          </p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;



