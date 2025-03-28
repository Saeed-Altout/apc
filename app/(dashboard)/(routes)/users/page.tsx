"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useUsersWithStore } from "@/services/users/users-hook";

export default function UsersPage() {
  const { onOpen } = useModal();
  const {
    users,
    isLoading,
    filter,
    setFilter,
    resetFilter,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    exportUsers,
  } = useUsersWithStore();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Debounce search input
    const handler = setTimeout(() => {
      if (searchQuery !== filter.search) {
        setFilter({ search: searchQuery });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, filter.search, setFilter]);

  if (isLoading || !users) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner variant="circle" size="lg" />
      </div>
    );
  }

  const formattedData = users.data.items.map((item) => ({
    id: item.id,
    fullName: `${item.firstname} ${item.lastname}`,
    phone: item.user.phoneNumber,
    email: item.email,
    telegram: item.user.telegramUsername,
    role: item.user.role.name,
    status: item.user.status,
    createdAt: format(new Date(item.timeCreated), "MMM dd, yyyy"),
    updatedAt: format(new Date(item.timeUpdated), "MMM dd, yyyy"),
  }));

  // Handle export
  const handleExport = async () => {
    try {
      await exportUsers();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Users" description="Manage your user accounts" />
      <Separator />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />

          <Select
            value={filter.status || ""}
            onValueChange={(value) => setFilter({ status: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
              <SelectItem value="INCOMPLETE">Incomplete</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.is_user || ""}
            onValueChange={(value) => setFilter({ is_user: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="1">Users</SelectItem>
              <SelectItem value="0">Non-Users</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={resetFilter}>
            Reset Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => onOpen(ModalType.ADD_USER)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={formattedData}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        defaultSort={defaultSort}
        defaultVisibleColumns={defaultVisibleColumns}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing {users.data.items.length} of {users.data.total} users
          </span>

          <Select
            value={String(filter.limit || 10)}
            onValueChange={(value) => setLimit(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">per page</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => prevPage()}
                className={
                  filter.page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {users.data.page > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
              </PaginationItem>
            )}

            {users.data.page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {users.data.page > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(users.data.page - 1)}>
                  {users.data.page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink isActive>{users.data.page}</PaginationLink>
            </PaginationItem>

            {users.data.page < users.data.pages && (
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(users.data.page + 1)}>
                  {users.data.page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {users.data.page < users.data.pages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {users.data.page < users.data.pages - 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => goToPage(users.data.pages)}>
                  {users.data.pages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => nextPage()}
                className={
                  filter.page === users.data.pages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
