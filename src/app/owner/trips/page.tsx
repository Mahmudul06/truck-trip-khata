'use client';
import { useRouter } from 'next/navigation';

const TRIPS = [
  { id: '1', from: 'Guwahati', to: 'Siliguri', driver: 'Rahim Ali', date: '25 Sep 2026', status: 'active', balance: 17550 },
  { id: '2', from: 'Siliguri', to: 'Patna', driver: 'Suresh Das', date: '18 Sep 2026', status: 'delivered', balance: 12000 },
  { id: '3', from: 'Guwahati', to: 'Kolkata', driver: 'Rahim Ali', date: '10 Sep 2026', status: 'settled', balance: 0 },
];

export default function TripsPage() {
  const router = useRouter();

  return (
    <div>
      <div className="px-5 pt-6 pb-5 bg-white border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-black text-slate-900 text-xl">All Trips</h2>
        <button onClick={() => router.push('/owner/create-trip')}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: '#4F46E5' }}>+ New Trip</button>
      </div>

      <div className="px-4 py-4 space-y-3">
        {TRIPS.map((trip) => (
          <button key={trip.id}
            onClick={() => router.push(trip.status === 'active' ? '/owner/trip' : '/owner/settlement')}
            className="w-full bg-white rounded-2xl p-4 text-left"
            style={{
              boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              border: trip.status === 'active' ? '2px solid #4F46E5' : '2px solid transparent',
            }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-black text-slate-900">{trip.from} → {trip.to}</p>
                <p className="text-xs text-slate-400">{trip.driver} · {trip.date}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: trip.status === 'active' ? '#EEF2FF' : trip.status === 'delivered' ? '#FEF3C7' : '#DCFCE7',
                  color: trip.status === 'active' ? '#4F46E5' : trip.status === 'delivered' ? '#D97706' : '#16A34A',
                }}>
                {trip.status === 'active' ? '● Active' : trip.status === 'delivered' ? '● Delivered' : '✓ Settled'}
              </span>
            </div>
            {trip.status !== 'settled' && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <span className="text-xs text-slate-400">Driver has</span>
                <span className="font-black text-slate-900">₹{trip.balance.toLocaleString('en-IN')}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
