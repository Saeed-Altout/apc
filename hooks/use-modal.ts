import { create } from "zustand";
import { ModalType } from "@/config/enums";
import { Request } from "@/schemas/request";
import { Transaction } from "@/schemas/transaction";
import { KycFile } from "@/schemas/kyc-file";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: {
    user?: IUserObject;
    ids?: number[];
    device?: IDevice;
    request?: Request;
    transaction?: Transaction;
    kycFile?: KycFile;
  };
  onOpen: (
    type: ModalType,
    data?: {
      user?: IUserObject;
      ids?: number[];
      device?: IDevice;
      request?: Request;
      transaction?: Transaction;
      kycFile?: KycFile;
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
