'use client';
import { useRouter } from 'next/navigation';

export default function OwnerSettlementPage() {
  const router = useRouter();

  const inItems = [
    { label: 'Owner Advance', amount: 20000 },
    { label: 'Customer Payment', amount: 8000 },
  ];
  const expItems = [
    { label: 'Diesel', amount: 9500 },
    { label: 'Toll', amount: 650 },
    { label: 'Food', amount: 300 },
  ];
  const totalIn = inItems.reduce((s, i) => s + i.amount, 0);
  const totalSpent = expItems.reduce((s, i) => s + i.amount, 0);
  const balance = totalIn - totalSpent;

  return (
    <div>
      <div className="px-5 pt-6 pb-5" style={{ background: '#1A1D35' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
          <div>
            <h2 className="text-white text-lg font-black">Trip Settlement</h2>
            <p className="text-blue-300 text-xs">Guwahati → Siliguri · Rahim Ali</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Money given */}
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">MONEY GIVEN</p>
          {inItems.map((item, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-600">{item.label}</span>
              <span className="text-sm font-bold text-green-600">+₹{item.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3">
            <span className="font-bold text-slate-800">Total Given</span>
            <span className="font-black text-green-700">₹{totalIn.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">DRIVER EXPENSES</p>
          {expItems.map((item, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-600 capitalize">{item.label}</span>
              <span className="text-sm font-bold text-red-500">−₹{item.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3">
            <span className="font-bold text-slate-800">Total Spent</span>
            <span className="font-black text-red-600">₹{totalSpent.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Balance */}
        <div className="rounded-2xl p-5 text-center"
          style={{ background: 'linear-gradient(135deg,#3730A3,#4F46E5)', boxShadow: '0 8px 20px rgba(79,70,229,0.4)' }}>
          <p className="text-xs font-bold tracking-wider mb-2" style={{ color: '#A5B4FC' }}>DRIVER GETS BACK</p>
          <p className="text-4xl font-black text-white">₹{balance.toLocaleString('en-IN')}</p>
        </div>

        {/* Confirm buttons */}
        <div className="bg-white rounded-2xl p-4 space-y-3" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-400 tracking-wider">CONFIRMATION</p>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md border-2 border-green-500 flex items-center justify-center">
              <span className="text-green-500 text-xs">✓</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">Driver confirmed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md border-2 border-slate-300" />
            <span className="text-sm font-semibold text-slate-400">Owner confirmation pending</span>
          </div>
        </div>

        <button onClick={() => router.push('/owner/home')}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg"
          style={{ background: 'linear-gradient(135deg,#15803D,#16A34A)' }}>
          CONFIRM & CLOSE TRIP ✓
        </button>
      </div>
    </div>
  );
}
