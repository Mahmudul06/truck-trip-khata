import { create } from 'zustand';
import { User, Trip, Expense, MoneyEntry } from '@/types';
import { local } from '@/lib/localStore';
import * as db from '@/lib/db';
import { isFirebaseConfigured } from '@/lib/firebase';

interface AppState {
  user: User | null;
  activeTrip: Trip | null;
  expenses: Expense[];
  moneyEntries: MoneyEntry[];
  syncing: boolean;

  setUser: (u: User | null) => void;
  setActiveTrip: (t: Trip | null) => void;
  addExpense: (e: Expense) => Promise<void>;
  addMoneyEntry: (m: MoneyEntry) => Promise<void>;
  logout: () => void;
  hydrate: () => Promise<void>;
  syncFromFirestore: (tripId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  activeTrip: null,
  expenses: [],
  moneyEntries: [],
  syncing: false,

  hydrate: async () => {
    // Always load from localStorage first (instant, works offline)
    const user = local.getUser();
    const activeTrip = local.getActiveTrip();
    const expenses = local.getExpenses();
    const moneyEntries = local.getMoneyEntries();
    set({ user, activeTrip, expenses, moneyEntries });

    // Then sync from Firestore if configured and there's an active trip
    if (isFirebaseConfigured && activeTrip) {
      get().syncFromFirestore(activeTrip.id);
    }
  },

  syncFromFirestore: async (tripId: string) => {
    if (!isFirebaseConfigured) return;
    set({ syncing: true });
    try {
      const [expenses, moneyEntries] = await Promise.all([
        db.getTripExpenses(tripId),
        db.getTripMoneyEntries(tripId),
      ]);
      local.setExpenses(expenses);
      set({ expenses, moneyEntries, syncing: false });
    } catch {
      set({ syncing: false });
    }
  },

  setUser: (user) => {
    if (user) local.setUser(user);
    else local.clearUser();
    set({ user });
  },

  setActiveTrip: (activeTrip) => {
    if (activeTrip) local.setActiveTrip(activeTrip);
    else local.clearActiveTrip();
    set({ activeTrip });
  },

  addExpense: async (e) => {
    // Optimistic update — instant in UI
    local.addExpense(e);
    set((s) => ({ expenses: [e, ...s.expenses] }));

    // Background sync to Firestore
    if (isFirebaseConfigured) {
      try {
        const { id, ...rest } = e;
        await db.addExpense(rest);
      } catch {
        // Firestore unavailable (offline) — localStorage already has it, will sync later
      }
    }
  },

  addMoneyEntry: async (m) => {
    local.addMoneyEntry(m);
    set((s) => ({ moneyEntries: [m, ...s.moneyEntries] }));

    if (isFirebaseConfigured) {
      try {
        const { id, ...rest } = m;
        await db.addMoneyEntry(rest);
      } catch { /* offline — stored locally */ }
    }
  },

  logout: () => {
    local.clearUser();
    local.clearActiveTrip();
    set({ user: null, activeTrip: null, expenses: [], moneyEntries: [] });
  },
}));
