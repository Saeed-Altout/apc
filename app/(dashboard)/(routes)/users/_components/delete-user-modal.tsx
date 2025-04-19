"use client";
import * as React from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useDeleteUserMutation } from "@/services/users/users-hook";

export const DeleteUserModal = () => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();
  const { mutateAsync: deleteUser, isPending } = useDeleteUserMutation();

  const isModalOpen =
    isOpen && !!data?.user?.id && type === ModalType.DELETE_USER;

  const onConfirm = async () => {
    if (data?.user?.id) {
      try {
        await deleteUser(String(data.user.id));
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      title="Delete User"
      description="Are you sure you want to delete this user? This action cannot be undone."
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
