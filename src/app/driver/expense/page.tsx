'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExpenseCategory } from '@/types';

const CATEGORIES: { id: ExpenseCategory; icon: string; label: string; color: string }[] = [
  { id: 'toll', icon: '🛣️', label: 'Toll', color: '#FEF3C7' },
  { id: 'food', icon: '🍽️', label: 'Food', color: '#FEE2E2' },
  { id: 'repair', icon: '🔧', label: 'Repair', color: '#E0E7FF' },
  { id: 'loading', icon: '📦', label: 'Loading', color: '#DCFCE7' },
  { id: 'unloading', icon: '📤', label: 'Unloading', color: '#F3E8FF' },
  { id: 'police', icon: '👮', label: 'Police', color: '#FEE2E2' },
  { id: 'other', icon: '📌', label: 'Other', color: '#F1F5F9' },
];

export default function ExpensePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<ExpenseCategory | null>(null);

  function handleSelect(cat: ExpenseCategory) {
    setSelected(cat);
    router.push(`/driver/expense/amount?cat=${cat}`);
  }

  return (
    <div>
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <div>
          <h2 className="font-black text-slate-900 text-lg">Add Expense</h2>
          <p className="text-xs text-slate-400">Choose category</p>
        </div>
      </div>

      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className="rounded-2xl p-5 flex flex-col items-center gap-3 bg-white"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: cat.color }}>
              {cat.icon}
            </div>
            <span className="font-bold text-slate-700 text-sm">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
