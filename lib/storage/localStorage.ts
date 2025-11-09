import toast from 'react-hot-toast';
import type { Note, UserPreferences, StorageInfo } from '../../types';

const NOTES_KEY = 'shrp_notes';
const PREFERENCES_KEY = 'shrp_preferences';
const STORAGE_VERSION = '1.0';

// Estimate localStorage size (5-10MB typical)
const ESTIMATED_QUOTA = 5 * 1024 * 1024; // 5MB conservative estimate

/**
 * Get all notes from localStorage with error handling
 */
export function getAllNotes(): Note[] {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    if (!data) {return [];}
    
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load notes:', error);
    
    if (error instanceof SyntaxError) {
      toast.error('Notes data corrupted. Starting fresh.');
      localStorage.removeItem(NOTES_KEY);
    } else {
      toast.error('Failed to load notes from storage');
    }
    
    return [];
  }
}

/**
 * Save a single note with error handling
 */
export function saveNote(note: Note): boolean {
  try {
    const notes = getAllNotes();
    
    // Check if note exists (update) or new (create)
    const existingIndex = notes.findIndex(n => n.id === note.id);
    
    if (existingIndex >= 0) {
      notes[existingIndex] = { ...note, updatedAt: Date.now() };
    } else {
      notes.unshift(note); // Add to beginning
    }
    
    const serialized = JSON.stringify(notes);
    localStorage.setItem(NOTES_KEY, serialized);
    
    return true;
  } catch (error: unknown) {
    console.error('Failed to save note:', error);
    
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      toast.error('Storage full! Please delete old notes.', {
        duration: 5000,
        icon: '💾',
      });
      return false;
    }
    
    toast.error('Failed to save note. Check browser settings.');
    return false;
  }
}

/**
 * Delete a note by ID
 */
export function deleteNote(noteId: string): boolean {
  try {
    const notes = getAllNotes();
    const filtered = notes.filter(n => n.id !== noteId);
    
    if (filtered.length === notes.length) {
      toast.error('Note not found');
      return false;
    }
    
    localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    toast.success('Note deleted');
    return true;
  } catch (error) {
    console.error('Failed to delete note:', error);
    toast.error('Failed to delete note');
    return false;
  }
}

/**
 * Delete multiple notes
 */
export function deleteNotes(noteIds: string[]): boolean {
  try {
    const notes = getAllNotes();
    const filtered = notes.filter(n => !noteIds.includes(n.id));
    
    localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    toast.success(`Deleted ${noteIds.length} note(s)`);
    return true;
  } catch (error) {
    console.error('Failed to delete notes:', error);
    toast.error('Failed to delete notes');
    return false;
  }
}

/**
 * Clear all notes (with confirmation)
 */
export function clearAllNotes(): boolean {
  try {
    localStorage.removeItem(NOTES_KEY);
    toast.success('All notes cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear notes:', error);
    toast.error('Failed to clear notes');
    return false;
  }
}

/**
 * Toggle favorite status
 */
export function toggleFavorite(noteId: string): boolean {
  try {
    const notes = getAllNotes();
    const note = notes.find(n => n.id === noteId);
    
    if (!note) {
      toast.error('Note not found');
      return false;
    }
    
    note.isFavorite = !note.isFavorite;
    note.updatedAt = Date.now();
    
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
    toast.error('Failed to update note');
    return false;
  }
}

/**
 * Toggle pin status (max 5 pinned notes)
 */
export function togglePin(noteId: string): boolean {
  try {
    const notes = getAllNotes();
    const note = notes.find(n => n.id === noteId);
    
    if (!note) {
      toast.error('Note not found');
      return false;
    }
    
    // If unpinning, just toggle
    if (note.isPinned) {
      note.isPinned = false;
      note.updatedAt = Date.now();
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      toast.success('Note unpinned');
      return true;
    }
    
    // Check pinned count
    const pinnedCount = notes.filter(n => n.isPinned).length;
    if (pinnedCount >= 5) {
      toast.error('Maximum 5 notes can be pinned. Unpin another note first.');
      return false;
    }
    
    note.isPinned = true;
    note.updatedAt = Date.now();
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    toast.success('Note pinned');
    return true;
  } catch (error) {
    console.error('Failed to toggle pin:', error);
    toast.error('Failed to update note');
    return false;
  }
}

/**
 * Get a single note by ID
 */
export function getNoteById(noteId: string): Note | null {
  try {
    const notes = getAllNotes();
    return notes.find(n => n.id === noteId) || null;
  } catch (error) {
    console.error('Failed to get note:', error);
    return null;
  }
}

/**
 * Get storage information
 */
export function getStorageInfo(): StorageInfo {
  try {
    const notes = getAllNotes();
    const serialized = JSON.stringify(notes);
    const used = new Blob([serialized]).size;
    const total = ESTIMATED_QUOTA;
    const percentage = Math.round((used / total) * 100);
    
    return {
      used,
      total,
      notesCount: notes.length,
      percentage,
    };
  } catch (error) {
    console.error('Failed to get storage info:', error);
    return {
      used: 0,
      total: ESTIMATED_QUOTA,
      notesCount: 0,
      percentage: 0,
    };
  }
}

/**
 * Check if storage is near capacity
 */
export function isStorageNearFull(): boolean {
  const info = getStorageInfo();
  return info.percentage >= 80;
}

/**
 * User preferences management
 */
export function getPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(PREFERENCES_KEY);
    if (!data) {
      return getDefaultPreferences();
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return getDefaultPreferences();
  }
}

export function savePreferences(prefs: UserPreferences): boolean {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    toast.error('Failed to save preferences');
    return false;
  }
}

function getDefaultPreferences(): UserPreferences {
  return {
    defaultMode: 'summarize',
    theme: 'dark',
    autoSaveEnabled: true,
    autoSaveInterval: 30,
  };
}

/**
 * Export all notes as JSON
 */
export function exportNotesAsJSON(): string {
  const notes = getAllNotes();
  const prefs = getPreferences();
  
  return JSON.stringify({
    version: STORAGE_VERSION,
    exportDate: new Date().toISOString(),
    notes,
    preferences: prefs,
  }, null, 2);
}

/**
 * Import notes from JSON backup
 */
export function importNotesFromJSON(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    
    if (!data.notes || !Array.isArray(data.notes)) {
      toast.error('Invalid backup file format');
      return false;
    }
    
    // Merge with existing notes (avoid duplicates)
    const existing = getAllNotes();
    const existingIds = new Set(existing.map(n => n.id));
    
    const newNotes = data.notes.filter((n: Note) => !existingIds.has(n.id));
    const merged = [...existing, ...newNotes];
    
    localStorage.setItem(NOTES_KEY, JSON.stringify(merged));
    toast.success(`Imported ${newNotes.length} note(s)`);
    return true;
  } catch (error) {
    console.error('Failed to import notes:', error);
    toast.error('Failed to import notes. Invalid file.');
    return false;
  }
}

/**
 * Search notes by text
 */
export function searchNotes(query: string): Note[] {
  if (!query.trim()) {return getAllNotes();}
  
  const notes = getAllNotes();
  const lowerQuery = query.toLowerCase();
  
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowerQuery) ||
    note.input.toLowerCase().includes(lowerQuery) ||
    note.output.toLowerCase().includes(lowerQuery)
  );
}
