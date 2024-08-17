import { create } from 'zustand';

const useStore = create((set) => ({
  rates: { date: null, buyingRate: 0, sellingRate: 0 },
  setRates: (newRates) => set({ rates: newRates }),
  cashFloat: { thb: 0, myr: 0 },
  setCashFloat: (newCashFloat) => set({ cashFloat: newCashFloat }),
}));

export default useStore;
