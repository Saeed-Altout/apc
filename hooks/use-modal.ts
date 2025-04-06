import { create } from "zustand";
import { ModalType } from "@/config/enums";
import { User } from "@/app/(dashboard)/(routes)/users/_components/columns";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: {
    user?: User;
    usersIds?: number[];
    device?: IDevice;
  };
  onOpen: (
    type: ModalType,
    data?: { user?: User; usersIds?: number[]; device?: IDevice }
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
