"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const RejectRequestModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === ModalType.REJECT_REQUEST;
  const { request } = data || {};

  const onSubmit = async () => {
    if (!reason.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      // Add your API call here
      console.log("Rejecting request:", request?.id, "Reason:", reason);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onClose();
      setReason("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setReason("");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this request.
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

            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for rejection"
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoading || !reason.trim()}
            variant="destructive"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <X className="mr-2 h-4 w-4" />
            )}
            Reject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
