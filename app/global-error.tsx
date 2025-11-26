'use client';

import { useEffect } from 'react';
import { trackError } from '../lib/analytics';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
    trackError('global_error', error.message);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Critical Error
            </h2>
            <p className="text-slate-300 mb-6">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
