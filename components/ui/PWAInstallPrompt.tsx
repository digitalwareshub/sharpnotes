/**
 * PWA Install Prompt Component
 * Shows a native-style prompt to install SHRP Notes as a PWA
 * Includes browser-specific instructions for Safari, Chrome, Firefox
 */

'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallPromptProps {
  isDarkMode?: boolean;
}

export default function PWAInstallPrompt({ isDarkMode = false }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [browserType, setBrowserType] = useState<'safari' | 'firefox' | 'chrome' | 'unknown'>('unknown');

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already installed, don't show prompt
    }

    // Check if user has dismissed the prompt before
    try {
      const dismissed = localStorage.getItem('shrp_pwa_install_dismissed');
      if (dismissed) {
        return; // User previously dismissed, don't show again
      }
    } catch (error) {
      console.error('Error reading dismissal preference:', error);
      // Continue showing prompt if localStorage fails
    }

    // Detect browser type
    const ua = navigator.userAgent;
    const isSafariBrowser = /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua);
    const isFirefoxBrowser = /Firefox/.test(ua);
    const isChromeBrowser = /Chrome/.test(ua) || /Edg/.test(ua);

    if (isSafariBrowser) {
      setBrowserType('safari');
      // For Safari, show instructions after 5 second delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000); // 5 seconds delay
      return;
    }

    if (isFirefoxBrowser) {
      setBrowserType('firefox');
      // For Firefox, show instructions after delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
      return;
    }

    if (isChromeBrowser) {
      setBrowserType('chrome');
    }

    // Listen for the beforeinstallprompt event (Chrome/Edge only)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a short delay (let user explore first)
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000); // 5 seconds delay
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        // User accepted - no need to log in production
      } else {
        // User dismissed - no need to log in production
      }

      // Clear the prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (_error) {
      // Gracefully hide the prompt on error
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      localStorage.setItem('shrp_pwa_install_dismissed', 'true');
    } catch (_error) {
      // Continue anyway - not critical if localStorage fails
    }
  };

  if (!showPrompt) {
    return null;
  }

  // Safari-specific instructions
  if (browserType === 'safari') {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
        <div className={`rounded-lg shadow-2xl border p-4 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                ✨
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className={`text-sm font-semibold mb-1 ${
                isDarkMode ? 'text-slate-50' : 'text-gray-900'
              }`}>
                Install SHRP Notes?
              </h3>
              <p className={`text-xs mb-3 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Add to your Home Screen or Dock
              </p>

              {/* Safari Instructions */}
              <div className={`rounded-md p-2 mb-3 ${
                isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
              }`}>
                <p className={`text-xs mb-1 font-medium ${
                  isDarkMode ? 'text-orange-200' : 'text-orange-900'
                }`}>
                  📱 On Safari:
                </p>
                <ol className={`text-xs space-y-0.5 list-decimal list-inside ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-800'
                }`}>
                  <li>Tap the Share button <span className="inline-block">🔼</span></li>
                  <li>Select &ldquo;Add to Home Screen&rdquo;</li>
                </ol>
                <p className={`text-xs mt-1.5 ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-800'
                }`}>
                  💻 On Mac: File → Add to Dock
                </p>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className={`w-full px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Got it
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className={`mt-3 pt-3 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-100'
          }`}>
            <ul className="space-y-1">
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Works offline
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Faster access
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Native app experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Firefox-specific instructions
  if (browserType === 'firefox') {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
        <div className={`rounded-lg shadow-2xl border p-4 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                ✨
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className={`text-sm font-semibold mb-1 ${
                isDarkMode ? 'text-slate-50' : 'text-gray-900'
              }`}>
                Install SHRP Notes?
              </h3>
              <p className={`text-xs mb-3 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Add to home screen for quick access
              </p>

              {/* Firefox Instructions */}
              <div className={`rounded-md p-2 mb-3 ${
                isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
              }`}>
                <p className={`text-xs mb-1 font-medium ${
                  isDarkMode ? 'text-orange-200' : 'text-orange-900'
                }`}>
                  🦊 On Firefox:
                </p>
                <ol className={`text-xs space-y-0.5 list-decimal list-inside ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-800'
                }`}>
                  <li>Click the menu (☰) in the top-right</li>
                  <li>Select &ldquo;Install&rdquo; or &ldquo;Install this site as an app&rdquo;</li>
                </ol>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className={`w-full px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Got it
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className={`mt-3 pt-3 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-100'
          }`}>
            <ul className="space-y-1">
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Works offline
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Faster access
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Native app experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Chrome/Edge install prompt (with native prompt API)
  if (deferredPrompt) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
        <div className={`rounded-lg shadow-2xl border p-4 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                ✨
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className={`text-sm font-semibold mb-1 ${
                isDarkMode ? 'text-slate-50' : 'text-gray-900'
              }`}>
                Install SHRP Notes?
              </h3>
              <p className={`text-xs mb-3 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Add to home screen for quick access
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-md transition-colors"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className={`mt-3 pt-3 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-100'
          }`}>
            <ul className="space-y-1">
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Works offline
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Faster access
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Native app experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // If no prompt available but Chrome detected, show manual instructions
  if (browserType === 'chrome') {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
        <div className={`rounded-lg shadow-2xl border p-4 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                ✨
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className={`text-sm font-semibold mb-1 ${
                isDarkMode ? 'text-slate-50' : 'text-gray-900'
              }`}>
                Install SHRP Notes?
              </h3>
              <p className={`text-xs mb-3 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Add to home screen for quick access
              </p>

              {/* Chrome Instructions */}
              <div className={`rounded-md p-2 mb-3 ${
                isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
              }`}>
                <p className={`text-xs mb-1 font-medium ${
                  isDarkMode ? 'text-orange-200' : 'text-orange-900'
                }`}>
                  🌐 On Chrome/Edge:
                </p>
                <ol className={`text-xs space-y-0.5 list-decimal list-inside ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-800'
                }`}>
                  <li>Click the install icon (⊕) in the address bar</li>
                  <li>Or use Menu → Install SHRP Notes</li>
                </ol>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className={`w-full px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Got it
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className={`mt-3 pt-3 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-100'
          }`}>
            <ul className="space-y-1">
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Works offline
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Faster access
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                Native app experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
