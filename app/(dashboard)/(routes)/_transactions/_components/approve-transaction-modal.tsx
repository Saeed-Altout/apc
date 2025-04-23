"use client";

import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const ApproveTransactionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === ModalType.APPROVE_TRANSACTION;
  const { transaction } = data || {};

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      console.log("Approving transaction:", transaction?.id);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approve Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this transaction?
          </DialogDescription>
        </DialogHeader>

        {transaction && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Process ID:</div>
              <div>{transaction.processId}</div>

              <div className="font-medium">Name:</div>
              <div>{transaction.name}</div>

              <div className="font-medium">Account Number:</div>
              <div>{transaction.accountNumber}</div>

              <div className="font-medium">Amount:</div>
              <div>${transaction.amount.toLocaleString()}</div>

              <div className="font-medium">Method:</div>
              <div>{transaction.withdrawalMethod}</div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-2 h-4 w-4" />
            )}
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
