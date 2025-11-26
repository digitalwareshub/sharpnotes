'use client';

import { useEffect, useState, useCallback } from 'react';

export interface TrayNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  isDarkMode?: boolean;
  autoHideDuration?: number; // in milliseconds, 0 means no auto-hide
}

export function TrayNotification({
  isOpen,
  onClose,
  title,
  message,
  icon,
  type = 'info',
  actionLabel,
  onAction,
  isDarkMode = false,
  autoHideDuration = 0,
}: TrayNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Wait for animation to finish before calling onClose
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger the animation
      setTimeout(() => setIsVisible(true), 10);

      // Auto-hide after duration
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, autoHideDuration, handleClose]);

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  // Color schemes based on type
  const getColorClasses = () => {
    const baseClasses = isDarkMode
      ? 'bg-slate-900/95 border-slate-700/70'
      : 'bg-white/95 border-orange-200/60';

    const iconClasses = {
      info: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      warning: isDarkMode ? 'text-amber-400' : 'text-amber-600',
      success: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
      error: isDarkMode ? 'text-red-400' : 'text-red-600',
    };

    return {
      base: baseClasses,
      icon: iconClasses[type],
    };
  };

  const colors = getColorClasses();

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      />

      {/* Tray notification - slides up from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-2xl mx-auto p-4">
          <div
            className={`rounded-2xl border shadow-2xl backdrop-blur-xl p-6 ${colors.base}`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              {icon && (
                <div className={`text-3xl flex-shrink-0 ${colors.icon}`}>
                  {icon}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-slate-50' : 'text-slate-900'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {message}
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-4">
                  {actionLabel && onAction && (
                    <button
                      onClick={handleAction}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        isDarkMode
                          ? 'bg-orange-500 text-white hover:bg-orange-400'
                          : 'bg-orange-600 text-white hover:bg-orange-500'
                      }`}
                    >
                      {actionLabel}
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      isDarkMode
                        ? 'border border-slate-600 text-slate-300 hover:bg-slate-800'
                        : 'border border-orange-400 text-slate-700 hover:bg-orange-50'
                    }`}
                  >
                    {actionLabel ? 'Not Now' : 'Dismiss'}
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-orange-100'
                }`}
                aria-label="Close notification"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
