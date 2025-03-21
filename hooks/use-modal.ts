import { create } from "zustand";
import { ModalType } from "@/config/enums";
import { User } from "@/schemas/user";
import { Request } from "@/schemas/request";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: {
    user?: User;
    request?: Request;
  };
  onOpen: (type: ModalType, data?: { user?: User; request?: Request }) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
