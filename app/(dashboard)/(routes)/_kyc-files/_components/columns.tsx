"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "accountId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("accountId")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date/Time" />
    ),
    cell: ({ row }) => (
      <div>{format(row.getValue("dateTime"), "MMM dd, yyyy")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "procedures",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Procedures" />
    ),
    cell: ({ row }) => <div>{row.getValue("procedures")}</div>,
    enableSorting: true,
    enableHiding: true,
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
            status === "approved"
              ? "success"
              : status === "rejected"
              ? "destructive"
              : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const defaultVisibleColumns: string[] = [
  "name",
  "accountId",
  "type",
  "dateTime",
  "procedures",
  "status",
  "actions",
];

export const filterableColumns = [
  {
    id: "status",
    title: "Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
    ],
  },
  {
    id: "type",
    title: "Document Type",
    options: [
      { label: "ID Card", value: "ID Card" },
      { label: "Passport", value: "Passport" },
      { label: "Driving License", value: "Driving License" },
      { label: "Utility Bill", value: "Utility Bill" },
      { label: "Bank Statement", value: "Bank Statement" },
    ],
  },
];

export const searchableColumns = [
  {
    id: "name",
    title: "Name",
  },
  {
    id: "accountId",
    title: "Account ID",
  },
  {
    id: "procedures",
    title: "Procedures",
  },
];

export const defaultSort: { id: string; desc: boolean } = {
  id: "dateTime",
  desc: true,
};
