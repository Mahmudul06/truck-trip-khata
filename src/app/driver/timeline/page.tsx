'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

const catIcon: Record<string, string> = {
  diesel: '⛽', toll: '🛣️', food: '🍽️', repair: '🔧',
  loading: '📦', unloading: '📤', police: '👮', other: '📌',
};

const catColor: Record<string, string> = {
  diesel: '#EA580C', toll: '#94A3B8', food: '#94A3B8',
  repair: '#DC2626', loading: '#16A34A', unloading: '#7C3AED',
  police: '#DC2626', other: '#94A3B8',
};

const DEMO_TIMELINE = [
  { type: 'start', time: '25 Sep · 07:30 AM', label: '🚦 Trip Started', sub: 'Guwahati, Assam', dot: '#2563EB' },
  { type: 'money', time: '25 Sep · 07:35 AM', label: '💰 Owner Advance', sub: '+₹20,000', dot: '#16A34A', green: true },
  { type: 'expense', time: '25 Sep · 09:15 AM', label: '⛽ Diesel', sub: '−₹5,000 · 48.62 L', dot: '#EA580C' },
  { type: 'expense', time: '25 Sep · 01:20 PM', label: '🍽️ Food', sub: '−₹300 · Bongaigaon', dot: '#94A3B8' },
  { type: 'expense', time: '25 Sep · 03:40 PM', label: '🛣️ Toll', sub: '−₹650', dot: '#94A3B8' },
  { type: 'expense', time: '26 Sep · 10:45 AM', label: '⛽ Diesel', sub: '−₹4,500', dot: '#EA580C' },
  { type: 'delivered', time: '26 Sep · 02:10 PM', label: '✅ Delivery Done', sub: 'Siliguri, West Bengal', dot: '#16A34A' },
];

export default function TimelinePage() {
  const router = useRouter();
  const { activeTrip, expenses } = useAppStore();
  const trip = activeTrip ?? { from: 'Guwahati', to: 'Siliguri', startDate: '2026-09-25' };

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0) || 10450;
  const totalIn = 28000;
  const balance = totalIn - totalSpent;

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: '#1A1D35' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
          <div>
            <h2 className="text-white font-black text-lg">{trip.from} → {trip.to}</h2>
            <p className="text-blue-300 text-xs">AS01-1234</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Money In', value: `₹${totalIn.toLocaleString('en-IN')}`, color: '#86EFAC' },
            { label: 'Expenses', value: `₹${totalSpent.toLocaleString('en-IN')}`, color: '#FCA5A5' },
            { label: 'Balance', value: `₹${balance.toLocaleString('en-IN')}`, color: '#A5B4FC' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <p className="text-xs mb-1" style={{ color: '#7B8AB8' }}>{s.label}</p>
              <p className="font-black text-sm" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-4">
        {DEMO_TIMELINE.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: item.dot }} />
              {i < DEMO_TIMELINE.length - 1 && (
                <div className="w-px flex-1 my-1" style={{ background: '#E2E8F0', minHeight: 36 }} />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-xs text-slate-400 mb-0.5">{item.time}</p>
              <p className="text-sm font-bold text-slate-800">{item.label}</p>
              <p className={`text-xs font-semibold ${item.green ? 'text-green-600' : 'text-slate-400'}`}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <button onClick={() => router.push('/driver/settlement')}
          className="w-full py-4 rounded-2xl font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          VIEW SETTLEMENT →
        </button>
      </div>
    </div>
  );
}
