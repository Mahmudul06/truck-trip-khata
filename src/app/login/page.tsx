'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneNumpad from '@/components/shared/PhoneNumpad';
import { useAppStore } from '@/store/appStore';
import { User } from '@/types';

const DEMO_USERS: User[] = [
  { id: 'owner1', name: 'Mohibul', phone: '7002558050', role: 'owner', truckId: 'truck1' },
  { id: 'driver1', name: 'Mithu', phone: '7002669491', role: 'driver', pin: '1234', truckId: 'truck1' },
];

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useAppStore();

  function handleNext() {
    const user = DEMO_USERS.find((u) => u.phone === phone);
    if (!user) { setError('Number not registered. Contact your truck owner.'); return; }
    setError('');
    if (user.role === 'owner') {
      setUser(user);
      router.push('/owner/home');
    } else {
      // Store temporarily for PIN screen
      sessionStorage.setItem('ttk_pending_user', JSON.stringify(user));
      router.push('/login/pin');
    }
  }

  const formatted = phone.replace(/(\d{5})(\d{0,5})/, '$1 $2').trim();

  return (
    <div className="min-h-screen flex flex-col px-6 py-10" style={{ background: '#F5F6FA' }}>
      {/* Logo */}
      <div className="flex flex-col items-center mt-8 mb-10">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 text-5xl shadow-lg"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          🚛
        </div>
        <h1 className="text-2xl font-black text-slate-900">Truck Trip Khata</h1>
        <p className="text-slate-400 text-sm mt-1">ट्रक ट्रिप खाता</p>
      </div>

      {/* Phone display */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Your Mobile Number</p>
        <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border-2 border-indigo-300 shadow-sm">
          <span className="text-slate-500 font-semibold text-lg">+91</span>
          <div className="w-px h-6 bg-slate-200" />
          <p className="text-2xl font-black text-slate-900 tracking-widest flex-1 min-h-[36px]">
            {formatted || <span className="text-slate-300">_ _ _ _ _   _ _ _ _ _</span>}
          </p>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
      </div>

      <PhoneNumpad value={phone} onChange={setPhone} maxLen={10} />

      <button
        onClick={handleNext}
        disabled={phone.length !== 10}
        className="mt-5 w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40 transition-opacity"
        style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}
      >
        NEXT →
      </button>

      <p className="text-center text-xs text-slate-400 mt-5">
        Your number was shared by your truck owner.<br />Contact owner if you need help.
      </p>
    </div>
  );
}
