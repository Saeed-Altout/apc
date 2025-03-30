"use client";
import * as React from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useDeleteMultipleUsers } from "@/services/users/users-hook";

export const DeleteUsersModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { mutateAsync: deleteUsers, isPending } = useDeleteMultipleUsers();

  const isModalOpen =
    isOpen && !!data?.usersIds && type === ModalType.DELETE_MULTIPLE_USERS;

  const onConfirm = async () => {
    if (data?.usersIds) {
      await deleteUsers({
        usersIds: data.usersIds,
      });
    }
  };

  return (
    <Modal
      title="Delete Users"
      description="Are you sure you want to delete these users? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isPending} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} variant="destructive" onClick={onConfirm}>
          Delete {isPending && <Spinner variant="circle" />}
        </Button>
      </div>
    </Modal>
  );
};
