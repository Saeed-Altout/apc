"use client";
import * as React from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useSetMainDevice } from "@/services/devices/devices-hook";

export const SetMainDeviceModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { mutateAsync: setMainDevice, isPending } = useSetMainDevice();
  const isModalOpen =
    isOpen && !!data?.device?.id && type === ModalType.SET_MAIN_DEVICE;

  const onConfirm = async () => {
    if (data?.device?.id) {
      await setMainDevice(String(data.device.id));
    }
  };

  return (
    <Modal
      title="Set Main Device"
      description="Are you sure you want to set main this device?"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isPending} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending} onClick={onConfirm}>
          Confirm {isPending && <Spinner variant="circle" />}
        </Button>
      </div>
    </Modal>
  );
};
