'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  maxLen?: number;
}

const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

export default function PhoneNumpad({ value, onChange, maxLen = 10 }: Props) {
  function press(key: string) {
    if (!key) return;
    if (key === '⌫') {
      onChange(value.slice(0, -1));
    } else if (value.length < maxLen) {
      onChange(value + key);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {KEYS.map((k, i) => (
        <button
          key={i}
          onPointerDown={(e) => { e.preventDefault(); if (k) press(k); }}
          className={`h-16 rounded-2xl text-2xl font-bold text-slate-800 shadow-sm active:bg-slate-100 select-none ${k ? 'bg-white' : ''}`}
        >
          {k}
        </button>
      ))}
    </div>
  );
}
