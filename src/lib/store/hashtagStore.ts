import { create } from "zustand";
import { THashtag } from '@/lib/types/THashtag';

interface HashtagState {
  hashtags: THashtag[];
  setHashtags: (h: THashtag[]) => void;
}
export const useHashtagStore = create<HashtagState>((set) => ({
  hashtags: [],
  setHashtags: (hashtags) => set({ hashtags }),
}));

