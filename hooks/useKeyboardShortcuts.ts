import { useEffect } from 'react';

type KeyboardShortcut = {
  key: string;
  ctrlOrCmd?: boolean;
  shift?: boolean;
  callback: (e: KeyboardEvent) => void;
  description?: string;
};

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const { key, ctrlOrCmd, shift, callback } = shortcut;
        
        const ctrlPressed = ctrlOrCmd && (e.ctrlKey || e.metaKey);
        const shiftPressed = shift && e.shiftKey;
        const keyMatches = e.key.toLowerCase() === key.toLowerCase();
        
        if (ctrlOrCmd && shift) {
          if (ctrlPressed && shiftPressed && keyMatches) {
            e.preventDefault();
            callback(e);
            break;
          }
        } else if (ctrlOrCmd) {
          if (ctrlPressed && !e.shiftKey && keyMatches) {
            e.preventDefault();
            callback(e);
            break;
          }
        } else if (shift) {
          if (shiftPressed && !e.ctrlKey && !e.metaKey && keyMatches) {
            e.preventDefault();
            callback(e);
            break;
          }
        } else {
          if (keyMatches && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            callback(e);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
