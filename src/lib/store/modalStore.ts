import { create } from 'zustand';

type ModalStore = {
  loginModalOpen: boolean;
  profileModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  loginModalOpen: false,
  profileModalOpen: false,

  openLoginModal: () => set({ loginModalOpen: true }),
  closeLoginModal: () => set({ loginModalOpen: false }),

  openProfileModal: () => set({ profileModalOpen: true }),
  closeProfileModal: () => set({ profileModalOpen: false }),
}));