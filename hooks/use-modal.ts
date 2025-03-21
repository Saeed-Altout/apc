import { create } from "zustand";
import { ModalType } from "@/config/enums";
import { User } from "@/schemas/user";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: {
    user?: User;
  };
  onOpen: (type: ModalType, data?: { user?: User }) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
