import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { getUsers } from "@/app/actions/user-actions";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const UsersPage = async () => {
  
  const users = await getUsers();
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AppBreadcrumb
          items={[
              { label: 'Dashboard', href: '/admin/dashboard' },
              { label: 'Users' },
            ]}
        />
        <Button size="sm" className="me-4" render={
          <Link href="/admin/users/create"> New User</Link>
        } />
      </div>
    <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
      <h1 className="font-semibold my-4">All Users</h1>

      <DataTable columns={columns} data={users.data}/>
    </div>
    
    </div>
  )
}

export default UsersPage