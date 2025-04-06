"use client";
import * as React from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useDeleteDevice } from "@/services/devices/devices-hook";

export const DeleteDeviceModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { mutateAsync: deleteDevice, isPending } = useDeleteDevice();

  const isModalOpen =
    isOpen && !!data?.device?.id && type === ModalType.DELETE_DEVICE;

  const onConfirm = async () => {
    if (data?.device?.id) {
      await deleteDevice(String(data.device.id));
    }
  };

  return (
    <Modal
      title="Delete Device"
      description="Are you sure you want to delete this device? This action cannot be undone."
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
