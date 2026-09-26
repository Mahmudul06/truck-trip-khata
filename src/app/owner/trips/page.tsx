'use client';
import { useRouter } from 'next/navigation';

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

      {/* Empty state */}
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
    </div>
  );
}
