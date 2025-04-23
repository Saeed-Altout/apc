"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "processId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Process ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("processId")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>{format(row.getValue("date"), "MMM dd, yyyy")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "accountNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Number" />
    ),
    cell: ({ row }) => <div>{row.getValue("accountNumber")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        ${row.getValue("amount").toLocaleString()}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "withdrawalMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Withdrawal Method" />
    ),
    cell: ({ row }) => <div>{row.getValue("withdrawalMethod")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => <div>{row.getValue("address") || "Not Applicable"}</div>,
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
  "processId",
  "date",
  "name",
  "amount",
  "withdrawalMethod",
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
    id: "withdrawalMethod",
    title: "Withdrawal Method",
    options: [
      { label: "Bank Transfer", value: "Bank Transfer" },
      { label: "Cash", value: "Cash" },
    ],
  },
];

export const searchableColumns = [
  {
    id: "name",
    title: "Name",
  },
  {
    id: "processId",
    title: "Process ID",
  },
  {
    id: "accountNumber",
    title: "Account Number",
  },
];

export const defaultSort: { id: string; desc: boolean } = {
  id: "date",
  desc: true,
};
