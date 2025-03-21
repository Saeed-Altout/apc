"use client";
import * as React from "react";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";

export const DeleteUserModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [loading, setLoading] = React.useState(false);

  const isModalOpen = isOpen && type === ModalType.DELETE_USER;
  const user = data?.user;

  const onConfirm = async () => {
    try {
      setLoading(true);

      // In a real application, you would make an API call here
      // await axios.delete(`/api/users/${user?.id}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("User deleted successfully!");
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
      title="Delete User"
      description="Are you sure you want to delete this user? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading ? "Loading..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};
