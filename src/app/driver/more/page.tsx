'use client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';
import { useLang } from '@/i18n/LangContext';
import { Lang } from '@/i18n/translations';

const LANGS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'as', label: 'অসমীয়া' },
];

export default function DriverMorePage() {
  const router = useRouter();
  const { user, logout } = useAppStore();
  const { lang, setLang, t } = useLang();

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
          {user?.name?.[0] ?? 'R'}
        </div>
        <div>
          <p className="font-black text-slate-900 text-lg">{user?.name ?? 'Mithu'}</p>
          <p className="text-sm text-slate-400">+91 {user?.phone?.replace(/(\d{5})(\d{5})/, '$1 $2') ?? '70026 69491'}</p>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Driver</span>
        </div>
      </div>

      {/* Truck info */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
        <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">{t('myTruck')}</p>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚛</span>
          <div>
            <p className="font-black text-slate-900">Your Truck</p>
            <p className="text-xs text-slate-400">Owner: Mohibul</p>
          </div>
        </div>
      </div>

      {/* Stay logged in */}
      <div className="rounded-2xl p-4" style={{ background: '#DCFCE7' }}>
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">✅</span>
          <div>
            <p className="font-bold text-green-800 text-sm">{t('stayLoggedIn')}</p>
            <p className="text-xs text-green-700 mt-0.5">{t('stayLoggedInSub')}</p>
          </div>
        </div>
      </div>

      {/* Language picker */}
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
        <p className="text-xs font-bold text-slate-400 tracking-wider mb-3">{t('language')}</p>
        <div className="flex gap-2">
          {LANGS.map((l) => (
            <button key={l.id} onClick={() => setLang(l.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
              style={lang === l.id
                ? { background: '#1A1D35', color: 'white' }
                : { background: '#F1F5F9', color: '#64748B' }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full py-4 rounded-2xl font-bold text-red-600 bg-red-50 border-2 border-red-100">
        {t('logOut')}
      </button>
    </div>
  );
}
