"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

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

const approveKycFileSchema = z.object({
  comment: z.string().optional(),
});

type ApproveKycFileFormValues = z.infer<typeof approveKycFileSchema>;

export const ApproveKycFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const isModalOpen = isOpen && type === ModalType.APPROVE_KYC_FILE;
  const { kycFile } = data || {};

  const form = useForm<ApproveKycFileFormValues>({
    resolver: zodResolver(approveKycFileSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: ApproveKycFileFormValues) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to approve the KYC file
      console.log("Approving KYC file:", kycFile?.id, values);

      // Show success feedback
      onClose();
    } catch (error) {
      console.error("Error approving KYC file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Approve KYC Document</DialogTitle>
          <DialogDescription>
            Confirm that this document meets all verification requirements
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
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approval Comment (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any notes about this approval..."
                        className="resize-none h-20"
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
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Approve Document
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="py-6 text-center">
            <p>No document selected. Please select a document to approve.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
