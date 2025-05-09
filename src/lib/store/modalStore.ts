import { create } from 'zustand';

type ModalStore = {
  loginModalOpen: boolean;
  profileModalOpen: boolean;
  deleteAccountModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openDeleteAccountModal: () => void;
  closeDeleteAccountModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  loginModalOpen: false,
  profileModalOpen: false,
  deleteAccountModalOpen: false,
  
  openLoginModal: () => set({ loginModalOpen: true }),
  closeLoginModal: () => set({ loginModalOpen: false }),
  
  openProfileModal: () => set({ profileModalOpen: true }),
  closeProfileModal: () => set({ profileModalOpen: false }),
  
  openDeleteAccountModal: () => set({ deleteAccountModalOpen: true }),
  closeDeleteAccountModal: () => set({ deleteAccountModalOpen: false }),
}));