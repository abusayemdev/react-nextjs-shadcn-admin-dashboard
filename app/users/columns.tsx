import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "./data-table-features";
import { cn } from "cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


export type User = {
    id: string;
    username: string;
    email: string;
    status:  "pending" | "processing" | "active" | "failed";
}

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
  columnHelper.accessor("username", {
    header: "Username",
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
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({row}) => {
        const status = row.getValue("status");

        return <div className={cn(
          `p-1 rounded-md w-max text-xs`,
          status === "pending" && "bg-yellow-500/70",
          status === "active" && "bg-green-500/70",
          status === "preccessing" && "bg-blue-500/70",
          status === "failed" && "bg-red-500/70",


        )}>
           {status as string }
           </div>
    }
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
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
            <DropdownMenuItem>Edit </DropdownMenuItem>
            <DropdownMenuItem>View customer details</DropdownMenuItem>
           
          </DropdownMenuContent>
          
        </DropdownMenu>
      )
    },
  }),

])