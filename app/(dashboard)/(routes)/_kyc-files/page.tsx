"use client";
import * as React from "react";
import { useState } from "react";
import { Plus, Download, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrapper } from "@/components/ui/wrapper";
import { DataTable } from "@/app/(dashboard)/(routes)/users/_components/data-table";

import {
  columns,
  filterableColumns,
  searchableColumns,
  defaultSort,
  defaultVisibleColumns,
} from "./_components/columns";

import { AddKycFileModal } from "./_components/add-kyc-file-modal";
import { EditKycFileModal } from "./_components/edit-kyc-file-modal";
import { ViewKycFileModal } from "./_components/view-kyc-file-modal";
import { ApproveKycFileModal } from "./_components/approve-kyc-file-modal";
import { RejectKycFileModal } from "./_components/reject-kyc-file-modal";
import { ExportKycFileModal } from "./_components/export-kyc-file-modal";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { mockKycFiles } from "@/config/constants";

export default function KycFilesPage() {
  const { onOpen } = useModal();
  const [documentType, setDocumentType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter the KYC files based on tab selections
  const filteredKycFiles = React.useMemo(() => {
    let filtered = [...mockKycFiles];

    if (documentType !== "all") {
      filtered = filtered.filter((kycFile) => kycFile.type === documentType);
    }

    return filtered;
  }, [documentType]);

  return (
    <Wrapper
      title="KYC Files"
      description="Manage verification documents"
      isLoading={isLoading}
    >
      <div className="flex items-center justify-between">
        <div>
          <Tabs defaultValue="all" onValueChange={(value) => setStatus(value)}>
            <TabsList>
              <TabsTrigger value="all" className="font-medium">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="font-medium">
                Pending
              </TabsTrigger>
              <TabsTrigger value="approved" className="font-medium">
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="font-medium">
                Rejected
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpen(ModalType.EXPORT_KYC_FILE)}
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => onOpen(ModalType.ADD_KYC_FILE)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Upload File
          </Button>
          <Button
            onClick={() => onOpen(ModalType.VIEW_KYC_FILE)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </div>
      </div>
      <Separator />

      <Tabs defaultValue="all" onValueChange={setDocumentType}>
        <TabsList>
          <TabsTrigger value="all" className="font-medium">
            All Types
          </TabsTrigger>
          <TabsTrigger value="ID Card" className="font-medium">
            ID Card
          </TabsTrigger>
          <TabsTrigger value="Passport" className="font-medium">
            Passport
          </TabsTrigger>
          <TabsTrigger value="Driving License" className="font-medium">
            Driving License
          </TabsTrigger>
          <TabsTrigger value="Utility Bill" className="font-medium">
            Utility Bill
          </TabsTrigger>
          <TabsTrigger value="Bank Statement" className="font-medium">
            Bank Statement
          </TabsTrigger>
        </TabsList>
        <DataTable
          columns={columns}
          data={filteredKycFiles.filter(
            (kycFile) => status === "all" || kycFile.status === status
          )}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
          defaultSort={defaultSort}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </Tabs>

      {/* Render all modals */}
      <AddKycFileModal />
      <EditKycFileModal />
      <ViewKycFileModal />
      <ApproveKycFileModal />
      <RejectKycFileModal />
      <ExportKycFileModal />
    </Wrapper>
  );
}
