"use client"

import React from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../components/ui/sheet'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldDescription, FieldError, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '../../components/ui/button'

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

const EditUser = () => {

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "John Doe",
        email: "john.doe@gmail.com",
        phone: "+123456789",
        location: "New York, NY",
        role: "admin",
      },
    })

  return (
    <SheetContent>
        <SheetHeader>
        <SheetTitle className="mb-4">Edit User</SheetTitle>
        <SheetDescription>
          <form action="">
          
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
                        
                        <SelectItem value="admin"> Admin </SelectItem>
                        <SelectItem value="user"> User </SelectItem>
                        
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}

            />

            <Button type="submit">Submit</Button>
             
          </form>
           
        
        </SheetDescription>
        </SheetHeader>
    </SheetContent>
  )
}

export default EditUser