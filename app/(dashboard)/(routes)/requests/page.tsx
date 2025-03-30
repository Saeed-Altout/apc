"use client";
import * as React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(dashboard)/(routes)/users/_components/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";
import { ApproveRequestModal } from "./_components/approve-request-modal";
import { RejectRequestModal } from "./_components/reject-request-modal";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { mockRequests } from "@/config/constants";

export default function RequestsPage() {
  const { onOpen } = useModal();
  const [operationType, setOperationType] = useState<string>("all");

  const filteredRequests = React.useMemo(() => {
    if (operationType === "all") return mockRequests;
    return mockRequests.filter(
      (request) => request.operationType === operationType
    );
  }, [operationType]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <Heading title="Requests" description="Manage user requests" />
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpen(ModalType.EXPORT_REQUEST)}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => onOpen(ModalType.ADD_REQUEST)}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>
      <Separator />

      <Tabs defaultValue="all" onValueChange={setOperationType}>
        <TabsList>
          <TabsTrigger value="all" className="font-medium">
            All
          </TabsTrigger>
          <TabsTrigger value="change-password" className="font-medium">
            Change password
          </TabsTrigger>
          <TabsTrigger value="create-account" className="font-medium">
            Create account
          </TabsTrigger>
          <TabsTrigger value="documentation-request" className="font-medium">
            Documentation
          </TabsTrigger>
          <TabsTrigger value="profile" className="font-medium">
            Profile
          </TabsTrigger>
        </TabsList>
        <DataTable
          columns={columns}
          data={filteredRequests}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
          defaultSort={defaultSort}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </Tabs>
      <ApproveRequestModal />
      <RejectRequestModal />
    </div>
  );
}
