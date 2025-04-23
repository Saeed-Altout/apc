"use client";
import * as React from "react";
import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { Wrapper } from "@/components/ui/wrapper";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useGetUsersQuery } from "@/services/users/users-hook";

export default function UsersPage() {
  const { data: users, isLoading } = useGetUsersQuery({ params: {} });

  const formattedData = users?.data.items.map((item, index) => ({
    sequence: index + 1,
    id: item.user.id,
    fullName: `${item.firstname} ${item.lastname}`,
    phone: item.user.phoneNumber ?? "-----------------",
    email: item.email ?? "-----------------",
    telegram: item.user.telegramUsername ?? "-----------------",
    role: item.user.role.name ?? "-----------------",
    status: item.user.status ?? "-----------------",
    createdAt: format(new Date(item.timeCreated), "MMM dd, yyyy"),
    updatedAt: format(new Date(item.timeUpdated), "MMM dd, yyyy"),
  }));

  return (
    <Wrapper
      title="Users"
      description="Manage your user accounts"
      isLoading={isLoading}
    >
      <Separator />
      <DataTable
        columns={columns}
        data={formattedData ?? []}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        defaultSort={defaultSort}
        defaultVisibleColumns={defaultVisibleColumns}
      />
    </Wrapper>
  );
}
