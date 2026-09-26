'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { local } from '@/lib/localStore';
import BottomNav from '@/components/shared/BottomNav';

const NAV = [
  { label: 'Home', icon: '🏠', href: '/driver/home' },
  { label: 'Trips', icon: '📋', href: '/driver/timeline' },
  { label: 'More', icon: '☰', href: '/driver/more' },
];

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = local.getUser();
    if (!user || user.role !== 'driver') router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen pb-20" style={{ background: '#F5F6FA' }}>
      {children}
      <BottomNav items={NAV} />
    </div>
  );
}
