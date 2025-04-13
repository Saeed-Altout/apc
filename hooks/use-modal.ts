import { create } from "zustand";
import { ModalType } from "@/config/enums";
import { Request } from "@/schemas/request";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: {
    user?: IUserObject;
    usersIds?: number[];
    device?: IDevice;
    request?: Request;
  };
  onOpen: (
    type: ModalType,
    data?: {
      user?: IUserObject;
      usersIds?: number[];
      device?: IDevice;
      request?: Request;
    }
  ) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
