'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { local } from '@/lib/localStore';
import BottomNav from '@/components/shared/BottomNav';

const NAV = [
  { label: 'Home', icon: '🏠', href: '/owner/home' },
  { label: 'Trips', icon: '📋', href: '/owner/trips' },
  { label: 'More', icon: '☰', href: '/owner/more' },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const user = local.getUser();
    if (!user || user.role !== 'owner') router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen pb-20" style={{ background: '#F5F6FA' }}>
      {children}
      <BottomNav items={NAV} />
    </div>
  );
}
