'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { useLang } from '@/i18n/LangContext';

export default function DriverHome() {
  const { hydrate, user, activeTrip, expenses, moneyEntries } = useAppStore();
  const { t } = useLang();
  const router = useRouter();

  useEffect(() => { hydrate(); }, [hydrate]);

  const trip = activeTrip ?? {
    id: 'demo', from: 'Guwahati', to: 'Siliguri', startDate: '2026-09-25',
    status: 'active' as const, advanceAmount: 20000, freightAmount: 45000,
    truckId: 'truck1', driverId: 'driver1', ownerId: 'owner1',
  };

  const totalReceived = moneyEntries.reduce((s, m) => s + m.amount, 0) || 28000;
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0) || 9500;
  const balance = totalReceived - totalSpent;

  const recentExpenses = expenses.slice(0, 3).length
    ? expenses.slice(0, 3)
    : [
        { id: '1', category: 'diesel' as const, amount: 4500, createdAt: '2026-09-26T10:45:00', tripId: 'demo', hasReceipt: false, createdBy: 'driver1', note: 'NH27' },
        { id: '2', category: 'food' as const, amount: 300, createdAt: '2026-09-26T08:20:00', tripId: 'demo', hasReceipt: false, createdBy: 'driver1', note: 'Bongaigaon' },
      ];

  const catIcon: Record<string, string> = {
    diesel: '⛽', toll: '🛣️', food: '🍽️', repair: '🔧',
    loading: '📦', unloading: '📤', police: '👮', other: '📌',
  };

  return (
    <div>
      {/* Dark navy header */}
      <div className="px-5 pt-6 pb-8" style={{ background: '#1A1D35' }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#7B8AB8' }}>{t('myTrip')}</p>
            <h2 className="text-2xl font-black text-white">{trip.from} → {trip.to}</h2>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
            style={{ background: '#6C47FF' }}>
            {user?.name?.[0] ?? 'R'}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">🚛</span>
            <span className="text-sm font-semibold" style={{ color: '#7B8AB8' }}>AS01-1234</span>
            <span style={{ color: '#7B8AB8' }}>•</span>
            <span className="text-sm font-semibold" style={{ color: '#7B8AB8' }}>
              {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#16A34A' }}>
            {t('onTheWay')}
          </span>
        </div>
      </div>

      {/* Money card */}
      <div className="mx-4 -mt-4 rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg,#3730A3 0%,#4F46E5 60%,#6C47FF 100%)', boxShadow: '0 8px 28px rgba(79,70,229,0.45)' }}>
        <p className="text-xs font-bold tracking-widest mb-2" style={{ color: '#A5B4FC' }}>{t('moneyAvailable')}</p>
        <p className="font-black text-white mb-1" style={{ fontSize: 44, lineHeight: 1 }}>
          ₹{balance.toLocaleString('en-IN')}
        </p>
        <p className="text-xs mb-5" style={{ color: '#C7D2FE' }}>{t('currentlyWith')}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-xs mb-1" style={{ color: '#A5B4FC' }}>{t('received')}</p>
            <p className="text-lg font-bold text-white">₹{totalReceived.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: '#A5B4FC' }}>{t('spent')}</p>
            <p className="text-lg font-bold" style={{ color: '#FC8181' }}>₹{totalSpent.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <p className="text-xs mb-1" style={{ color: '#A5B4FC' }}>{t('expenses')}</p>
            <p className="text-lg font-bold text-white">{expenses.length || 7} {t('items')}</p>
          </div>
        </div>
      </div>

      {/* 4 buttons */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: '⛽', label: t('diesel'), color: '#EA580C', href: '/driver/fuel' },
          { icon: '💸', label: t('expense'), color: '#16A34A', href: '/driver/expense' },
          { icon: '💰', label: t('moneyReceived'), color: '#EA580C', href: '/driver/money' },
          { icon: '📷', label: t('billPhoto'), color: '#7C3AED', href: '/driver/bill-photo' },
        ].map(({ icon, label, color, href }) => (
          <button key={label}
            onClick={() => href && router.push(href)}
            className="bg-white rounded-2xl py-5 flex flex-col items-center gap-2"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
            <span style={{ fontSize: 32 }}>{icon}</span>
            <span className="font-bold text-xs tracking-wide text-center leading-tight whitespace-pre-line"
              style={{ color }}>{label}</span>
          </button>
        ))}
      </div>

      {/* View Trip Details */}
      <div className="mx-4 mt-3">
        <button onClick={() => router.push('/driver/timeline')}
          className="w-full py-4 rounded-2xl bg-white font-bold tracking-widest text-slate-700 text-sm"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          {t('viewTripDetails')}
        </button>
      </div>

      {/* Recent */}
      <div className="mx-4 mt-4 mb-4">
        <p className="text-xs font-bold text-slate-400 tracking-widest mb-3">{t('recent')}</p>
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          {recentExpenses.map((exp, i) => (
            <div key={exp.id} className={`flex items-center px-4 py-3 gap-3 ${i < recentExpenses.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: exp.category === 'diesel' ? '#FEF3C7' : exp.category === 'food' ? '#FEE2E2' : '#F1F5F9' }}>
                {catIcon[exp.category]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800 capitalize">{exp.category}</p>
                <p className="text-xs text-slate-400">
                  {new Date(exp.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <p className="font-bold text-red-500 text-sm">−₹{exp.amount.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
