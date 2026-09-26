'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

export default function ActiveTripPage() {
  const router = useRouter();
  const { expenses, moneyEntries, activeTrip } = useAppStore();

  if (!activeTrip) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 text-center">
      <span className="text-6xl">🚛</span>
      <p className="font-black text-slate-800 text-lg">No active trip</p>
      <p className="text-slate-400 text-sm">Create a trip first to see it here.</p>
      <button onClick={() => router.push('/owner/create-trip')}
        className="px-6 py-3 rounded-2xl text-white font-bold"
        style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
        + Create Trip
      </button>
    </div>
  );

  const totalIn = moneyEntries.reduce((s, m) => s + m.amount, 0);
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIn - totalSpent;

  const catIcon: Record<string, string> = {
    diesel: '⛽', toll: '🛣️', food: '🍽️', repair: '🔧',
    loading: '📦', unloading: '📤', police: '👮', other: '📌',
  };

  return (
    <div>
      <div className="px-5 pt-6 pb-5" style={{ background: '#1A1D35' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
          <div>
            <h2 className="text-white font-black text-lg">{activeTrip.from} → {activeTrip.to}</h2>
            <p className="text-blue-300 text-xs">Mithu</p>
          </div>
          <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#16A34A' }}>ACTIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Sent', value: `₹${totalIn.toLocaleString('en-IN')}`, color: '#86EFAC' },
            { label: 'Spent', value: `₹${totalSpent.toLocaleString('en-IN')}`, color: '#FCA5A5' },
            { label: 'Balance', value: `₹${balance.toLocaleString('en-IN')}`, color: '#A5B4FC' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <p className="text-xs mb-1" style={{ color: '#7B8AB8' }}>{s.label}</p>
              <p className="font-black text-sm" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-4 grid grid-cols-3 gap-2">
        {[
          { label: 'Send\nMoney', icon: '💸', color: '#16A34A', href: '/owner/send-money' },
          { label: 'Mark\nDelivered', icon: '✅', color: '#2563EB', href: null },
          { label: 'Settle\nTrip', icon: '📊', color: '#7C3AED', href: '/owner/settlement' },
        ].map(({ label, icon, color, href }) => (
          <button key={label}
            onClick={() => href && router.push(href)}
            className="bg-white rounded-2xl py-4 flex flex-col items-center gap-1"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <span className="text-2xl">{icon}</span>
            <span className="font-bold text-xs text-center leading-tight whitespace-pre-line" style={{ color }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Expense list */}
      <div className="px-4">
        <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">ALL ENTRIES</p>
        {expenses.length === 0 && moneyEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            <p className="text-slate-400 text-sm">No entries yet. Mithu will add expenses during the trip.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            {[...moneyEntries.map(m => ({ icon: '💰', label: m.type === 'owner_advance' ? 'Owner Advance' : 'Payment', amount: m.amount, red: false, time: m.createdAt })),
              ...expenses.map(e => ({ icon: catIcon[e.category] ?? '📌', label: e.category, amount: e.amount, red: true, time: e.createdAt })),
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
              .map((item, i, arr) => (
                <div key={i} className={`flex items-center px-4 py-3 gap-3 ${i < arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 capitalize">{item.label}</p>
                    <p className="text-xs text-slate-400">Mithu</p>
                  </div>
                  <p className={`font-bold text-sm ${item.red ? 'text-red-500' : 'text-green-600'}`}>
                    {item.red ? '−' : '+'}₹{item.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
