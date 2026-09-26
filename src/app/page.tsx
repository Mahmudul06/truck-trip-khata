'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { local } from '@/lib/localStore';

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    const user = local.getUser();
    if (user) {
      router.replace(user.role === 'driver' ? '/driver/home' : '/owner/home');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#1A1D35' }}>
      <div className="text-center">
        <div className="text-6xl mb-4">🚛</div>
        <p className="text-white font-bold text-xl">Truck Trip Khata</p>
        <p className="text-blue-300 text-sm mt-1">ट्रक ट्रिप खाता</p>
      </div>
    </div>
  );
}
