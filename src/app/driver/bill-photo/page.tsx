'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/appStore';

const DOC_TYPES = [
  { id: 'lr', label: 'Lorry Receipt (LR)', icon: '📄' },
  { id: 'challan', label: 'Delivery Challan', icon: '📋' },
  { id: 'loading', label: 'Loading Slip', icon: '📦' },
  { id: 'weighment', label: 'Weighment Receipt', icon: '⚖️' },
  { id: 'other', label: 'Other Document', icon: '📎' },
];

interface SavedDoc {
  id: string;
  type: string;
  label: string;
  imageUrl: string;
  savedAt: string;
}

export default function BillPhotoPage() {
  const router = useRouter();
  const { activeTrip, user } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedType, setSelectedType] = useState('lr');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedDocs, setSavedDocs] = useState<SavedDoc[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('ttk_bill_photos') ?? '[]');
    } catch { return []; }
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handleSave() {
    if (!capturedImage) return;
    const typeMeta = DOC_TYPES.find((d) => d.id === selectedType)!;
    const doc: SavedDoc = {
      id: Date.now().toString(),
      type: selectedType,
      label: typeMeta.label,
      imageUrl: capturedImage,
      savedAt: new Date().toISOString(),
    };
    const updated = [doc, ...savedDocs];
    localStorage.setItem('ttk_bill_photos', JSON.stringify(updated));
    setSavedDocs(updated);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setCapturedImage(null);
    }, 1500);
  }

  if (saved) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-7xl">✅</div>
      <p className="text-2xl font-black text-slate-900">Document Saved!</p>
      <p className="text-slate-400">{DOC_TYPES.find((d) => d.id === selectedType)?.label}</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5 bg-white border-b border-slate-100">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-lg">←</button>
        <div>
          <h2 className="font-black text-slate-900 text-lg">📷 Bill Photo</h2>
          <p className="text-xs text-slate-400">Save trip documents</p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">

        {/* Document type selector */}
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-widest mb-3">DOCUMENT TYPE</p>
          <div className="space-y-2">
            {DOC_TYPES.map((doc) => (
              <button key={doc.id} onClick={() => setSelectedType(doc.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-colors text-left ${selectedType === doc.id ? 'border-indigo-500' : 'border-transparent bg-white'}`}
                style={selectedType === doc.id ? { background: '#EEF2FF' } : {}}>
                <span className="text-2xl">{doc.icon}</span>
                <span className={`font-bold text-sm ${selectedType === doc.id ? 'text-indigo-700' : 'text-slate-700'}`}>{doc.label}</span>
                {selectedType === doc.id && <span className="ml-auto text-indigo-500 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Camera / preview area */}
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-widest mb-3">PHOTO</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {capturedImage ? (
            <div className="rounded-2xl overflow-hidden border-2 border-indigo-400 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={capturedImage} alt="Document" className="w-full max-h-64 object-cover" />
              <button onClick={() => setCapturedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white font-bold text-sm shadow">
                ✕
              </button>
              <div className="px-4 py-2 text-indigo-700 text-sm font-bold" style={{ background: '#EEF2FF' }}>
                📷 Photo captured — looks good?
              </div>
            </div>
          ) : (
            <button onClick={() => inputRef.current?.click()} disabled={loading}
              className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white py-12 flex flex-col items-center gap-3 active:bg-slate-50">
              <span className="text-5xl">{loading ? '⏳' : '📷'}</span>
              <p className="font-bold text-slate-600">{loading ? 'Processing…' : 'Tap to open camera'}</p>
              <p className="text-xs text-slate-400">Point at the document and click</p>
            </button>
          )}
        </div>

        {/* Save button */}
        <button onClick={handleSave} disabled={!capturedImage}
          className="w-full py-5 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg,#1A1D35,#4F46E5)' }}>
          SAVE DOCUMENT
        </button>

        {/* Previously saved docs */}
        {savedDocs.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest mb-3">SAVED DOCUMENTS</p>
            <div className="space-y-3">
              {savedDocs.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl overflow-hidden flex"
                  style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.imageUrl} alt={doc.label} className="w-20 h-20 object-cover flex-shrink-0" />
                  <div className="px-4 py-3 flex flex-col justify-center">
                    <p className="font-bold text-slate-800 text-sm">{doc.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(doc.savedAt).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
