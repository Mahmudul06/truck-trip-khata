'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { User } from '@/types';

const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

export default function PinPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { setUser: storeSetUser } = useAppStore();

  useEffect(() => {
    const raw = sessionStorage.getItem('ttk_pending_user');
    if (!raw) { router.replace('/login'); return; }
    setUser(JSON.parse(raw));
  }, [router]);

  function press(key: string) {
    if (!key) return;
    if (key === '⌫') { setPin((p) => p.slice(0, -1)); setError(''); return; }
    if (pin.length >= 4) return;
    const next = pin + key;
    setPin(next);
    if (next.length === 4) {
      if (next === user?.pin) {
        sessionStorage.removeItem('ttk_pending_user');
        storeSetUser(user!);
        router.push('/driver/home');
      } else {
        setError('Wrong PIN. Try again.');
        setTimeout(() => { setPin(''); setError(''); }, 800);
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8" style={{ background: '#F5F6FA' }}>
      {/* Back + header */}
      <div className="flex items-center gap-3 mb-10">
        <button onClick={() => router.back()}
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border-2 border-slate-200 text-lg font-bold">
          ←
        </button>
        <div>
          <p className="text-slate-400 text-sm">+91 {user?.phone?.replace(/(\d{5})(\d{5})/, '$1 $2')}</p>
          <h2 className="text-xl font-black text-slate-900">Enter your PIN</h2>
        </div>
      </div>

      {/* PIN circles */}
      <div className="flex justify-center gap-5 mb-3">
        {[0,1,2,3].map((i) => (
          <div key={i}
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: i < pin.length ? '#1A1D35' : '#E2E8F0' }}>
            <div className="w-5 h-5 rounded-full" style={{ background: i < pin.length ? 'white' : '#94A3B8' }} />
          </div>
        ))}
      </div>
      {error
        ? <p className="text-center text-red-500 text-sm font-semibold mb-10">{error}</p>
        : <p className="text-center text-xs text-slate-400 mb-10">4-digit PIN given by your owner</p>
      }

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-3">
        {KEYS.map((k, i) => (
          <button key={i}
            onPointerDown={(e) => { e.preventDefault(); press(k); }}
            className={`h-16 rounded-2xl text-2xl font-bold text-slate-800 active:bg-slate-100 select-none ${k ? 'bg-white shadow-sm' : ''}`}>
            {k}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-8">Forgot PIN? Call your truck owner</p>
    </div>
  );
}
