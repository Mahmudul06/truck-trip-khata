'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Numpad from '@/components/shared/Numpad';
import ReceiptButton from '@/components/shared/ReceiptButton';
import { useAppStore } from '@/store/appStore';
import { ExpenseCategory, Expense } from '@/types';

const CAT_LABELS: Record<string, string> = {
  toll: '🛣️ Toll', food: '🍽️ Food', repair: '🔧 Repair',
  loading: '📦 Loading', unloading: '📤 Unloading', police: '👮 Police', other: '📌 Other',
};

function AmountForm() {
  const [amount, setAmount] = useState('0');
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const cat = (params.get('cat') ?? 'other') as ExpenseCategory;
  const { hydrate, addExpense, user, activeTrip } = useAppStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  function handleSave() {
    if (parseFloat(amount) <= 0) return;
    const expense: Expense = {
      id: Date.now().toString(),
      tripId: activeTrip?.id ?? 'demo',
      category: cat,
      amount: parseFloat(amount),
      hasReceipt: !!receiptUrl,
      receiptUrl: receiptUrl ?? undefined,
      createdAt: new Date().toISOString(),
      createdBy: user?.id ?? 'driver1',
    };
    addExpense(expense);
    setSaved(true);
    setTimeout(() => router.push('/driver/home'), 1200);
  }

  if (saved) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-7xl" style={{ animation: 'pop 0.4s ease' }}>✅</div>
      <p className="text-2xl font-black text-slate-900">Saved!</p>
      <p className="text-slate-400">₹{parseFloat(amount).toLocaleString('en-IN')} · {CAT_LABELS[cat]}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <div>
          <h2 className="font-black text-slate-900 text-lg">{CAT_LABELS[cat]}</h2>
          <p className="text-xs text-slate-400">Enter amount</p>
        </div>
      </div>

      {/* Amount display */}
      <div className="px-6 py-8 text-center">
        <p className="text-xs font-bold text-slate-400 tracking-widest mb-2">AMOUNT (₹)</p>
        <p className="font-black text-slate-900" style={{ fontSize: 52 }}>
          ₹{parseFloat(amount || '0').toLocaleString('en-IN')}
          {amount.includes('.') && !amount.split('.')[1] ? '.' : ''}
        </p>
      </div>

      <ReceiptButton
        imageUrl={receiptUrl}
        onCapture={setReceiptUrl}
        onRemove={() => setReceiptUrl(null)}
      />

      <div className="px-4">
        <Numpad value={amount} onChange={setAmount} />
      </div>

      <div className="px-4 mt-4">
        <button onClick={handleSave}
          disabled={parseFloat(amount) <= 0}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          SAVE EXPENSE
        </button>
      </div>
    </div>
  );
}

export default function ExpenseAmountPage() {
  return <Suspense><AmountForm /></Suspense>;
}
