"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useRejectRequestMutation } from "@/services/requests/requests-hook";

const formSchema = z.object({
  rejectionReason: z
    .string()
    .min(10, { message: "Rejection reason must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export const RejectRequestModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { mutateAsync: rejectRequest, isPending } = useRejectRequestMutation();

  const isModalOpen = isOpen && type === ModalType.REJECT_REQUEST;
  const { request } = data || {};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rejectionReason: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (request?.id) {
        await rejectRequest({
          id: request.id,
          rejectionReason: values.rejectionReason,
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
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
          <DialogTitle>Reject Request</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this request.
          </DialogDescription>
        </DialogHeader>

        {request && (
          <div className="mb-4 space-y-4 py-2">
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
                      placeholder="Please explain why this request is being rejected"
                      className="resize-none"
                      {...field}
                      disabled={isPending}
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
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isPending ? (
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
