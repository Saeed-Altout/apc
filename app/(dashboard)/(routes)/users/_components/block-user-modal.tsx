"use client";
import * as React from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useBlockUserMutation } from "@/services/users/users-hook";

export const BlockUserModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { mutateAsync: blockUser, isPending } = useBlockUserMutation();

  const isModalOpen = isOpen && !!data?.user && type === ModalType.BLOCK_USER;

  const onConfirm = async () => {
    if (data?.user?.id) {
      await blockUser(String(data?.user.id));
    }
  };

  return (
    <Modal
      title="Block User"
      description="Are you sure you want to block this user?"
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
