import { useState, useEffect, useCallback } from 'react';
import { Note } from '../types';
import { getAllNotes, deleteNote, toggleFavorite, togglePin, searchNotes } from '../lib/storage/localStorage';

export function useNoteHistory() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  // Filter notes when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchNotes(searchQuery);
      setFilteredNotes(sortNotes(results));
    } else {
      setFilteredNotes(sortNotes(notes));
    }
  }, [searchQuery, notes]);

  // Sort notes: pinned first, then by updatedAt
  const sortNotes = (notesToSort: Note[]): Note[] => {
    return [...notesToSort].sort((a, b) => {
      // Pinned notes first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then by updatedAt (most recent first)
      return b.updatedAt - a.updatedAt;
    });
  };

  const loadNotes = useCallback(() => {
    console.log('[useNoteHistory] Loading notes...');
    setIsLoading(true);
    try {
      const loadedNotes = getAllNotes();
      console.log('[useNoteHistory] Loaded notes:', loadedNotes.length);
      setNotes(loadedNotes);
      setFilteredNotes(sortNotes(loadedNotes));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteNote = useCallback((noteId: string) => {
    if (deleteNote(noteId)) {
      loadNotes();
    }
  }, [loadNotes]);

  const handleToggleFavorite = useCallback((noteId: string) => {
    if (toggleFavorite(noteId)) {
      loadNotes();
    }
  }, [loadNotes]);

  const handleTogglePin = useCallback((noteId: string) => {
    if (togglePin(noteId)) {
      loadNotes();
    }
  }, [loadNotes]);

  const refresh = useCallback(() => {
    console.log('[useNoteHistory] Refresh called');
    loadNotes();
  }, [loadNotes]);

  return {
    notes: filteredNotes,
    allNotes: notes,
    isLoading,
    searchQuery,
    setSearchQuery,
    deleteNote: handleDeleteNote,
    toggleFavorite: handleToggleFavorite,
    togglePin: handleTogglePin,
    refresh,
  };
}
