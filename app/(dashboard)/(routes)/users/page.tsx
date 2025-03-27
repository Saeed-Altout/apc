"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useUsers } from "@/services/users/users-hook";

export default function UsersPage() {
  const { onOpen } = useModal();
  const { data, isLoading, isSuccess } = useUsers({ params: {} });

  if (!isSuccess || isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner variant="circle" size="lg" />
      </div>
    );

  const formattedData = data.data.items.map((item) => ({
    id: item.id,
    fullName: `${item.firstname} ${item.lastname}`,
    phone: item.user.phoneNumber,
    email: item.email,
    telegram: item.user.telegramUsername,
    role: item.user.role.name,
    status: item.user.status,
    createdAt: format(item.timeCreated, "MMM dd, yyyy"),
    updatedAt: format(item.timeUpdated, "MMM dd, yyyy"),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Users" description="Manage your user accounts" />
      <Separator />
      <DataTable
        columns={columns}
        data={formattedData}
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
