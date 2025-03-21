"use client";
import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { mockUsers } from "@/config/constants";

export default function UsersPage() {
  const { onOpen } = useModal();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Users" description="Manage your user accounts" />
      <Separator />
      <DataTable
        columns={columns}
        data={mockUsers}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        defaultSort={defaultSort}
        defaultVisibleColumns={defaultVisibleColumns}
        actions={
          <>
            <Button
              onClick={() => onOpen(ModalType.EXPORT_USER)}
              variant="tertiary"
            >
              <Plus />
              Export
            </Button>
            <Button onClick={() => onOpen(ModalType.ADD_USER)}>
              <Plus />
              Add
            </Button>
          </>
        }
      />
    </div>
  );
}
