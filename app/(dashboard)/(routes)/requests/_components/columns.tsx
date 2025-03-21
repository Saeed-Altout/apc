"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Request } from "@/schemas/request";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Request>[] = [
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
    accessorKey: "accountNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Number" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("accountNumber")}</div>;
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
    accessorKey: "operationType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Operation Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("operationType")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "rejectionReason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rejection Reason" />
    ),
    cell: ({ row }) => {
      const rejectionReason = row.getValue("rejectionReason") as string | null;
      const status = row.getValue("status") as string;

      if (status === "rejected" && rejectionReason) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{rejectionReason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return null;
    },
  },
  {
    accessorKey: "requestDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("requestDate") as Date;
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
    title: "Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
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
  id: "requestDate",
  desc: true,
};

export const defaultVisibleColumns = [
  {
    id: "name",
    title: "Name",
    visible: true,
  },
  {
    id: "id",
    title: "ID",
    visible: true,
  },
  {
    id: "phone",
    title: "Phone",
    visible: false,
  },
  {
    id: "accountNumber",
    title: "Account Number",
    visible: true,
  },
  {
    id: "operationType",
    title: "Operation Type",
    visible: false,
  },
  {
    id: "accountManager",
    title: "Account Manager",
    visible: false,
  },
  {
    id: "status",
    title: "Status",
    visible: true,
  },
  {
    id: "rejectionReason",
    title: "Rejection Reason",
    visible: true,
  },
  {
    id: "email",
    title: "Email",
    visible: false,
  },
  {
    id: "requestDate",
    title: "Request Date",
    visible: false,
  },
];
