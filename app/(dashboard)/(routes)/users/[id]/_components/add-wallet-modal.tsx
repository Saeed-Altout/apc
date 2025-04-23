"use client";
import * as React from "react";
import { useParams } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useAddAccountMutation } from "@/services/accounts/accounts-hook";

export const AddWalletModal = () => {
  const { id } = useParams();

  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === ModalType.ADD_WALLET;

  const { mutate: addAccount, isPending } = useAddAccountMutation(String(id));

  const onConfirm = async () => {
    addAccount({ type: "wallet" });
  };
  return (
    <Modal
      title="Add Wallet"
      description="You can add a wallet to the user"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isPending} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onConfirm}>
          Add Wallet {isPending && <Spinner variant="circle" />}
        </Button>
      </div>
    </Modal>
  );
};
