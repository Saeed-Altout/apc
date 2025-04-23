"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddAccountModal } from "./add-account-modal";
import { AddWalletModal } from "./add-wallet-modal";
import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { Account } from "@/schemas/account";

export const AccountsTab = ({ accounts }: { accounts: Account[] }) => {
  const { onOpen } = useModal();

  const formattedAccounts =
    accounts.length > 0
      ? accounts.filter((account) => account.type === "TRADING")
      : [];
  const formattedWallets =
    accounts.length > 0
      ? accounts.filter((account) => account.type === "DEMO")
      : [];

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">The Accounts</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpen(ModalType.ADD_ACCOUNT)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add account
            </Button>
          </div>
          <DataTable columns={columns} data={formattedAccounts} />
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">The Wallets</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpen(ModalType.ADD_WALLET)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add wallet
            </Button>
          </div>
          <DataTable columns={columns} data={formattedWallets} />
        </div>
      </div>

      <AddAccountModal />
      <AddWalletModal />
    </>
  );
};
