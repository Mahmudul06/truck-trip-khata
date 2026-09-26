'use client';
import { useRef, useState } from 'react';

interface Props {
  onCapture: (dataUrl: string) => void;
  onRemove: () => void;
  imageUrl: string | null;
}

export default function ReceiptButton({ onCapture, onRemove, imageUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onCapture(result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected if needed
    e.target.value = '';
  }

  // Show thumbnail once photo is captured
  if (imageUrl) {
    return (
      <div className="mx-4 mb-4">
        <div className="w-full rounded-2xl overflow-hidden border-2 border-indigo-400 relative"
          style={{ background: '#EEF2FF' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Receipt" className="w-full max-h-48 object-cover" />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold shadow"
          >
            ✕
          </button>
          <div className="px-4 py-2 flex items-center gap-2">
            <span className="text-indigo-600 text-sm font-bold">📷 Receipt Added ✓</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-4">
      {/* Hidden file input — capture="environment" opens rear camera on mobile */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="w-full py-3 rounded-2xl font-bold text-sm border-2 border-slate-200 bg-white text-slate-500 active:bg-slate-50"
      >
        {loading ? '⏳ Processing…' : '📷 Add Receipt Photo'}
      </button>
    </div>
  );
}
