"use client"

import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "@/components/data-table/data-table-features";
import { cn } from "cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { User } from "@/lib/types";



const columnHelper = createColumnHelper<DataTableFeatures, User>()

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge variant={role === "admin" ? "default" : "secondary"}>
          {role === "admin" ? "Admin" : "User"}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  }),

columnHelper.display({
  id: "actions",
  cell: ({ row }) => {
    const user = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-8 w-8 p-0" />}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-max" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem render={
            <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
          } />
          
          <DropdownMenuItem render={
            <Link href={`/admin/users/${user.id}`}>View details</Link>
          } />

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => {
              if (confirm("Are you sure you want to delete this user?")) {
                // call deleteUser
              }
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}),

])