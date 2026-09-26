'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  delivered: 'Delivered',
  settled: 'Settled',
};

const STATUS_COLOR: Record<string, string> = {
  active: '#16A34A',
  delivered: '#EA580C',
  settled: '#94A3B8',
};

export default function TripsPage() {
  const router = useRouter();
  const { trips, hydrate } = useAppStore();

  useEffect(() => { hydrate(); }, [hydrate]);

  return (
    <div>
      <div className="px-5 pt-6 pb-5 bg-white border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-black text-slate-900 text-xl">All Trips</h2>
        <button onClick={() => router.push('/owner/create-trip')}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: '#4F46E5' }}>+ New Trip</button>
      </div>

      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <span className="text-6xl mb-4">🚛</span>
          <p className="font-black text-slate-800 text-lg mb-2">No trips yet</p>
          <p className="text-slate-400 text-sm mb-6">Create your first trip and assign Mithu as driver.</p>
          <button onClick={() => router.push('/owner/create-trip')}
            className="px-6 py-3 rounded-2xl text-white font-bold"
            style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
            + Create First Trip
          </button>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-2xl p-4"
              style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-black text-slate-900">{trip.from} → {trip.to}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full text-white"
                  style={{ background: STATUS_COLOR[trip.status] ?? '#94A3B8' }}>
                  {STATUS_LABEL[trip.status] ?? trip.status}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-slate-500 mt-2">
                {trip.advanceAmount > 0 && (
                  <span>Advance: <span className="font-bold text-slate-700">₹{trip.advanceAmount.toLocaleString('en-IN')}</span></span>
                )}
                {trip.freightAmount > 0 && (
                  <span>Freight: <span className="font-bold text-slate-700">₹{trip.freightAmount.toLocaleString('en-IN')}</span></span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
