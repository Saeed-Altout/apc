"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/(dashboard)/(routes)/users/_components/data-table-column-header";

import { DataTableRowActions } from "./data-table-row-actions";

export type User = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("fullName")}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("phone")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "telegram",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telegram" />
    ),
    cell: ({ row }) => <div>{row.getValue("telegram")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      return <div className="capitalize">{role}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge
          variant={
            status === "ACTIVE"
              ? "success"
              : status === "EXPIRED"
              ? "destructive"
              : status === "INCOMPLETE"
              ? "outline"
              : "secondary"
          }
          className={
            status === "ACTIVE"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : status === "EXPIRED"
              ? "bg-red-100 text-red-800 hover:bg-red-200"
              : status === "INCOMPLETE"
              ? "bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div>{format(date, "MMM dd, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const filterableColumns = [
  {
    id: "status",
    title: "Filter",
    options: [
      { label: "ACTIVE", value: "ACTIVE" },
      { label: "EXPIRED", value: "EXPIRED" },
      { label: "INCOMPLETE", value: "INCOMPLETE" },
    ],
  },
];

export const searchableColumns = [
  {
    id: "fullName",
    title: "Full Name",
  },
];

export const defaultSort = {
  id: "createdAt",
  desc: true,
};

export const defaultVisibleColumns = [
  {
    id: "fullName",
    title: "Full Name",
    visible: true,
  },
  {
    id: "phone",
    title: "Phone",
    visible: true,
  },
  {
    id: "email",
    title: "Email",
    visible: true,
  },
  {
    id: "role",
    title: "Role",
    visible: false,
  },
  {
    id: "status",
    title: "Status",
    visible: true,
  },
  {
    id: "telegram",
    title: "Telegram",
    visible: false,
  },
  {
    id: "createdAt",
    title: "Created At",
    visible: false,
  },
  {
    id: "updatedAt",
    title: "Updated At",
    visible: false,
  },
];
