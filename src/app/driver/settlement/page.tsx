'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

export default function DriverSettlementPage() {
  const router = useRouter();
  const { expenses, moneyEntries, activeTrip } = useAppStore();

  const totalIn = moneyEntries.reduce((s, m) => s + m.amount, 0);
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIn - totalSpent;

  return (
    <div>
      <div className="px-5 pt-6 pb-5" style={{ background: '#1A1D35' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
          <div>
            <h2 className="text-white text-lg font-black">Trip Settlement</h2>
            <p className="text-blue-300 text-xs">
              {activeTrip ? `${activeTrip.from} → ${activeTrip.to}` : 'Current Trip'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Money In */}
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">MONEY RECEIVED</p>
          {moneyEntries.length === 0 ? (
            <p className="text-sm text-slate-400 py-2">No money received yet</p>
          ) : (
            moneyEntries.map((m, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">
                  {m.type === 'owner_advance' ? 'Owner Advance' : m.type === 'customer_payment' ? 'Customer Payment' : 'Other'}
                </span>
                <span className="text-sm font-bold text-green-600">+₹{m.amount.toLocaleString('en-IN')}</span>
              </div>
            ))
          )}
          <div className="flex justify-between pt-3">
            <span className="font-bold text-slate-800">Total In</span>
            <span className="font-black text-green-700">₹{totalIn.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">EXPENSES SPENT</p>
          {expenses.length === 0 ? (
            <p className="text-sm text-slate-400 py-2">No expenses yet</p>
          ) : (
            expenses.map((e, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600 capitalize">{e.category}</span>
                <span className="text-sm font-bold text-red-500">−₹{e.amount.toLocaleString('en-IN')}</span>
              </div>
            ))
          )}
          <div className="flex justify-between pt-3">
            <span className="font-bold text-slate-800">Total Spent</span>
            <span className="font-black text-red-600">₹{totalSpent.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Final balance */}
        <div className="rounded-2xl p-5 text-center"
          style={{ background: balance >= 0 ? 'linear-gradient(135deg,#15803D,#16A34A)' : 'linear-gradient(135deg,#DC2626,#EF4444)' }}>
          <p className="text-xs font-bold text-green-100 tracking-wider mb-2">
            {balance >= 0 ? 'YOU GET BACK' : 'YOU OWE OWNER'}
          </p>
          <p className="text-4xl font-black text-white">₹{Math.abs(balance).toLocaleString('en-IN')}</p>
        </div>

        <p className="text-center text-xs text-slate-400 px-4">
          Mohibul will confirm and close this settlement.
        </p>

        <button className="w-full py-4 rounded-2xl font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          CONFIRM SETTLEMENT ✓
        </button>
      </div>
    </div>
  );
}
