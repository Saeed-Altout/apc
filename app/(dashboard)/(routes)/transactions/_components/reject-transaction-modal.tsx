"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

const formSchema = z.object({
  rejectionReason: z
    .string()
    .min(10, { message: "Rejection reason must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export const RejectTransactionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === ModalType.REJECT_TRANSACTION;
  const { transaction } = data || {};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rejectionReason: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      console.log(
        "Rejecting transaction:",
        transaction?.id,
        "Reason:",
        values.rejectionReason
      );

      form.reset();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Transaction</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this transaction.
          </DialogDescription>
        </DialogHeader>

        {transaction && (
          <div className="mb-4 space-y-4 py-2">
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rejectionReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rejection Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please explain why this transaction is being rejected"
                      className="resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <X className="mr-2 h-4 w-4" />
                )}
                Reject
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
