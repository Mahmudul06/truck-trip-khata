'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DRIVERS = [
  { id: 'driver1', name: 'Rahim Ali', phone: '98765 43211', status: 'Available' },
  { id: 'driver2', name: 'Suresh Das', phone: '98765 43212', status: 'Available' },
];

export default function CreateTripPage() {
  const router = useRouter();
  const [driverId, setDriverId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [advance, setAdvance] = useState('');
  const [freight, setFreight] = useState('');
  const [created, setCreated] = useState(false);

  function handleCreate() {
    if (!driverId || !from || !to) return;
    setCreated(true);
    setTimeout(() => router.push('/owner/home'), 1500);
  }

  if (created) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-7xl">🚛</div>
      <p className="text-2xl font-black text-slate-900">Trip Created!</p>
      <p className="text-slate-400">{from} → {to}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <h2 className="font-black text-slate-900 text-lg">New Trip</h2>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Driver selection */}
        <div>
          <p className="text-xs font-bold text-slate-500 tracking-wider mb-3">SELECT DRIVER</p>
          <div className="space-y-2">
            {DRIVERS.map((d) => (
              <button key={d.id} onClick={() => setDriverId(d.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-colors ${driverId === d.id ? 'border-indigo-500' : 'border-transparent bg-white'}`}
                style={driverId === d.id ? { background: '#EEF2FF' } : {}}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-xl"
                  style={{ background: '#1A1D35' }}>{d.name[0]}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-slate-900">{d.name}</p>
                  <p className="text-xs text-slate-400">{d.phone}</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{d.status}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Route */}
        <div className="bg-white rounded-2xl p-4 space-y-3" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-500 tracking-wider">ROUTE</p>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From (e.g. Guwahati)"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-indigo-400" />
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To (e.g. Siliguri)"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-indigo-400" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-indigo-400" />
        </div>

        {/* Amounts */}
        <div className="bg-white rounded-2xl p-4 space-y-3" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <p className="text-xs font-bold text-slate-500 tracking-wider">AMOUNTS</p>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Advance to Driver (₹)</label>
            <input type="number" value={advance} onChange={(e) => setAdvance(e.target.value)} placeholder="0"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-lg font-black focus:outline-none focus:border-indigo-400" />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Freight Amount (₹)</label>
            <input type="number" value={freight} onChange={(e) => setFreight(e.target.value)} placeholder="0"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-lg font-black focus:outline-none focus:border-indigo-400" />
          </div>
        </div>

        <button onClick={handleCreate}
          disabled={!driverId || !from || !to}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          CREATE TRIP 🚛
        </button>
      </div>
    </div>
  );
}
