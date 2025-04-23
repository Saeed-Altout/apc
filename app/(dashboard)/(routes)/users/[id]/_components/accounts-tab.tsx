"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "./data-table";
import { AccountColumns, walletColumns } from "./columns";
import { AddAccountModal } from "./add-account-modal";
import { AddWalletModal } from "./add-wallet-modal";
import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const AccountsTab = ({ accounts }: { accounts: any }) => {
  const { onOpen, isOpen, type, data } = useModal();
  console.log(accounts);
  const wallets = accounts;

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
          <DataTable columns={AccountColumns} data={accounts} />
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
          <DataTable columns={walletColumns} data={wallets} />
        </div>
      </div>

      <AddAccountModal />
      <AddWalletModal />
    </>
  );
};
