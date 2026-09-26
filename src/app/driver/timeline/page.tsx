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

export default function TimelinePage() {
  const router = useRouter();
  const { activeTrip, expenses, moneyEntries } = useAppStore();

  const totalIn = moneyEntries.reduce((s, m) => s + m.amount, 0);
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIn - totalSpent;

  if (!activeTrip) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 text-center">
      <span className="text-6xl">📋</span>
      <p className="font-black text-slate-800 text-lg">No active trip</p>
      <p className="text-slate-400 text-sm">Your trip details will appear here once Mohibul creates a trip.</p>
    </div>
  );

  // Build combined timeline from real data
  const timeline = [
    { time: activeTrip.startDate, label: '🚦 Trip Started', sub: activeTrip.from, dot: '#2563EB', green: false },
    ...moneyEntries.map(m => ({
      time: m.createdAt,
      label: '💰 ' + (m.type === 'owner_advance' ? 'Owner Advance' : 'Customer Payment'),
      sub: '+₹' + m.amount.toLocaleString('en-IN'),
      dot: '#16A34A',
      green: true,
    })),
    ...expenses.map(e => ({
      time: e.createdAt,
      label: (catIcon[e.category] ?? '📌') + ' ' + e.category.charAt(0).toUpperCase() + e.category.slice(1),
      sub: '−₹' + e.amount.toLocaleString('en-IN'),
      dot: catColor[e.category] ?? '#94A3B8',
      green: false,
    })),
  ].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div>
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: '#1A1D35' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
          <div>
            <h2 className="text-white font-black text-lg">{activeTrip.from} → {activeTrip.to}</h2>
            <p className="text-blue-300 text-xs">{new Date(activeTrip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
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
        {timeline.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 text-sm">No entries yet. Add expenses using the home screen.</p>
          </div>
        ) : (
          timeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: item.dot }} />
                {i < timeline.length - 1 && (
                  <div className="w-px flex-1 my-1" style={{ background: '#E2E8F0', minHeight: 36 }} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-xs text-slate-400 mb-0.5">
                  {new Date(item.time).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                <p className={`text-xs font-semibold ${item.green ? 'text-green-600' : 'text-slate-400'}`}>{item.sub}</p>
              </div>
            </div>
          ))
        )}
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
