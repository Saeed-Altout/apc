"use client";

import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Shield, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { User } from "./columns";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const { onOpen } = useModal();
  const user = row.original as User;

  const handleEdit = () => {
    router.push(`/users/${user.id}`);
  };

  const handleBlock = () => {
    // @ts-ignore
    onOpen(ModalType.BLOCK_USER, { user });
  };

  const handleDelete = () => {
    // @ts-ignore
    onOpen(ModalType.DELETE_USER, { user });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleBlock}>
          <Shield className="mr-2 h-4 w-4" />
          {user.status === "blocked" ? "Unblock" : "Block"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
