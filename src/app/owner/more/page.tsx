'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

const DRIVERS = [
  { name: 'Mithu', phone: '70026 69491', status: 'Available', color: '#DCFCE7', textColor: '#16A34A' },
];

export default function OwnerMorePage() {
  const router = useRouter();
  const { user, logout } = useAppStore();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Profile */}
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          {(user?.name ?? 'M')[0]}
        </div>
        <div>
          <p className="font-black text-slate-900 text-lg">{user?.name ?? 'Mohibul'}</p>
          <p className="text-sm text-slate-400">+91 {user?.phone?.replace(/(\d{5})(\d{5})/, '$1 $2') ?? '70025 58050'}</p>
          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Truck Owner</span>
        </div>
      </div>

      {/* Drivers */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
        <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">MY DRIVERS</p>
        <div className="space-y-3">
          {DRIVERS.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                style={{ background: '#1A1D35' }}>{d.name[0]}</div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">{d.name}</p>
                <p className="text-xs text-slate-400">{d.phone}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: d.color, color: d.textColor }}>{d.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stay logged in */}
      <div className="rounded-2xl p-4" style={{ background: '#DCFCE7' }}>
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">✅</span>
          <div>
            <p className="font-bold text-green-800 text-sm">You stay logged in automatically</p>
            <p className="text-xs text-green-700 mt-0.5">Your session is saved on this phone.</p>
          </div>
        </div>
      </div>

      <button onClick={handleLogout}
        className="w-full py-4 rounded-2xl font-bold text-red-600 bg-red-50 border-2 border-red-100">
        Log Out
      </button>
    </div>
  );
}
