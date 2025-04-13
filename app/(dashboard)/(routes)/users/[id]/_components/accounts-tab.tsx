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
const accounts = [
  {
    id: 1,
    name: "Personal Savings",
    baseCurrency: "USD",
    status: true,
  },
  {
    id: 2,
    name: "Business Account",
    baseCurrency: "EUR",
    status: true,
  },
  {
    id: 3,
    name: "Investment Portfolio",
    baseCurrency: "GBP",
    status: false,
  },
  {
    id: 4,
    name: "Retirement Fund",
    baseCurrency: "USD",
    status: true,
  },
  {
    id: 5,
    name: "Travel Expenses",
    baseCurrency: "JPY",
    status: true,
  },
  {
    id: 6,
    name: "Emergency Fund",
    baseCurrency: "USD",
    status: true,
  },
  {
    id: 7,
    name: "Education Savings",
    baseCurrency: "CAD",
    status: false,
  },
  {
    id: 8,
    name: "Real Estate Investment",
    baseCurrency: "AUD",
    status: true,
  },
  {
    id: 9,
    name: "Cryptocurrency Wallet",
    baseCurrency: "BTC",
    status: true,
  },
  {
    id: 10,
    name: "Stock Portfolio",
    baseCurrency: "USD",
    status: true,
  },
  {
    id: 11,
    name: "Family Trust",
    baseCurrency: "CHF",
    status: true,
  },
  {
    id: 12,
    name: "Vacation Fund",
    baseCurrency: "EUR",
    status: false,
  },
  {
    id: 13,
    name: "Home Renovation",
    baseCurrency: "USD",
    status: true,
  },
  {
    id: 14,
    name: "Vehicle Purchase",
    baseCurrency: "CAD",
    status: true,
  },
  {
    id: 15,
    name: "Charity Donations",
    baseCurrency: "GBP",
    status: true,
  },
];

const wallets = [
  {
    id: 1,
    name: "Bitcoin Wallet",
    walletId: "btc-12345",
    status: true,
  },
  {
    id: 2,
    name: "Ethereum Wallet",
    walletId: "eth-67890",
    status: true,
  },
  {
    id: 3,
    name: "Litecoin Wallet",
    walletId: "ltc-24680",
    status: false,
  },
  {
    id: 4,
    name: "Ripple Wallet",
    walletId: "xrp-13579",
    status: true,
  },
  {
    id: 5,
    name: "Cardano Wallet",
    walletId: "ada-97531",
    status: true,
  },
  {
    id: 6,
    name: "Solana Wallet",
    walletId: "sol-86420",
    status: false,
  },
  {
    id: 7,
    name: "Polkadot Wallet",
    walletId: "dot-75319",
    status: true,
  },
  {
    id: 8,
    name: "Dogecoin Wallet",
    walletId: "doge-42069",
    status: true,
  },
];

export const AccountsTab = () => {
  const { onOpen, isOpen, type, data } = useModal();

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
