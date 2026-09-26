// Simple localStorage wrapper for offline-first session persistence
import { User, Trip, Expense, MoneyEntry } from '@/types';

const KEYS = {
  currentUser: 'ttk_user',
  activeTrip: 'ttk_active_trip',
  expenses: 'ttk_expenses',
  moneyEntries: 'ttk_money',
};

function get<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function set(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

export const local = {
  getUser: () => get<User>(KEYS.currentUser),
  setUser: (u: User) => set(KEYS.currentUser, u),
  clearUser: () => remove(KEYS.currentUser),

  getActiveTrip: () => get<Trip>(KEYS.activeTrip),
  setActiveTrip: (t: Trip) => set(KEYS.activeTrip, t),
  clearActiveTrip: () => remove(KEYS.activeTrip),

  getExpenses: () => get<Expense[]>(KEYS.expenses) ?? [],
  setExpenses: (list: Expense[]) => set(KEYS.expenses, list),
  addExpense: (e: Expense) => {
    const existing = get<Expense[]>(KEYS.expenses) ?? [];
    set(KEYS.expenses, [e, ...existing]);
  },

  getMoneyEntries: () => get<MoneyEntry[]>(KEYS.moneyEntries) ?? [],
  addMoneyEntry: (m: MoneyEntry) => {
    const existing = get<MoneyEntry[]>(KEYS.moneyEntries) ?? [];
    set(KEYS.moneyEntries, [m, ...existing]);
  },
};
