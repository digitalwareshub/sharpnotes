'use client';

import { useState } from 'react';
import { Note, Mode } from '../../types';
import { formatFileSize } from '../../lib/export';
import { ConfirmModal } from '../ui/ConfirmModal';

interface NoteHistoryProps {
  notes: Note[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
  onToggleFavorite: (noteId: string) => void;
  onToggleNotePin: (noteId: string) => void;
  selectedNoteId?: string;
  isOpen: boolean;
  onClose: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

export function NoteHistory({
  notes,
  isLoading,
  searchQuery,
  onSearchChange,
  onSelectNote,
  onDeleteNote,
  onToggleFavorite,
  onToggleNotePin,
  selectedNoteId,
  isOpen,
  onClose,
  isPinned = true,
  onTogglePin,
}: NoteHistoryProps) {
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const getModeLabel = (mode: Mode) => {
    const labels: Record<Mode, string> = {
      summarize: '📝 Summary',
      structure: '📋 Structure',
      polish: '✨ Polish',
      tasks: '✅ Tasks',
    };
    return labels[mode];
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      {/* Backdrop - only show on mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - collapsible on desktop, toggle on mobile */}
      <aside
        className={`fixed top-0 right-0 h-screen bg-slate-900/95 border-l border-slate-700/70 backdrop-blur-xl z-50 flex flex-col transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 ${isPinned ? 'w-80' : 'w-12'}`}
      >
        {/* Collapse/Expand Button - Desktop only */}
        {!isPinned && (
          <button
            onClick={onTogglePin}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-slate-900/95 border border-slate-700/70 border-r-0 rounded-l-lg p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/95"
            aria-label="Expand history"
          >
            <span className="text-sm">«</span>
          </button>
        )}

        {/* Collapsed state - Desktop only */}
        {!isPinned && (
          <div className="hidden lg:flex flex-col items-center justify-center h-full gap-4">
            <button
              onClick={onTogglePin}
              className="writing-mode-vertical text-slate-400 hover:text-slate-200 text-sm font-medium tracking-wider"
              style={{ writingMode: 'vertical-rl' }}
            >
              HISTORY
            </button>
          </div>
        )}

        {/* Expanded content */}
        <div className={`flex-1 flex flex-col overflow-hidden ${!isPinned ? 'hidden lg:hidden' : ''}`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-700/70 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-50">Note History</h2>
            <div className="flex items-center gap-1">
              {/* Pin button - Desktop only */}
              <button
                onClick={onTogglePin}
                className="hidden lg:block rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                aria-label={isPinned ? 'Unpin history' : 'Pin history'}
                title={isPinned ? 'Collapse sidebar' : 'Pin sidebar'}
              >
                {isPinned ? '»' : '«'}
              </button>
              {/* Close button - Mobile only */}
              <button
                onClick={onClose}
                className="lg:hidden rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                aria-label="Close history"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-950/80 border border-slate-700 rounded-lg text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-slate-400 text-sm">
              Loading notes...
            </div>
          ) : notes.length === 0 ? (
            <div className="p-4 text-center">
              <div className="text-slate-400 text-sm mb-2">
                {searchQuery ? 'No notes found' : 'No notes yet'}
              </div>
              {!searchQuery && (
                <p className="text-xs text-slate-500">
                  Your notes will appear here as you create them
                </p>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={`p-3 cursor-pointer transition-colors hover:bg-slate-800/50 ${
                    selectedNoteId === note.id ? 'bg-violet-500/10' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-medium text-slate-100 line-clamp-1 flex-1">
                      {note.isPinned && <span className="mr-1">📌</span>}
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleNotePin(note.id);
                        }}
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                        aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
                        title={note.isPinned ? 'Unpin note' : 'Pin note (max 5)'}
                      >
                        {note.isPinned ? '📌' : '📍'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(note.id);
                        }}
                        className="text-slate-400 hover:text-yellow-400 transition-colors"
                        aria-label={note.isFavorite ? 'Unfavorite' : 'Favorite'}
                      >
                        {note.isFavorite ? '⭐' : '☆'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                    {note.input.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{getModeLabel(note.mode)}</span>
                    <span className="text-slate-500">{formatDate(note.createdAt)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-600">
                      {note.wordCount} words
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNoteToDelete(note.id);
                      }}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700/70 text-xs text-slate-500 flex-shrink-0">
          {notes.length} note{notes.length !== 1 ? 's' : ''} • Unlimited local storage
        </div>
        </div>
        {/* End of expanded content */}
      </aside>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={noteToDelete !== null}
        onClose={() => setNoteToDelete(null)}
        onConfirm={() => {
          if (noteToDelete) {
            onDeleteNote(noteToDelete);
            setNoteToDelete(null);
          }
        }}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
      />
    </>
  );
}
