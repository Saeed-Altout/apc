"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Account } from "@/schemas/account";
import { format } from "date-fns";

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("balance")}</div>;
    },
  },
  {
    accessorKey: "login",
    header: "Login",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("login")}</div>;
    },
  },
  {
    accessorKey: "timeCreated",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {format(row.getValue("timeCreated"), "dd/MM/yyyy")}
        </div>
      );
    },
  },
];
