"use client"
 
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { columns, User } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<User[]> => {
  return [
    {
      id: "728ed521",
      status: "pending",
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      id: "728ed522",
      status: "active",
      name: "Jane Doe",
      email: "janedoe@gmail.com",
    },
    {
      id: "728ed523",
      status: "active",
      name: "Mike Galloway",
      email: "mikegalloway@gmail.com",
    },
    {
      id: "728ed524",
      status: "failed",
      name: "Minerva Robinson",
      email: "minerbarobinson@gmail.com",
    },
    {
      id: "728ed525",
      status: "active",
      name: "Mable Clayton",
      email: "mableclayton@gmail.com",
    },
    {
      id: "728ed526",
      status: "pending",
      name: "Nathan McDaniel",
      email: "nathanmcdaniel@gmail.com",
    },
    {
      id: "728ed527",
      status: "active",
      name: "Myrtie Lamb",
      email: "myrtielamb@gmail.com",
    },
    {
      id: "728ed528",
      status: "active",
      name: "Leona Bryant",
      email: "leonabryant@gmail.com",
    },
    {
      id: "728ed529",
      status: "failed",
      name: "Aaron Willis",
      email: "aaronwillis@gmail.com",
    },
    {
      id: "728ed52a",
      status: "active",
      name: "Joel Keller",
      email: "joelkeller@gmail.com",
    },
    {
      id: "728ed52b",
      status: "pending",
      name: "Daniel Ellis",
      email: "danielellis@gmail.com",
    },
    {
      id: "728ed52c",
      status: "active",
      name: "Gordon Kennedy",
      email: "gordonkennedy@gmail.com",
    },
    {
      id: "728ed52d",
      status: "failed",
      name: "Emily Hoffman",
      email: "emilyhoffman@gmail.com",
    },
    {
      id: "728ed52e",
      status: "pending",
      name: "Jeffery Garrett",
      email: "jefferygarrett@gmail.com",
    },
    {
      id: "728ed52f",
      status: "active",
      name: "Ralph Baker",
      email: "ralphbaker@gmail.com",
    },
    {
      id: "728ed52g",
      status: "failed",
      name: "Seth Fields",
      email: "sethfields@gmail.com",
    },
    {
      id: "728ed52h",
      status: "pending",
      name: "Julia Webb",
      email: "juliawebb@gmail.com",
    },
    {
      id: "728ed52i",
      status: "active",
      name: "Gary Banks",
      email: "garybanks@gmail.com",
    },
    {
      id: "728ed52j",
      status: "failed",
      name: "Flora Chambers",
      email: "florachambers@gmail.com",
    },
    {
      id: "728ed52k",
      status: "pending",
      name: "Steve Hanson",
      email: "stevehanson@gmail.com",
    },
    {
      id: "728ed52l",
      status: "active",
      name: "Lola Robinson",
      email: "lolarobinson@gmail.com",
    },
    {
      id: "728ed52m",
      status: "pending",
      name: "Ethel Waters",
      email: "ethelwaters@gmail.com",
    },
    {
      id: "728ed52n",
      status: "failed",
      name: "Grace Edwards",
      email: "graceedwards@gmail.com",
    },
    {
      id: "728ed52o",
      status: "active",
      name: "Sallie Wong",
      email: "salliewong@gmail.com",
    },
    {
      id: "728ed52p",
      status: "active",
      name: "Bryan Gutierrez",
      email: "bryangutierrez@gmail.com",
    },
    {
      id: "728ed52q",
      status: "pending",
      name: "Erik Rice",
      email: "erikrice@gmail.com",
    },
    {
      id: "728ed52r",
      status: "active",
      name: "Jordan Atkins",
      email: "jordanatkins@gmail.com",
    },
    {
      id: "728ed52s",
      status: "failed",
      name: "Bill Brewer",
      email: "billbrewer@gmail.com",
    },
    {
      id: "728ed52t",
      status: "active",
      name: "Edwin Morris",
      email: "edwinmorris@gmail.com",
    },
    {
      id: "728ed52u",
      status: "active",
      name: "Harold Becker",
      email: "haroldbecker@gmail.com",
    },
    {
      id: "728ed52v",
      status: "active",
      name: "Hannah Rodriguez",
      email: "hannahrodriguez@gmail.com",
    },
    {
      id: "728ed52w",
      status: "active",
      name: "Zachary Beck",
      email: "zacharybeck@gmail.com",
    },
    {
      id: "728ed52x",
      status: "failed",
      name: "Frances Potter",
      email: "francespotter@gmail.com",
    },
    {
      id: "728ed52y",
      status: "active",
      name: "Raymond Murray",
      email: "raymondmurray@gmail.com",
    },
    {
      id: "728ed52z",
      status: "active",
      name: "Adam Sherman",
      email: "adamsherman@gmail.com",
    },
    {
      id: "728ed521f",
      status: "pending",
      name: "Anne Cruz",
      email: "annecruz@gmail.com",
    },
  ];
};

const UsersPage = async () => {
  const data = await getData();
  return (
    <div>
    <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
      <h1 className="font-semibold my-4">All Users</h1>

      <DataTable columns={columns} data={data}/>
    </div>
    
    </div>
  )
}

export default UsersPage