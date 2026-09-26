export type Role = 'driver' | 'owner';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
  pin?: string; // drivers only
  truckId: string;
}

export interface Truck {
  id: string;
  plateNumber: string;
  ownerId: string;
}

export type TripStatus = 'active' | 'delivered' | 'settled';

export interface Trip {
  id: string;
  truckId: string;
  driverId: string;
  ownerId: string;
  from: string;
  to: string;
  startDate: string; // ISO date string
  endDate?: string;
  status: TripStatus;
  freightAmount: number;
  advanceAmount: number;
}

export type ExpenseCategory =
  | 'diesel'
  | 'toll'
  | 'food'
  | 'repair'
  | 'loading'
  | 'unloading'
  | 'police'
  | 'other';

export interface Expense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  amount: number;
  hasReceipt: boolean;
  receiptUrl?: string;
  createdAt: string; // ISO datetime
  createdBy: string; // userId
}

export type MoneyType = 'owner_advance' | 'customer_payment' | 'other_income';

export interface MoneyEntry {
  id: string;
  tripId: string;
  type: MoneyType;
  amount: number;
  createdAt: string;
  createdBy: string;
}

export interface Settlement {
  tripId: string;
  totalReceived: number;
  totalExpenses: number;
  balance: number;
  confirmedByDriver: boolean;
  confirmedByOwner: boolean;
  settledAt?: string;
}
