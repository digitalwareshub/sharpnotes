// Analytics helper for tracking user events

/**
 * Track custom events in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

/**
 * Track note transformation
 */
export const trackNoteTransform = (mode: string, wordCount: number) => {
  trackEvent('note_transform', {
    mode,
    word_count: wordCount,
    category: 'engagement',
  });
};

/**
 * Track note export
 */
export const trackNoteExport = (format: 'txt' | 'md' | 'json') => {
  trackEvent('note_export', {
    format,
    category: 'engagement',
  });
};

/**
 * Track note save
 */
export const trackNoteSave = (isAutoSave: boolean) => {
  trackEvent('note_save', {
    type: isAutoSave ? 'auto' : 'manual',
    category: 'engagement',
  });
};

/**
 * Track copy to clipboard
 */
export const trackCopyToClipboard = () => {
  trackEvent('copy_to_clipboard', {
    category: 'engagement',
  });
};

/**
 * Track note deletion
 */
export const trackNoteDelete = () => {
  trackEvent('note_delete', {
    category: 'engagement',
  });
};

/**
 * Track search usage
 */
export const trackSearch = (query: string) => {
  trackEvent('search', {
    search_term: query.substring(0, 50), // Don't send full query for privacy
    category: 'engagement',
  });
};

/**
 * Track keyboard shortcut usage
 */
export const trackKeyboardShortcut = (shortcut: string) => {
  trackEvent('keyboard_shortcut', {
    shortcut,
    category: 'engagement',
  });
};

/**
 * Track storage warning shown
 */
export const trackStorageWarning = (percentage: number) => {
  trackEvent('storage_warning', {
    percentage,
    category: 'technical',
  });
};

/**
 * Track error events
 */
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage.substring(0, 100), // Truncate for privacy
    category: 'technical',
  });
};

/**
 * Track page view (for SPA navigation)
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-K5WHXKDGE4', {
      page_path: url,
    });
  }
};
