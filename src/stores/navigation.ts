import { create } from "zustand";

interface NavigationState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

const useNavigation = create<NavigationState>((set) => ({
  visible: false,
  setVisible: (visible) =>
    set((state) => ({
      ...state,
      visible,
    })),
}));

export default useNavigation;
