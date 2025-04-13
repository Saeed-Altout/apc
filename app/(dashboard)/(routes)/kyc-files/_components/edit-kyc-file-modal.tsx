"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { kycFileFormSchema, KycFileFormValues } from "@/schemas/kyc-file";

export const EditKycFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const isModalOpen = isOpen && type === ModalType.EDIT_KYC_FILE;
  const { kycFile } = data || {};

  const form = useForm<KycFileFormValues>({
    resolver: zodResolver(kycFileFormSchema),
    defaultValues: {
      name: "",
      accountId: "",
      type: "",
      procedures: "",
      file: null,
    },
  });

  // Reset form with KYC file data when modal opens
  React.useEffect(() => {
    if (kycFile) {
      form.reset({
        name: kycFile.name,
        accountId: kycFile.accountId,
        type: kycFile.type,
        procedures: kycFile.procedures,
        file: null,
      });
    }
  }, [kycFile, form, isModalOpen]);

  const onSubmit = async (values: KycFileFormValues) => {
    try {
      if (!kycFile) return;

      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to update the KYC file
      console.log("Updating KYC file:", kycFile.id, values);

      // Show success feedback
      onClose();
    } catch (error) {
      console.error("Error updating KYC file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit KYC Document</DialogTitle>
          <DialogDescription>
            Update the details of this verification document
          </DialogDescription>
        </DialogHeader>

        {kycFile ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account ID</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="ACC123456789"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Type</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ID Card">ID Card</SelectItem>
                          <SelectItem value="Passport">Passport</SelectItem>
                          <SelectItem value="Driving License">
                            Driving License
                          </SelectItem>
                          <SelectItem value="Utility Bill">
                            Utility Bill
                          </SelectItem>
                          <SelectItem value="Bank Statement">
                            Bank Statement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="procedures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Procedures</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select verification procedure" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="KYC verification">
                            KYC verification
                          </SelectItem>
                          <SelectItem value="Identity verification">
                            Identity verification
                          </SelectItem>
                          <SelectItem value="Address verification">
                            Address verification
                          </SelectItem>
                          <SelectItem value="Financial verification">
                            Financial verification
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Replace Document (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          disabled={isLoading}
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            form.setValue("file", file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  disabled={isLoading}
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Update Document
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="py-6 text-center">
            <p>No document selected. Please select a document to edit.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
