"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTableRowActions } from "./data-table-row-actions";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { usePaginatedUsers } from "@/lib/services/users";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function UsersTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Using our custom React Query hook
  const {
    data: usersData,
    isLoading,
    isError,
    error,
    isPlaceholderData,
    isFetching,
  } = usePaginatedUsers(page, limit);

  const users = usersData?.data || [];
  const totalPages = usersData ? Math.ceil(usersData.total / limit) : 0;

  const handleNextPage = () => {
    if (!isPlaceholderData && page < totalPages) {
      setPage((old) => old + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-red-500 font-medium">Error loading users</p>
        <p className="text-sm text-gray-500 mt-1">
          {error?.message || "Unknown error"}
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setPage(1)}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of users in your organization.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer">
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.id.substring(0, 8)}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DataTableRowActions data={user} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {usersData?.total
            ? `Showing ${(page - 1) * limit + 1}-${Math.min(
                page * limit,
                usersData.total
              )} of ${usersData.total}`
            : "0 results"}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={isPlaceholderData || page >= totalPages}
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
