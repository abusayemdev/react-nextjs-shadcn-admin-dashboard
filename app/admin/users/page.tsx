import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { getUsers } from "@/app/actions/user-actions";


const UsersPage = async () => {
  const users = await getUsers();
  return (
    <div>
    <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
      <h1 className="font-semibold my-4">All Users</h1>

      <DataTable columns={columns} data={users.data}/>
    </div>
    
    </div>
  )
}

export default UsersPage