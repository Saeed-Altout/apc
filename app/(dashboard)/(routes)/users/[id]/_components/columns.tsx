"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

export type Account = {
  id: number;
  name: string;
  baseCurrency: string;
  status: boolean;
};

export const AccountColumns: ColumnDef<Account>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "baseCurrency",
    header: "Base Currency",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("baseCurrency")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={status ? "success" : "destructive"}
          className={
            status
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }
        >
          {status ? "Active" : "UnActive"}
        </Badge>
      );
    },
  },
];

export type Wallet = {
  id: number;
  name: string;
  walletId: string;
  status: boolean;
};

export const walletColumns: ColumnDef<Wallet>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "walletId",
    header: "Wallet ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("walletId")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={status ? "success" : "destructive"}
          className={
            status
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          }
        >
          {status ? "Active" : "UnActive"}
        </Badge>
      );
    },
  },
];
