"use client";

import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Check, X, Edit, FileText } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { Request } from "@/schemas/request";

interface DataTableRowActionsProps {
  row?: Row<Request>;
  request?: Request;
}

export function DataTableRowActions({
  row,
  request,
}: DataTableRowActionsProps) {
  const { onOpen } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  // Get the request object either directly or from the row
  const requestData = request || (row?.original as Request);

  const handleApprove = () => {
    onOpen(ModalType.APPROVE_REQUEST, { request: requestData });
    setIsOpen(false);
  };

  const handleReject = () => {
    onOpen(ModalType.REJECT_REQUEST, { request: requestData });
    setIsOpen(false);
  };

  const disableActions = requestData.status !== "pending";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Actions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center"
          onClick={() => {
            /* Handle view details */
            setIsOpen(false);
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center"
          onClick={() => {
            /* Handle edit */
            setIsOpen(false);
          }}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {disableActions ? (
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            This request has already been {requestData.status}
          </DropdownMenuLabel>
        ) : (
          <>
            <DropdownMenuItem
              className="flex items-center text-green-600"
              onClick={handleApprove}
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center text-destructive"
              onClick={handleReject}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
