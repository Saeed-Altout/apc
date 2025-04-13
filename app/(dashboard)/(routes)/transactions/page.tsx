"use client";
import * as React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";

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

import { AddTransactionModal } from "./_components/add-transaction-modal";
import { EditTransactionModal } from "./_components/edit-transaction-modal";
import { ApproveTransactionModal } from "./_components/approve-transaction-modal";
import { RejectTransactionModal } from "./_components/reject-transaction-modal";
import { ExportTransactionModal } from "./_components/export-transaction-modal";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { mockTransactions } from "@/config/constants";

export default function TransactionsPage() {
  const { onOpen } = useModal();
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter the transactions based on tab selection
  const filteredTransactions = React.useMemo(() => {
    let filtered = [...mockTransactions];

    if (withdrawalMethod !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.withdrawalMethod === withdrawalMethod
      );
    }

    return filtered;
  }, [withdrawalMethod]);

  return (
    <Wrapper
      title="Transactions"
      description="Manage withdrawal and deposit transactions"
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
            onClick={() => onOpen(ModalType.EXPORT_TRANSACTION)}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => onOpen(ModalType.ADD_TRANSACTION)}>
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>
      <Separator />

      <Tabs defaultValue="all" onValueChange={setWithdrawalMethod}>
        <TabsList>
          <TabsTrigger value="all" className="font-medium">
            All Methods
          </TabsTrigger>
          <TabsTrigger value="Bank Transfer" className="font-medium">
            Bank Transfer
          </TabsTrigger>
          <TabsTrigger value="Cash" className="font-medium">
            Cash
          </TabsTrigger>
        </TabsList>
        <DataTable
          columns={columns}
          data={filteredTransactions.filter(
            (transaction) => status === "all" || transaction.status === status
          )}
          filterableColumns={filterableColumns}
          searchableColumns={searchableColumns}
          defaultSort={defaultSort}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </Tabs>

      {/* Render all modals */}
      <AddTransactionModal />
      <EditTransactionModal />
      <ApproveTransactionModal />
      <RejectTransactionModal />
      <ExportTransactionModal />
    </Wrapper>
  );
}
