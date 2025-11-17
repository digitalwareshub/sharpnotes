/**
 * Browser detection utilities for PWA and Web Speech API support
 */

export interface BrowserInfo {
  name: string;
  isFirefox: boolean;
  isChrome: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isMobile: boolean;
}

/**
 * Detect browser type and capabilities
 */
export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    return {
      name: 'unknown',
      isFirefox: false,
      isChrome: false,
      isSafari: false,
      isEdge: false,
      isMobile: false,
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  const isFirefox = userAgent.includes('firefox');
  const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
  const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
  const isEdge = userAgent.includes('edg');
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  let name = 'unknown';
  if (isFirefox) name = 'firefox';
  else if (isEdge) name = 'edge';
  else if (isChrome) name = 'chrome';
  else if (isSafari) name = 'safari';

  return {
    name,
    isFirefox,
    isChrome,
    isSafari,
    isEdge,
    isMobile,
  };
}

/**
 * Check if Web Speech API is supported
 */
export function isWebSpeechSupported(): boolean {
  if (typeof window === 'undefined') return false;

  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * Check if PWA is installable
 */
export function isPWAInstallable(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false; // Already installed
  }

  return true; // Could potentially be installed
}

/**
 * Check if PWA is already installed
 */
export function isPWAInstalled(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(display-mode: standalone)').matches;
}

/**
 * Get browser-specific PWA installation instructions
 */
export function getPWAInstallInstructions(): string {
  const browser = detectBrowser();

  if (browser.isMobile) {
    if (browser.isSafari) {
      return 'Tap the Share button, then "Add to Home Screen"';
    }
    if (browser.isChrome || browser.isEdge) {
      return 'Tap the menu (⋮), then "Add to Home Screen" or "Install App"';
    }
  } else {
    if (browser.isChrome || browser.isEdge) {
      return 'Click the install icon (⊕) in the address bar';
    }
    if (browser.isSafari) {
      return 'Click File → Add to Dock (macOS 14+)';
    }
    if (browser.isFirefox) {
      return 'Click the menu (☰), then "Install"';
    }
  }

  return 'Check your browser menu for "Install" or "Add to Home Screen"';
}

/**
 * Check if we should show Web Speech API warning (e.g., on Firefox)
 */
export function shouldShowWebSpeechWarning(): boolean {
  const browser = detectBrowser();
  const isSupported = isWebSpeechSupported();

  // Show warning if on Firefox (or any browser without support)
  return browser.isFirefox || !isSupported;
}
