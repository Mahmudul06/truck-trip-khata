'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Numpad from '@/components/shared/Numpad';
import { useAppStore } from '@/store/appStore';
import { MoneyEntry, MoneyType } from '@/types';

const TYPES: { id: MoneyType; label: string; icon: string }[] = [
  { id: 'owner_advance', label: 'Owner Advance', icon: '👤' },
  { id: 'customer_payment', label: 'Customer Payment', icon: '🤝' },
  { id: 'other_income', label: 'Other Income', icon: '💵' },
];

export default function MoneyPage() {
  const [type, setType] = useState<MoneyType>('owner_advance');
  const [amount, setAmount] = useState('0');
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { hydrate, addMoneyEntry, user, activeTrip } = useAppStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  function handleSave() {
    if (parseFloat(amount) <= 0) return;
    const entry: MoneyEntry = {
      id: Date.now().toString(),
      tripId: activeTrip?.id ?? 'demo',
      type,
      amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
      createdBy: user?.id ?? 'driver1',
    };
    addMoneyEntry(entry);
    setSaved(true);
    setTimeout(() => router.push('/driver/home'), 1200);
  }

  const typeMeta = TYPES.find((t) => t.id === type)!;

  if (saved) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-7xl">✅</div>
      <p className="text-2xl font-black text-slate-900">Recorded!</p>
      <p className="text-slate-400">+₹{parseFloat(amount).toLocaleString('en-IN')} · {typeMeta.label}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <div>
          <h2 className="font-black text-slate-900 text-lg">💰 Money Received</h2>
          <p className="text-xs text-slate-400">Record money you received</p>
        </div>
      </div>

      {/* Type selector */}
      <div className="px-4 pt-5 pb-3 flex flex-col gap-2">
        {TYPES.map((t) => (
          <button key={t.id} onClick={() => setType(t.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-colors ${type === t.id ? 'border-indigo-500' : 'border-transparent bg-white'}`}
            style={type === t.id ? { background: '#EEF2FF' } : {}}>
            <span className="text-2xl">{t.icon}</span>
            <span className={`font-bold ${type === t.id ? 'text-indigo-700' : 'text-slate-700'}`}>{t.label}</span>
            {type === t.id && <span className="ml-auto text-indigo-500">✓</span>}
          </button>
        ))}
      </div>

      {/* Amount display */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs font-bold text-slate-400 tracking-widest mb-2">AMOUNT (₹)</p>
        <p className="font-black text-green-600" style={{ fontSize: 52 }}>
          +₹{parseFloat(amount || '0').toLocaleString('en-IN')}
        </p>
      </div>

      <div className="px-4">
        <Numpad value={amount} onChange={setAmount} />
      </div>

      <div className="px-4 mt-4">
        <button onClick={handleSave}
          disabled={parseFloat(amount) <= 0}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#15803D,#16A34A)' }}>
          RECORD RECEIVED MONEY
        </button>
      </div>
    </div>
  );
}
