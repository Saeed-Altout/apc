"use client";

import { Row } from "@tanstack/react-table";
import { Ban,Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { taskSchema } from "../data/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  console.log(task);

  return (
    <div className="flex items-center gap-2">
    <Button variant="outline" size="icon">
      <Ban/>
      <span className="sr-only">Ban</span>
    </Button>
    <Button variant="destructive" size="icon">
      <Trash/>
      <span className="sr-only">Trash</span>
    </Button>
    <Button variant="default" size="icon">
      <Edit/>
      <span className="sr-only">Edit</span>
    </Button>
    </div>
  );
}
