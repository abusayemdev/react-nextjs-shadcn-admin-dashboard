"use client"

import React from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import AppBreadcrumb from '@/components/AppBreadcrumb'



const formSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters.")
        .max(32, "Username must be at most 32 characters."),
    email: z.string().email({message: "Invalid email address!"}),
    phone: z.string().min(10).max(15),
    location: z.string().min(2),
    role: z.enum(["admin", "user"])
})


type FormValues = z.infer<typeof formSchema>

const CreateUser = () => {

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        phone: "",
        location: "",
        role: "user",
      },
    })

    const onSubmit = (values: FormValues) => {
        console.log("submit", values)
        // call your API / server action here
    }

  return (
    <div>
    
        <AppBreadcrumb
            items={[
                { label: "Dashboard", href: "/" },
                { label: "Users", href: "/users" },
                { label: "Create" },
            ]}
        />

        <div className="p-4 bg-secondary rounded-md">

        <h2 className="text-sm font-medium">Create User</h2>

       
        <form onSubmit={form.handleSubmit(onSubmit)}>
           <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 p-8">
                <Controller
                control={form.control}
                name="username"
                render={({ field }) => (
                    <Field className="my-4">
                    <Input id="username" {...field} />
                    <FieldDescription>
                        This is your public username.
                    </FieldDescription>
                    <FieldError></FieldError>
                    </Field>
                )}

                />

                <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                    <Field className="my-4">
                    <Input id="email" {...field} />
                    <FieldDescription>
                        This is your public email.
                    </FieldDescription>
                    <FieldError></FieldError>
                    </Field>
                )}

                />


                <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <Field className="my-4">
                    <Input id="phone" {...field} />
                    <FieldDescription>
                        This is your public phone.
                    </FieldDescription>
                    <FieldError></FieldError>
                    </Field>
                )}

                />

                <Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                    <Field className="my-4">
                    <Input id="location" {...field} />
                    <FieldDescription>
                        This is your public location.
                    </FieldDescription>
                    <FieldError></FieldError>
                    </Field>
                )}

                />


                <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                    <Field className="my-4" >
                    <FieldLabel htmlFor="role">Role </FieldLabel>
                    
                    <Select>
                        <SelectTrigger className="w-[180px]">
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
           
        
        </div>
    </div>
  )
}

export default CreateUser