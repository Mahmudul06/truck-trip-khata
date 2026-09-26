'use client';
import { useRouter } from 'next/navigation';

const EXPENSES = [
  { date: '26 Sep', icon: '⛽', label: 'Diesel', by: 'Rahim', amount: 4500, red: true },
  { date: '26 Sep', icon: '🛣️', label: 'Toll', by: 'Rahim', amount: 650, red: true },
  { date: '25 Sep', icon: '⛽', label: 'Diesel', by: 'Rahim', amount: 5000, red: true },
  { date: '25 Sep', icon: '🍽️', label: 'Food', by: 'Rahim', amount: 300, red: true },
  { date: '25 Sep', icon: '💰', label: 'Owner Advance', by: 'You', amount: 20000, red: false },
];

export default function ActiveTripPage() {
  const router = useRouter();

  return (
    <div>
      <div className="px-5 pt-6 pb-5" style={{ background: '#1A1D35' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
          <div>
            <h2 className="text-white font-black text-lg">Guwahati → Siliguri</h2>
            <p className="text-blue-300 text-xs">Rahim Ali · AS01-1234</p>
          </div>
          <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#16A34A' }}>ACTIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Sent', value: '₹28,000', color: '#86EFAC' },
            { label: 'Spent', value: '₹10,450', color: '#FCA5A5' },
            { label: 'Balance', value: '₹17,550', color: '#A5B4FC' },
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
          { label: 'Mark\nDelivered', icon: '✅', color: '#2563EB' },
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
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          {EXPENSES.map((exp, i) => (
            <div key={i} className={`flex items-center px-4 py-3 gap-3 ${i < EXPENSES.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-50">{exp.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{exp.label}</p>
                <p className="text-xs text-slate-400">{exp.date} · {exp.by}</p>
              </div>
              <p className={`font-bold text-sm ${exp.red ? 'text-red-500' : 'text-green-600'}`}>
                {exp.red ? '−' : '+'}₹{exp.amount.toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
