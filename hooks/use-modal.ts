import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ModalType } from "@/config/enums";

interface ModalStore {
  isOpen: boolean;
  type: ModalType | undefined;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>()(
  persist(
    (set) => ({
      isOpen: false,
      type: undefined,
      onOpen: (type) => set({ isOpen: true, type }),
      onClose: () => set({ isOpen: false, type: undefined }),
    }),
    {
      name: "modal-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
