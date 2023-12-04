import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCountStore = create(
  persist(
    (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
      dec: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      // name of the item in the storage (must be unique)
      name: "food-storage", 
      // (optional) by default, 'localStorage' is used
      // storage: createJSONStorage(() => sessionStorage), 
    }
  )
);

export default useCountStore;
