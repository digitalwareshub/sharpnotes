'use client';

import { useState, useEffect } from 'react';
import { getStorageInfo } from '../../lib/storage/localStorage';
import { formatFileSize } from '../../lib/export';
import { StorageInfo } from '../../types';

export function StorageIndicator({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);

  useEffect(() => {
    updateStorageInfo();
    
    // Update every 10 seconds
    const interval = setInterval(updateStorageInfo, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStorageInfo = () => {
    const info = getStorageInfo();
    setStorageInfo(info);
  };

  if (!storageInfo) return null;

  const { used, total, notesCount, percentage } = storageInfo;
  const isNearFull = percentage >= 80;
  const isFull = percentage >= 95;

  return (
    <div className={`text-xs ${isNearFull ? 'text-yellow-400' : isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
      <div className="flex items-center gap-2">
        {isFull && <span className="text-red-400">🔴</span>}
        {isNearFull && !isFull && <span>⚠️</span>}
        <span>
          Storage: {formatFileSize(used)} / ~{formatFileSize(total)} ({percentage}%)
        </span>
      </div>
      {isNearFull && (
        <div className="mt-1 text-yellow-300 text-[10px]">
          Storage almost full! Consider deleting old notes.
        </div>
      )}
    </div>
  );
}
