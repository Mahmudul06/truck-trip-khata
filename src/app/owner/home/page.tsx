'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

export default function OwnerHome() {
  const router = useRouter();
  const { hydrate, user, activeTrip, expenses } = useAppStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-6 pb-8" style={{ background: '#1A1D35' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#7B8AB8' }}>TRUCK TRIP KHATA</p>
            <h2 className="text-2xl font-black text-white">{user?.name ?? 'Mohibul'}</h2>
            <p className="text-sm mt-0.5" style={{ color: '#7B8AB8' }}>Truck Owner</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
            style={{ background: '#6C47FF' }}>
            {(user?.name ?? 'M')[0]}
          </div>
        </div>
      </div>

      {/* Active trip card / no trip card */}
      <div className="mx-4 -mt-4 rounded-2xl p-5 bg-white" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
        {activeTrip ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚛</span>
                <div>
                  <p className="font-black text-slate-900">{activeTrip.from} → {activeTrip.to}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(activeTrip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full text-white bg-green-600">Active</span>
            </div>
            <div className="flex gap-4 text-xs text-slate-500 mt-2 pt-2 border-t border-slate-50">
              <span>Expenses: <span className="font-bold text-red-600">₹{expenses.reduce((s, e) => s + e.amount, 0).toLocaleString('en-IN')}</span></span>
              <span>Driver: <span className="font-bold text-slate-700">Mithu</span></span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚛</span>
              <div>
                <p className="font-black text-slate-900">No active trip</p>
                <p className="text-xs text-slate-400">Create a trip to get started</p>
              </div>
            </div>
            <button onClick={() => router.push('/owner/create-trip')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
              style={{ background: '#4F46E5' }}>+ New</button>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: '➕', label: 'NEW TRIP', color: '#4F46E5', href: '/owner/create-trip' },
          { icon: '📋', label: 'ALL TRIPS', color: '#EA580C', href: '/owner/trips' },
          { icon: '💸', label: 'SEND MONEY', color: '#16A34A', href: '/owner/send-money' },
          { icon: '👤', label: 'DRIVERS', color: '#7C3AED', href: '/owner/more' },
        ].map(({ icon, label, color, href }) => (
          <button key={label} onClick={() => router.push(href)}
            className="bg-white rounded-2xl py-5 flex flex-col items-center gap-2"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            <span style={{ fontSize: 32 }}>{icon}</span>
            <span className="font-bold text-xs tracking-wide text-center" style={{ color }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Recent expenses */}
      <div className="mx-4 mt-4 mb-4">
        <p className="text-xs font-bold text-slate-400 tracking-widest mb-3">RECENT EXPENSES</p>
        {expenses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            <span className="text-4xl mb-3">📭</span>
            <p className="font-bold text-slate-500 text-sm">No expenses yet</p>
            <p className="text-xs text-slate-400 mt-1">Expenses will appear here once Mithu starts a trip</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            {expenses.slice(0, 5).map((exp, i) => (
              <div key={exp.id} className={`flex items-center px-4 py-3 gap-3 ${i < Math.min(expenses.length, 5) - 1 ? 'border-b border-slate-50' : ''}`}>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 capitalize">{exp.category}</p>
                  <p className="text-xs text-slate-400">{new Date(exp.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                </div>
                <p className="font-bold text-red-500 text-sm">−₹{exp.amount.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
