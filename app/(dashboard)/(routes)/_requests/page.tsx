"use client";
import * as React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(dashboard)/(routes)/users/_components/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrapper } from "@/components/ui/wrapper";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";
import { ApproveRequestModal } from "./_components/approve-request-modal";
import { RejectRequestModal } from "./_components/reject-request-modal";
import { AddRequestModal } from "./_components/add-request-modal";
import { EditRequestModal } from "./_components/edit-request-modal";
import { ExportRequestModal } from "./_components/export-request-modal";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useGetRequestsQuery } from "@/services/requests/requests-hook";

export default function RequestsPage() {
  const { onOpen } = useModal();
  const [operationType, setOperationType] = useState<string>("all");

  // Define params object for API queries
  const params = React.useMemo(() => {
    return operationType !== "all" ? { operationType } : {};
  }, [operationType]);

  // Fetch requests data from API
  const { data: requestsData, isLoading } = useGetRequestsQuery({ params });

  // Format the data for the data table
  const formattedRequests = React.useMemo(() => {
    if (!requestsData) return [];

    return requestsData.data.items.map((request) => ({
      id: request.id,
      name: request.name,
      email: request.email,
      phone: request.phone,
      accountNumber: request.accountNumber,
      operationType: request.operationType,
      status: request.status,
      accountManager: request.accountManager,
      rejectionReason: request.rejectionReason,
      requestDate: new Date(request.requestDate),
    }));
  }, [requestsData]);

  return (
    <Wrapper
      title="Requests"
      description="Manage user requests"
      isLoading={isLoading}
    >
      <div className="flex items-center justify-between">
        <div />
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
          data={formattedRequests}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
          defaultSort={defaultSort}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </Tabs>

      {/* Render all modals */}
      <AddRequestModal />
      <EditRequestModal />
      <ApproveRequestModal />
      <RejectRequestModal />
      <ExportRequestModal />
    </Wrapper>
  );
}
