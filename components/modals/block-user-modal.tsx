"use client";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const BlockUserModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === ModalType.BLOCK_USER;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onConfirm = () => {
    console.log("Confirm");
  };

  return (
    <Modal
      title="Block a user"
      description="Are you sure you blocked the user?"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
};
