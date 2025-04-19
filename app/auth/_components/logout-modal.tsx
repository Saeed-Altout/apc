"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Modal } from "@/components/ui/modal";

import { ModalType } from "@/config/enums";
import { useModal } from "@/hooks/use-modal";
import { useLogout } from "@/services/auth/auth-hook";

export const LogoutModal = () => {
  const { mutateAsync: logout, isPending } = useLogout();
  const { isOpen, type, onClose } = useModal();
  const isOpenModal = isOpen && type === ModalType.LOGOUT;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={onClose}
      title="Logout"
      description="Are you sure you want to log out? You will need to login again to access protected areas."
    >
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleLogout}
          disabled={isPending}
        >
          Logout
          {isPending && <Spinner variant="circle" />}
        </Button>
      </div>
    </Modal>
  );
};
