"use client";
import * as React from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useBlockMultipleUsers } from "@/services/users/users-hook";

export const BlockUsersModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { mutateAsync: blockMultipleUsers, isPending } =
    useBlockMultipleUsers();

  const isModalOpen =
    isOpen && !!data?.usersIds && type === ModalType.BLOCK_MULTIPLE_USERS;

  const onConfirm = async () => {
    if (data?.usersIds) {
      await blockMultipleUsers({
        usersIds: data?.usersIds,
      });
    }
  };

  return (
    <Modal
      title="Block Users"
      description="Are you sure you want to block these users?"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isPending} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} variant="destructive" onClick={onConfirm}>
          Confirm {isPending && <Spinner variant="circle" />}
        </Button>
      </div>
    </Modal>
  );
};
