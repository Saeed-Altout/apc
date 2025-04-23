"use client";
import * as React from "react";
import { useParams } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useAddAccountMutation } from "@/services/accounts/accounts-hook";

export const AddAccountModal = () => {
  const { id } = useParams();

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === ModalType.ADD_ACCOUNT;

  const { mutate: addAccount, isPending } = useAddAccountMutation(String(id));

  const onConfirm = async () => {
    addAccount({ type: "trade" });
  };

  return (
    <Modal
      title="Add Account"
      description="You can add an account to the user"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isPending} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onConfirm}>
          Add Account {isPending && <Spinner variant="circle" />}
        </Button>
      </div>
    </Modal>
  );
};
