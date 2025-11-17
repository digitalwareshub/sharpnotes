'use client';

import { useEffect, useState } from 'react';
import {
  detectBrowser,
  isWebSpeechSupported,
  isPWAInstalled,
  isPWAInstallable,
  getPWAInstallInstructions,
} from '../lib/browserDetection';

const PWA_NOTIFICATION_DISMISSED_KEY = 'shrp_pwa_notification_dismissed';
const WEBSPEECH_NOTIFICATION_DISMISSED_KEY = 'shrp_webspeech_notification_dismissed';

export interface NotificationState {
  pwa: {
    shouldShow: boolean;
    message: string;
    onInstall: () => void;
  };
  webSpeech: {
    shouldShow: boolean;
    browserName: string;
  };
}

export function useBrowserNotifications() {
  const [pwaNotificationOpen, setPwaNotificationOpen] = useState(false);
  const [webSpeechNotificationOpen, setWebSpeechNotificationOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const browser = detectBrowser();
    const isInstalled = isPWAInstalled();
    const isInstallable = isPWAInstallable();
    const hasPWADismissed = localStorage.getItem(PWA_NOTIFICATION_DISMISSED_KEY) === 'true';
    const hasWebSpeechDismissed = localStorage.getItem(WEBSPEECH_NOTIFICATION_DISMISSED_KEY) === 'true';

    // Check for PWA installation prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Show PWA notification if not dismissed and not installed
      if (!isInstalled && isInstallable && !hasPWADismissed) {
        // Delay showing notification slightly to avoid overwhelming the user
        setTimeout(() => {
          setPwaNotificationOpen(true);
        }, 5000); // Show after 5 seconds
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check for Web Speech API support (especially Firefox)
    if (!hasWebSpeechDismissed) {
      const isSupported = isWebSpeechSupported();

      if (!isSupported || browser.isFirefox) {
        // Delay showing notification
        setTimeout(() => {
          setWebSpeechNotificationOpen(true);
        }, 10000); // Show after 10 seconds (after PWA notification)
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handlePWAInstall = async () => {
    if (!deferredPrompt) {
      // No prompt available, user will need to use browser menu
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    } else {
      console.log('User dismissed the PWA install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setPwaNotificationOpen(false);

    // Mark as dismissed
    localStorage.setItem(PWA_NOTIFICATION_DISMISSED_KEY, 'true');
  };

  const dismissPWANotification = () => {
    setPwaNotificationOpen(false);
    localStorage.setItem(PWA_NOTIFICATION_DISMISSED_KEY, 'true');
  };

  const dismissWebSpeechNotification = () => {
    setWebSpeechNotificationOpen(false);
    localStorage.setItem(WEBSPEECH_NOTIFICATION_DISMISSED_KEY, 'true');
  };

  const pwaInstructions = getPWAInstallInstructions();
  const browser = detectBrowser();

  return {
    pwa: {
      isOpen: pwaNotificationOpen,
      onClose: dismissPWANotification,
      onInstall: handlePWAInstall,
      instructions: pwaInstructions,
      hasPrompt: !!deferredPrompt,
    },
    webSpeech: {
      isOpen: webSpeechNotificationOpen,
      onClose: dismissWebSpeechNotification,
      browserName: browser.name,
      isSupported: isWebSpeechSupported(),
    },
  };
}
