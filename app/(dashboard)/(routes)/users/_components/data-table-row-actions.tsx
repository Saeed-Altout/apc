"use client";

import { Row } from "@tanstack/react-table";
import { Ban, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { taskSchema } from "../data/schema";
import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { onOpen } = useModal();
  const task = taskSchema.parse(row.original);
  console.log(task);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onOpen(ModalType.BLOCK_USER)}
      >
        <Ban />
        <span className="sr-only">Ban</span>
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onOpen(ModalType.DELETE_USER)}
      >
        <Trash />
        <span className="sr-only">Trash</span>
      </Button>
      <Button variant="default" size="icon">
        <Edit />
        <span className="sr-only">Edit</span>
      </Button>
    </div>
  );
}
