'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getStorageInfo } from '../../lib/storage/localStorage';
import { formatFileSize } from '../../lib/export';
import { trackStorageWarning } from '../../lib/analytics';
import type { StorageInfo } from '../../types';

export function StorageIndicator({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const hasShownWarning = useRef(false);
  const hasShownCritical = useRef(false);

  const updateStorageInfo = useCallback(() => {
    const info = getStorageInfo();
    setStorageInfo(info);

    // Show warning at 80%
    if (info.percentage >= 80 && info.percentage < 95 && !hasShownWarning.current) {
      hasShownWarning.current = true;
      trackStorageWarning(info.percentage);
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-semibold">Storage Almost Full</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  You&apos;re using {info.percentage}% of available storage
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-slate-400">
              Consider deleting old notes to free up space
            </p>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-xs text-orange-600 dark:text-orange-400 hover:underline text-left"
            >
              Got it
            </button>
          </div>
        ),
        {
          duration: 8000,
          position: 'bottom-center',
          style: {
            background: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            maxWidth: '400px',
          },
        }
      );
    }

    // Show critical warning at 95%
    if (info.percentage >= 95 && !hasShownCritical.current) {
      hasShownCritical.current = true;
      trackStorageWarning(info.percentage);
      toast.error(
        (t) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔴</span>
              <div>
                <p className="font-semibold">Storage Critical!</p>
                <p className="text-sm">
                  {info.percentage}% full - Delete notes now to avoid data loss
                </p>
              </div>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-xs hover:underline text-left"
            >
              Dismiss
            </button>
          </div>
        ),
        {
          duration: 10000,
          position: 'bottom-center',
          style: {
            maxWidth: '400px',
          },
        }
      );
    }

    // Reset warnings if storage drops below thresholds
    if (info.percentage < 80) {
      hasShownWarning.current = false;
      hasShownCritical.current = false;
    }
  }, [isDarkMode]);

  useEffect(() => {
    updateStorageInfo();
    
    // Update every 10 seconds
    const interval = setInterval(updateStorageInfo, 10000);
    return () => clearInterval(interval);
  }, [updateStorageInfo]);

  if (!storageInfo) {return null;}

  const { used, total, percentage, notesCount } = storageInfo;
  const isNearFull = percentage >= 80;
  const isCritical = percentage >= 95;

  return (
    <div className="flex flex-col gap-1">
      <div className={`text-xs flex items-center gap-2 ${
        isCritical 
          ? 'text-red-400' 
          : isNearFull 
            ? 'text-yellow-400' 
            : isDarkMode 
              ? 'text-gray-500' 
              : 'text-gray-600'
      }`}>
        {isCritical && <span className="animate-pulse">🔴</span>}
        {isNearFull && !isCritical && <span>⚠️</span>}
        {!isNearFull && <span>💾</span>}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
          <span>
            {formatFileSize(used)} / ~{formatFileSize(total)}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            {notesCount} note{notesCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className={`h-1.5 w-full rounded-full overflow-hidden ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
      }`}>
        <div
          className={`h-full transition-all duration-500 ${
            isCritical
              ? 'bg-red-500'
              : isNearFull
                ? 'bg-yellow-500'
                : 'bg-orange-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {isNearFull && (
        <p className={`text-[10px] ${
          isCritical ? 'text-red-400' : 'text-yellow-400'
        }`}>
          {isCritical 
            ? '⚠️ Critical: Delete notes immediately!' 
            : '⚠️ Almost full: Consider deleting old notes'}
        </p>
      )}
    </div>
  );
}
