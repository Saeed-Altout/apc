"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { Badge } from "@/components/ui/badge";

const rejectKycFileSchema = z.object({
  reason: z.string().min(1, "Rejection reason is required"),
});

type RejectKycFileFormValues = z.infer<typeof rejectKycFileSchema>;

export const RejectKycFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const isModalOpen = isOpen && type === ModalType.REJECT_KYC_FILE;
  const { kycFile } = data || {};

  const form = useForm<RejectKycFileFormValues>({
    resolver: zodResolver(rejectKycFileSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (values: RejectKycFileFormValues) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to reject the KYC file
      console.log("Rejecting KYC file:", kycFile?.id, values);

      // Show success feedback
      onClose();
    } catch (error) {
      console.error("Error rejecting KYC file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reject KYC Document</DialogTitle>
          <DialogDescription>
            Provide a reason why this document does not meet verification
            requirements
          </DialogDescription>
        </DialogHeader>

        {kycFile ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Document ID:</div>
                  <div>{kycFile.id}</div>

                  <div className="font-medium">Type:</div>
                  <div>{kycFile.type}</div>

                  <div className="font-medium">User:</div>
                  <div>{kycFile.name}</div>

                  <div className="font-medium">Current Status:</div>
                  <div>
                    <Badge
                      variant={
                        kycFile.status === "approved"
                          ? "success"
                          : kycFile.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {kycFile.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rejection Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain why this document is being rejected..."
                        className="resize-none h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="destructive"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <AlertCircle className="mr-2 h-4 w-4" />
                  )}
                  Reject Document
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="py-6 text-center">
            <p>No document selected. Please select a document to reject.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
