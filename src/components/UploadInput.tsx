import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadMediaFile } from '@/lib/cms';
import { AdminInput } from './ui/AdminUi';

export function UploadInput({
  value,
  onChange,
  accept = 'image/*',
  placeholder = 'Paste a link or upload a file',
}: {
  value: string;
  onChange: (val: string) => void;
  accept?: string;
  placeholder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadMediaFile(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div>
      <AdminInput
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="mt-2 flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10">
          <Upload className="h-3.5 w-3.5" />
          {uploading ? 'Uploading…' : 'Upload'}
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        {value && accept.startsWith('image') && (
          <img src={value} alt="" className="h-10 w-16 rounded object-cover" />
        )}
        {error && <span className="text-xs text-red-300">{error}</span>}
      </div>
    </div>
  );
}
