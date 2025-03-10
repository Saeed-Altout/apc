"use client";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const DeleteUserModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === ModalType.DELETE_USER;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onConfirm = () => {
    console.log("Confirm");
  };

  return (
    <Modal
      title="Delete a user"
      description="Are you sure you want to delete the user?"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
