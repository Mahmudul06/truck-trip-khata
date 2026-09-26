'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

export default function OwnerHome() {
  const router = useRouter();
  const { hydrate, user } = useAppStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-6 pb-8" style={{ background: '#1A1D35' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#7B8AB8' }}>TRUCK TRIP KHATA</p>
            <h2 className="text-2xl font-black text-white">{user?.name ?? 'Ramesh Kumar'}</h2>
            <p className="text-sm mt-0.5" style={{ color: '#7B8AB8' }}>Truck Owner</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
            style={{ background: '#6C47FF' }}>
            {user?.name?.[0] ?? 'R'}
          </div>
        </div>
      </div>

      {/* Truck card */}
      <div className="mx-4 -mt-4 rounded-2xl p-4 bg-white" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚛</span>
            <div>
              <p className="font-black text-slate-900">AS01-1234</p>
              <p className="text-xs text-slate-400">Active trip in progress</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#16A34A' }}>ACTIVE</span>
        </div>
      </div>

      {/* Balance card */}
      <div className="mx-4 mt-3 rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg,#3730A3,#4F46E5,#6C47FF)', boxShadow: '0 8px 28px rgba(79,70,229,0.45)' }}>
        <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#A5B4FC' }}>TRIP BALANCE</p>
        <p className="font-black text-white mb-1" style={{ fontSize: 40, lineHeight: 1 }}>₹17,550</p>
        <p className="text-xs mb-4" style={{ color: '#C7D2FE' }}>Money available with driver · Guwahati → Siliguri</p>
        <div className="flex justify-between">
          <div><p className="text-xs mb-1" style={{ color: '#A5B4FC' }}>Sent</p><p className="font-bold text-white">₹28,000</p></div>
          <div><p className="text-xs mb-1" style={{ color: '#A5B4FC' }}>Spent</p><p className="font-bold" style={{ color: '#FC8181' }}>₹10,450</p></div>
          <div className="text-right"><p className="text-xs mb-1" style={{ color: '#A5B4FC' }}>Freight</p><p className="font-bold text-white">₹45,000</p></div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: '🗺️', label: 'ACTIVE TRIP', color: '#2563EB', href: '/owner/trip' },
          { icon: '💸', label: 'SEND MONEY', color: '#16A34A', href: '/owner/send-money' },
          { icon: '➕', label: 'NEW TRIP', color: '#7C3AED', href: '/owner/create-trip' },
          { icon: '📋', label: 'ALL TRIPS', color: '#EA580C', href: '/owner/trips' },
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
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          {[
            { icon: '⛽', label: 'Diesel', sub: 'Rahim · 10:45 AM', amount: 4500, bg: '#FEF3C7' },
            { icon: '🛣️', label: 'Toll', sub: 'Rahim · 03:40 PM', amount: 650, bg: '#F1F5F9' },
            { icon: '🍽️', label: 'Food', sub: 'Rahim · 01:20 PM', amount: 300, bg: '#FEE2E2' },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center px-4 py-3 gap-3 ${i < arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: item.bg }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
              <p className="font-bold text-red-500 text-sm">−₹{item.amount.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
