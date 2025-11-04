import { useEffect, useRef, useCallback } from 'react';
import { Note } from '../types';
import { saveNote, isStorageNearFull } from '../lib/storage/localStorage';
import toast from 'react-hot-toast';

interface UseAutoSaveOptions {
  enabled: boolean;
  interval?: number; // in milliseconds
  onSave?: () => void; // Callback after successful save
}

export function useAutoSave(
  note: Partial<Note>,
  options: UseAutoSaveOptions = { enabled: true, interval: 30000 }
) {
  const { enabled, interval = 30000, onSave } = options;
  const lastSavedRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveNow = useCallback(() => {
    if (!note.id || !note.input || !note.output) {
      return false;
    }

    const currentData = JSON.stringify({ input: note.input, output: note.output });
    
    // Don't save if data hasn't changed
    if (currentData === lastSavedRef.current) {
      return false;
    }

    // Check storage before saving
    if (isStorageNearFull()) {
      toast('Storage almost full (>80%)', {
        icon: '⚠️',
        duration: 4000,
      });
    }

    const fullNote: Note = {
      id: note.id,
      title: note.title || 'Untitled Note',
      input: note.input,
      output: note.output,
      mode: note.mode || 'summarize',
      createdAt: note.createdAt || Date.now(),
      updatedAt: Date.now(),
      wordCount: note.input.split(/\s+/).filter(Boolean).length,
      isFavorite: note.isFavorite || false,
    };

    if (saveNote(fullNote)) {
      lastSavedRef.current = currentData;
      return true;
    }

    return false;
  }, [note]);

  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      if (saveNow()) {
        // Silent auto-save, no toast
        console.log('Auto-saved note');
        if (onSave) {
          onSave();
        }
      }
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, interval, saveNow, onSave]);

  return {
    saveNow,
  };
}
