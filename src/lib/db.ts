import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc,
  query, where, orderBy, onSnapshot, serverTimestamp, Unsubscribe,
} from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from './firebase';
import { User, Trip, Expense, MoneyEntry, Truck } from '@/types';

// ─── Users ────────────────────────────────────────────────────────────────

export async function getUserByPhone(phone: string): Promise<User | null> {
  if (!isFirebaseConfigured) return null;
  const q = query(collection(getDb(), 'users'), where('phone', '==', phone));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as User;
}

export async function createUser(user: User): Promise<void> {
  if (!isFirebaseConfigured) return;
  await setDoc(doc(getDb(), 'users', user.id), user);
}

// ─── Trips ────────────────────────────────────────────────────────────────

export async function getActiveTrip(truckId: string): Promise<Trip | null> {
  if (!isFirebaseConfigured) return null;
  const q = query(
    collection(getDb(), 'trips'),
    where('truckId', '==', truckId),
    where('status', '==', 'active'),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Trip;
}

export async function getAllTrips(truckId: string): Promise<Trip[]> {
  if (!isFirebaseConfigured) return [];
  const q = query(collection(getDb(), 'trips'), where('truckId', '==', truckId), orderBy('startDate', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Trip);
}

export async function createTrip(trip: Omit<Trip, 'id'>): Promise<string> {
  const ref = await addDoc(collection(getDb(), 'trips'), { ...trip, createdAt: serverTimestamp() });
  return ref.id;
}

export async function updateTripStatus(tripId: string, status: Trip['status']): Promise<void> {
  if (!isFirebaseConfigured) return;
  await updateDoc(doc(getDb(), 'trips', tripId), { status, updatedAt: serverTimestamp() });
}

// ─── Expenses ─────────────────────────────────────────────────────────────

export async function addExpense(expense: Omit<Expense, 'id'>): Promise<string> {
  const ref = await addDoc(collection(getDb(), 'expenses'), expense);
  return ref.id;
}

export async function getTripExpenses(tripId: string): Promise<Expense[]> {
  if (!isFirebaseConfigured) return [];
  const q = query(collection(getDb(), 'expenses'), where('tripId', '==', tripId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Expense);
}

export function listenToExpenses(tripId: string, callback: (expenses: Expense[]) => void): Unsubscribe {
  const q = query(collection(getDb(), 'expenses'), where('tripId', '==', tripId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Expense));
  });
}

// ─── Money Entries ────────────────────────────────────────────────────────

export async function addMoneyEntry(entry: Omit<MoneyEntry, 'id'>): Promise<string> {
  const ref = await addDoc(collection(getDb(), 'moneyEntries'), entry);
  return ref.id;
}

export async function getTripMoneyEntries(tripId: string): Promise<MoneyEntry[]> {
  if (!isFirebaseConfigured) return [];
  const q = query(collection(getDb(), 'moneyEntries'), where('tripId', '==', tripId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as MoneyEntry);
}

export function listenToMoneyEntries(tripId: string, callback: (entries: MoneyEntry[]) => void): Unsubscribe {
  const q = query(collection(getDb(), 'moneyEntries'), where('tripId', '==', tripId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as MoneyEntry));
  });
}

// ─── Trucks ───────────────────────────────────────────────────────────────

export async function getTruck(truckId: string): Promise<Truck | null> {
  if (!isFirebaseConfigured) return null;
  const snap = await getDoc(doc(getDb(), 'trucks', truckId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Truck;
}
