"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

import { User } from "@/schemas/user";
import { DataTableRowActions } from "./data-table-row-actions";

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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
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
    accessorKey: "accountManager",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Manager" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("accountManager")}</div>
      );
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
    accessorKey: "wallets",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wallets" />
    ),
    cell: ({ row }) => <div>{row.getValue("wallets")}</div>,
  },
  {
    accessorKey: "tradingAccounts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trading Accounts" />
    ),
    cell: ({ row }) => <div>{row.getValue("tradingAccounts")}</div>,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
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
      const status = row.getValue("status") as string;

      return (
        <Badge
          variant={
            status === "active"
              ? "success"
              : status === "blocked"
              ? "destructive"
              : status === "pending"
              ? "outline"
              : "secondary"
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
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Blocked", value: "blocked" },
      { label: "Pending", value: "pending" },
    ],
  },
];

export const searchableColumns = [
  {
    id: "name",
    title: "Name",
  },
];

export const defaultSort = {
  id: "createdAt",
  desc: true,
};
export const defaultVisibleColumns = [
  {
    id: "name",
    title: "Name",
    visible: true,
  },
  {
    id: "phone",
    title: "Phone",
    visible: true,
  },
  {
    id: "accountManager",
    title: "Account Manager",
    visible: true,
  },
  {
    id: "email",
    title: "Email",
    visible: false,
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
    id: "wallets",
    title: "Wallets",
    visible: false,
  },
  {
    id: "tradingAccount",
    title: "Trading Account",
    visible: false,
  },
  {
    id: "country",
    title: "Country",
    visible: false,
  },
  {
    id: "createdAt",
    title: "Created At",
    visible: false,
  },
];
