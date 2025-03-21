"use client";
import * as React from "react";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const BlockUserModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [loading, setLoading] = React.useState(false);

  const isModalOpen = isOpen && type === ModalType.BLOCK_USER;
  const user = data?.user;

  const isBlocked = user?.status === "blocked";
  const actionText = isBlocked ? "unblock" : "block";
  const actionTitle = isBlocked ? "Unblock User" : "Block User";
  const actionDescription = isBlocked
    ? "Are you sure you want to unblock this user?"
    : "Are you sure you want to block this user? They will no longer be able to access the platform.";

  const onConfirm = async () => {
    try {
      setLoading(true);

      // In a real application, you would make an API call here
      // await axios.patch(`/api/users/${user?.id}`, {
      //   status: isBlocked ? "active" : "blocked"
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`User ${actionText}ed successfully!`);
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={actionTitle}
      description={actionDescription}
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant={isBlocked ? "default" : "destructive"}
          onClick={onConfirm}
        >
          {loading ? "Loading..." : `Confirm`}
        </Button>
      </div>
    </Modal>
  );
};
