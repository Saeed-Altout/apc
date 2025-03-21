"use client";

import { useState } from "react";
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

export const ApproveRequestModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === ModalType.APPROVE_REQUEST;
  const { request } = data || {};

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      // Add your API call here
      console.log("Approving request:", request?.id);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
          <DialogTitle>Approve Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this request?
          </DialogDescription>
        </DialogHeader>

        {request && (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">ID:</div>
              <div>{request.id}</div>

              <div className="font-medium">Name:</div>
              <div>{request.name}</div>

              <div className="font-medium">Operation Type:</div>
              <div>{request.operationType}</div>

              <div className="font-medium">Account Number:</div>
              <div>{request.accountNumber}</div>
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
