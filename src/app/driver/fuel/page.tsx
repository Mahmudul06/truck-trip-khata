'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Numpad from '@/components/shared/Numpad';
import ReceiptButton from '@/components/shared/ReceiptButton';
import { useAppStore } from '@/store/appStore';
import { Expense } from '@/types';

export default function FuelPage() {
  const [amount, setAmount] = useState('0');
  const [litres, setLitres] = useState('0');
  const [active, setActive] = useState<'amount' | 'litres'>('amount');
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { hydrate, addExpense, user, activeTrip } = useAppStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  function handleSave() {
    if (parseFloat(amount) <= 0) return;
    const expense: Expense = {
      id: Date.now().toString(),
      tripId: activeTrip?.id ?? 'demo',
      category: 'diesel',
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
      <div className="text-7xl">✅</div>
      <p className="text-2xl font-black text-slate-900">Diesel Saved!</p>
      <p className="text-slate-400">₹{parseFloat(amount).toLocaleString('en-IN')} · {litres} L</p>
    </div>
  );

  const display = active === 'amount' ? amount : litres;
  const setDisplay = active === 'amount' ? setAmount : setLitres;

  return (
    <div>
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <div>
          <h2 className="font-black text-slate-900 text-lg">⛽ Diesel</h2>
          <p className="text-xs text-slate-400">Enter diesel details</p>
        </div>
      </div>

      {/* Two inputs */}
      <div className="px-4 pt-6 pb-4 grid grid-cols-2 gap-3">
        <button onClick={() => setActive('amount')}
          className={`rounded-2xl p-4 text-left border-2 transition-colors ${active === 'amount' ? 'border-indigo-500' : 'border-transparent bg-white'}`}
          style={active === 'amount' ? { background: '#EEF2FF' } : {}}>
          <p className="text-xs text-slate-400 mb-1">Amount (₹)</p>
          <p className="text-2xl font-black text-slate-900">₹{parseFloat(amount).toLocaleString('en-IN')}</p>
        </button>
        <button onClick={() => setActive('litres')}
          className={`rounded-2xl p-4 text-left border-2 transition-colors ${active === 'litres' ? 'border-indigo-500' : 'border-transparent bg-white'}`}
          style={active === 'litres' ? { background: '#EEF2FF' } : {}}>
          <p className="text-xs text-slate-400 mb-1">Litres</p>
          <p className="text-2xl font-black text-slate-900">{litres} L</p>
        </button>
      </div>

      <ReceiptButton
        imageUrl={receiptUrl}
        onCapture={setReceiptUrl}
        onRemove={() => setReceiptUrl(null)}
      />

      <div className="px-4">
        <Numpad value={display} onChange={setDisplay} />
      </div>

      <div className="px-4 mt-4">
        <button onClick={handleSave}
          disabled={parseFloat(amount) <= 0}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#EA580C,#F97316)' }}>
          SAVE DIESEL
        </button>
      </div>
    </div>
  );
}
