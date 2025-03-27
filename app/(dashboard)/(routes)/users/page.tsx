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
import { useUsers } from "@/services/users/users-hook";
import { useUsersStore } from "@/services/users/users-store";

export default function UsersPage() {
  const { onOpen } = useModal();
  const { data, isLoading, isSuccess } = useUsers({ params: {} });
  const [users, setUsers] = React.useState<IUserItem[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    if (isSuccess) {
      setUsers(data.data.items);
      setTotal(data.data.total);
    }
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Users" description="Manage your user accounts" />
      <Separator />
      <DataTable
        columns={columns}
        data={users}
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
