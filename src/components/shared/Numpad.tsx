'use client';

interface NumpadProps {
  value: string;
  onChange: (v: string) => void;
}

const KEYS = ['1','2','3','4','5','6','7','8','9','.','0','⌫'];

export default function Numpad({ value, onChange }: NumpadProps) {
  function press(key: string) {
    if (key === '⌫') {
      onChange(value.length > 1 ? value.slice(0, -1) : '0');
    } else if (key === '.' && value.includes('.')) {
      return;
    } else {
      onChange(value === '0' && key !== '.' ? key : value + key);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {KEYS.map((k) => (
        <button
          key={k}
          onPointerDown={(e) => { e.preventDefault(); press(k); }}
          className="h-16 rounded-2xl bg-white text-2xl font-bold text-slate-800 shadow-sm active:bg-slate-100 select-none"
        >
          {k}
        </button>
      ))}
    </div>
  );
}
