'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Numpad from '@/components/shared/Numpad';
import { useAppStore } from '@/store/appStore';
import { MoneyEntry } from '@/types';

type PaymentMethod = 'cash' | 'upi' | 'bank';

const METHODS: { id: PaymentMethod; icon: string; label: string; sub: string }[] = [
  { id: 'cash', icon: '💵', label: 'Cash', sub: 'Physical cash handed over' },
  { id: 'upi', icon: '📱', label: 'UPI / Online', sub: 'GPay, PhonePe, Paytm, NEFT' },
  { id: 'bank', icon: '🏦', label: 'Bank Transfer', sub: 'IMPS / RTGS to driver account' },
];

export default function SendMoneyPage() {
  const router = useRouter();
  const { addMoneyEntry, user, activeTrip } = useAppStore();
  const [amount, setAmount] = useState('0');
  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [sent, setSent] = useState(false);

  // Active trip driver (in real app, fetch from Firestore)
  const driverName = 'Rahim Ali';
  const driverBalance = 17550;

  function handleSend() {
    if (parseFloat(amount) <= 0) return;
    const entry: MoneyEntry = {
      id: Date.now().toString(),
      tripId: activeTrip?.id ?? 'demo',
      type: 'owner_advance',
      amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
      createdBy: user?.id ?? 'owner1',
    };
    addMoneyEntry(entry);
    setSent(true);
    setTimeout(() => router.push('/owner/home'), 1500);
  }

  if (sent) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-7xl">✅</div>
      <p className="text-2xl font-black text-slate-900">Money Sent!</p>
      <p className="text-slate-500">
        ₹{parseFloat(amount).toLocaleString('en-IN')} → {driverName}
      </p>
      <p className="text-xs text-slate-400 capitalize">via {method}</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <div>
          <h2 className="font-black text-slate-900 text-lg">💸 Send Money</h2>
          <p className="text-xs text-slate-400">Send advance to driver</p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Driver info + current balance */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-xl"
            style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
            {driverName[0]}
          </div>
          <div className="flex-1">
            <p className="font-black text-slate-900">{driverName}</p>
            <p className="text-xs text-slate-400">Guwahati → Siliguri · Active trip</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-0.5">Has with him</p>
            <p className="font-black text-indigo-600">₹{driverBalance.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Amount display */}
        <div className="text-center py-2">
          <p className="text-xs font-bold text-slate-400 tracking-widest mb-2">SEND AMOUNT (₹)</p>
          <p className="font-black text-green-600" style={{ fontSize: 52, lineHeight: 1 }}>
            ₹{parseFloat(amount || '0').toLocaleString('en-IN')}
          </p>
          {parseFloat(amount) > 0 && (
            <p className="text-sm text-slate-400 mt-1">
              Driver will have ₹{(driverBalance + parseFloat(amount)).toLocaleString('en-IN')} after this
            </p>
          )}
        </div>

        {/* Numpad */}
        <Numpad value={amount} onChange={setAmount} />

        {/* Payment method */}
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-widest mb-3">PAYMENT METHOD</p>
          <div className="space-y-2">
            {METHODS.map((m) => (
              <button key={m.id} onClick={() => setMethod(m.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-colors text-left ${method === m.id ? 'border-indigo-500' : 'border-transparent bg-white'}`}
                style={method === m.id ? { background: '#EEF2FF' } : {}}>
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className={`font-bold text-sm ${method === m.id ? 'text-indigo-700' : 'text-slate-700'}`}>{m.label}</p>
                  <p className="text-xs text-slate-400">{m.sub}</p>
                </div>
                {method === m.id && <span className="text-indigo-500 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Send button */}
        <button onClick={handleSend} disabled={parseFloat(amount) <= 0}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#15803D,#16A34A)' }}>
          SEND ₹{parseFloat(amount) > 0 ? parseFloat(amount).toLocaleString('en-IN') : '0'} NOW →
        </button>
      </div>
    </div>
  );
}
