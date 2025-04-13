"use client";

import React from "react";
import { Eye, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const ViewKycFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const isModalOpen = isOpen && type === ModalType.VIEW_KYC_FILE;
  const { kycFile } = data || {};

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would be an API call to download the file
      console.log("Downloading KYC file:", kycFile?.id);

      // Simulate downloading a file
      const a = document.createElement("a");
      a.href = "#";
      a.download = `kyc-file-${kycFile?.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading KYC file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>View KYC Document</DialogTitle>
          <DialogDescription>
            Document details and verification status
          </DialogDescription>
        </DialogHeader>

        {kycFile ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Document Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Document ID:</div>
                    <div>{kycFile.id}</div>

                    <div className="font-medium">Type:</div>
                    <div>{kycFile.type}</div>

                    <div className="font-medium">Submitted:</div>
                    <div>{format(kycFile.dateTime, "MMM dd, yyyy")}</div>

                    <div className="font-medium">Status:</div>
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

                    <div className="font-medium">Procedures:</div>
                    <div>{kycFile.procedures}</div>

                    {kycFile.rejectionReason && (
                      <>
                        <div className="font-medium">Rejection Reason:</div>
                        <div className="text-red-500">
                          {kycFile.rejectionReason}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">User Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div>{kycFile.name}</div>

                    <div className="font-medium">Account ID:</div>
                    <div>{kycFile.accountId}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg min-h-[200px] p-4 flex items-center justify-center">
              <div className="text-center">
                <Eye className="mx-auto h-16 w-16 text-slate-400" />
                <p className="mt-2 text-sm text-slate-500">
                  Document preview goes here
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p>No document selected. Please select a document to view.</p>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {kycFile && (
            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
