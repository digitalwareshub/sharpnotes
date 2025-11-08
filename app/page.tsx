'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Mode, Note } from '../types';
import { transform } from '../lib/transformers';
import { saveNote } from '../lib/storage/localStorage';
import { exportNoteAsMarkdown, exportNoteAsTxt, copyToClipboard } from '../lib/export';
import { useNoteHistory } from '../hooks/useNoteHistory';
import { useAutoSave } from '../hooks/useAutoSave';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { NoteHistory } from '../components/notes/NoteHistory';
import { StorageIndicator } from '../components/ui/StorageIndicator';
import { FeedbackModal } from '../components/ui/FeedbackModal';
import {
  trackNoteTransform,
  trackNoteExport,
  trackNoteSave,
  trackCopyToClipboard,
  trackNoteDelete,
  trackKeyboardShortcut,
} from '../lib/analytics';

// Helper functions
const generateTitle = (text: string): string => {
  const firstLine = text.split('\n')[0].trim();
  return firstLine.substring(0, 50) || 'Untitled Note';
};

const modeLabel = (m: Mode) => {
  switch (m) {
    case 'summarize':
      return 'Summarize';
    case 'structure':
      return 'Structure';
    case 'polish':
      return 'Polish';
    case 'tasks':
      return 'Tasks';
  }
};

const modeDescription = (m: Mode) => {
  switch (m) {
    case 'summarize':
      return 'Extract key people, dates, and important points automatically.';
    case 'structure':
      return 'Organize into sections with headers and bullet points.';
    case 'polish':
      return 'Fix typos, grammar, and improve readability.';
    case 'tasks':
      return 'Extract action items with people and deadlines.';
  }
};

export default function Page() {
  const [mode, setMode] = useState<Mode>('summarize');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHistoryPinned, setIsHistoryPinned] = useState(true); // Desktop: pinned by default
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  console.log('[Page] State - input length:', input.length, 'isProcessing:', isProcessing, 'button disabled:', !input.trim() || isProcessing);
  
  const {
    notes,
    searchQuery,
    setSearchQuery,
    deleteNote: deleteHistoryNote,
    toggleFavorite,
    togglePin,
    refresh: refreshHistory,
    isLoading: isHistoryLoading,
  } = useNoteHistory();

  // Auto-save current note
  useAutoSave(
    currentNote
      ? currentNote
      : {
          id: `note-${Date.now()}`,
          input,
          output,
          mode,
          title: generateTitle(input),
        },
    {
      enabled: !!input && !!output,
      interval: 30000, // 30 seconds
      onSave: refreshHistory, // Refresh history after auto-save
    }
  );

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlOrCmd: true,
      callback: () => {
        trackKeyboardShortcut('cmd+enter');
        handleRun();
      },
      description: 'Transform note',
    },
    {
      key: 's',
      ctrlOrCmd: true,
      callback: () => {
        trackKeyboardShortcut('cmd+s');
        handleSaveManually();
      },
      description: 'Save note',
    },
    {
      key: 'e',
      ctrlOrCmd: true,
      callback: () => {
        trackKeyboardShortcut('cmd+e');
        handleExport('md');
      },
      description: 'Export as Markdown',
    },
    {
      key: 'k',
      ctrlOrCmd: true,
      callback: () => {
        trackKeyboardShortcut('cmd+k');
        handleClear();
      },
      description: 'Clear',
    },
  ]);

  // Speech recognition
  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition({
    onTranscript: (transcript, isFinal) => {
      console.log('Transcript:', transcript, 'isFinal:', isFinal);
      
      if (isFinal) {
        // Final result: append to actual input
        setInput((prev) => {
          const separator = prev.trim() ? ' ' : '';
          return prev + separator + transcript;
        });
        setInterimTranscript(''); // Clear interim
      } else {
        // Interim result: just show temporarily
        setInterimTranscript(transcript);
      }
    },
  });

  const handleRun = () => {
    if (!input.trim()) {
      toast.error('Please enter some text first');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const result = transform(input, mode);
      setOutput(result.output);
      setIsProcessing(false);
      
      // Track transformation
      const wordCount = input.split(/\s+/).filter(Boolean).length;
      trackNoteTransform(mode, wordCount);
      
      // Show metadata if available
      if (result.metadata) {
        if (result.metadata.tasksFound !== undefined) {
          toast.success(`Found ${result.metadata.tasksFound} task(s)`);
        } else if (result.metadata.compressionRatio) {
          const ratio = result.metadata.compressionRatio.toFixed(1);
          toast.success(`Compressed by ${ratio}x`);
        } else {
          toast.success('Notes transformed successfully!');
        }
      } else {
        toast.success('Notes transformed successfully!');
      }
    }, 200);
  };

  const handleSample = () => {
    const sample = `Quick brain dump:
Met with the product team today. I need to send them a follow-up email with the updated roadmap. 
Also have to prepare slides for Friday's review. I'm worried about timelines but excited about the new launch.
Remember to check in with marketing about the launch campaign and schedule a call with the design team.`;
    setInput(sample);
    toast.success('Sample text loaded');
  };

  const handleCopyOutput = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      trackCopyToClipboard();
      // Toast handled in copyToClipboard
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setCurrentNote(null);
    toast('Cleared', { icon: '🗑️' });
  };

  const handleSaveManually = () => {
    if (!input.trim()) {
      toast.error('Please enter some text first');
      return;
    }

    const note: Note = {
      // Always keep the same ID if we have a currentNote (update mode)
      id: currentNote?.id || `note-${Date.now()}`,
      title: generateTitle(input),
      input,
      output: output || input, // Use input as output if not transformed yet
      mode,
      createdAt: currentNote?.createdAt || Date.now(),
      updatedAt: Date.now(),
      wordCount: input.split(/\s+/).filter(Boolean).length,
      isFavorite: currentNote?.isFavorite || false,
    };

    console.log('Attempting to save note:', note);
    const saved = saveNote(note);
    console.log('Save result:', saved);
    
    // Debug: Check localStorage after save
    const storedNotes = localStorage.getItem('shrp_notes');
    console.log('Notes in localStorage after save:', storedNotes ? JSON.parse(storedNotes).length : 0);
    
    if (saved) {
      setCurrentNote(note);
      trackNoteSave(false); // Manual save
      toast.success(currentNote ? 'Note updated!' : 'Note saved!');
      console.log('Calling refreshHistory...');
      refreshHistory();
    } else {
      console.error('Failed to save note');
    }
  };

  const handleExport = (format: 'txt' | 'md') => {
    if (!output) {
      toast.error('Nothing to export yet');
      return;
    }

    const note: Note = currentNote || {
      id: `note-${Date.now()}`,
      title: generateTitle(input),
      input,
      output,
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      wordCount: input.split(/\s+/).filter(Boolean).length,
      isFavorite: false,
    };

    if (format === 'md') {
      exportNoteAsMarkdown(note);
    } else {
      exportNoteAsTxt(note);
    }
    
    trackNoteExport(format);
  };

  const handleSelectNote = (note: Note) => {
    setInput(note.input);
    setOutput(note.output);
    setMode(note.mode);
    setCurrentNote(note);
    setIsHistoryOpen(false);
    toast.success('Note loaded');
  };

  const handleDeleteNote = (noteId: string) => {
    deleteHistoryNote(noteId);
    if (currentNote?.id === noteId) {
      handleClear();
    }
    trackNoteDelete();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-violet-900 text-slate-50' 
        : 'bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 text-slate-900'
    }`}>
      {/* glowing blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl ${
          isDarkMode ? 'bg-violet-500/30' : 'bg-violet-300/40'
        }`} />
        <div className={`absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl ${
          isDarkMode ? 'bg-sky-500/30' : 'bg-blue-300/40'
        }`} />
      </div>

      {/* Main Content */}
      <main 
        className={`relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-14 pt-8 sm:px-6 lg:px-8 transition-all duration-300 ${
          isHistoryPinned ? 'lg:pr-[336px]' : 'lg:pr-[64px]'
        }`}
      >
        {/* hero */}
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mt-0">
                {/* Combined Badge */}
                <div className={`inline-flex items-center gap-2 rounded-full border backdrop-blur-sm mb-4 px-4 py-1.5 text-xs font-medium ${
                  isDarkMode
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-emerald-600/40 bg-emerald-100/70 text-emerald-800'
                }`}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>✏️ SHRP Notes · NLP-Powered Note Transformation · 100% local · No data ever leaves your browser</span>
                </div>

                <h1 className={`text-balance text-4xl font-semibold tracking-tight sm:text-5xl ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}>
                  Your notes are chaotic.<br />
                  <span className={`bg-clip-text text-transparent ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200'
                      : 'bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600'
                  }`}>
                    SHRP makes them sharp.
                  </span>
                </h1>
                <p className={`mt-4 text-sm sm:text-base ${
                  isDarkMode ? 'text-slate-200/80' : 'text-slate-700/90'
                }`}>
                  Paste your messy meeting notes, brain dumps, or half-written drafts.
                  SHRP Notes uses natural language processing to extract key information,
                  organize content, fix grammar, and identify action items.
                </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm transition-colors ${
                isDarkMode
                  ? 'border-violet-300/60 bg-violet-500/30 text-violet-50 shadow-violet-900/40 hover:bg-violet-500/40'
                  : 'border-violet-400/60 bg-white/70 text-violet-900 shadow-violet-300/40 hover:bg-white/90'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            {/* History Toggle */}
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm lg:hidden ${
                isDarkMode
                  ? 'border-violet-300/60 bg-violet-500/30 text-violet-50 shadow-violet-900/40 hover:bg-violet-500/40'
                  : 'border-violet-400/60 bg-white/70 text-violet-900 shadow-violet-300/40 hover:bg-white/90'
              }`}
            >
              📚 History
            </button>
          </div>
        </div>
      </header>        {/* main grid */}
        <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* input + controls */}
          <div
            id="notes-input"
            className={`flex flex-col rounded-2xl border p-4 shadow-xl backdrop-blur ${
              isDarkMode
                ? 'border-slate-700/70 bg-slate-900/80 shadow-slate-950/60'
                : 'border-violet-200/60 bg-white/80 shadow-violet-200/40'
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <h2 className={`text-sm font-semibold ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}`}>
                  Raw notes
                </h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-300/70' : 'text-slate-600/70'}`}>
                  Paste anything — meeting minutes, planning notes, or a messy braindump.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSample}
                className={`rounded-full border px-3 py-1 text-[11px] ${
                  isDarkMode
                    ? 'border-slate-600/80 bg-slate-900/70 text-slate-200 hover:bg-slate-800'
                    : 'border-violet-300/60 bg-violet-50/70 text-violet-900 hover:bg-violet-100/70'
                }`}
              >
                Fill with sample
              </button>
            </div>

            <div className="relative flex-1 mb-3 min-h-[280px] sm:min-h-[320px]">
              <textarea
                className={`h-full w-full resize-none rounded-xl border px-3 py-3 pr-12 text-sm outline-none ring-0 ${
                  isDarkMode
                    ? 'border-slate-700 bg-slate-950/80 text-slate-50 placeholder:text-slate-500 focus:border-violet-400 focus:ring-1 focus:ring-violet-500'
                    : 'border-violet-200 bg-white/90 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-400'
                }`}
                placeholder={`Example:\n"ok, meeting with team went all over the place. deadlines, bugs, new feature ideas... i need to email Sarah, fix that onboarding bug, and update the roadmap doc before Friday."`}
                value={input + (interimTranscript ? ' ' + interimTranscript : '')}
                onChange={(e) => {
                  console.log('[Input] Text changed:', e.target.value.substring(0, 50));
                  setInput(e.target.value);
                  setInterimTranscript(''); // Clear interim when user types
                }}
              />
              
              {/* Interim transcript overlay (grayed out) */}
              {interimTranscript && (
                <div className="absolute inset-0 px-3 py-3 pr-12 text-sm pointer-events-none overflow-hidden">
                  <span className="opacity-0">{input}</span>
                  <span className="text-slate-400"> {interimTranscript}</span>
                </div>
              )}
              
              {/* Voice Input Button */}
              {isSupported && (
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-3 top-3 rounded-full p-2 transition-all ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                  }`}
                  aria-label={isListening ? 'Stop recording' : 'Start voice input'}
                  title={isListening ? 'Stop recording' : 'Start voice input'}
                >
                  {isListening ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* mode selector */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {(['summarize', 'structure', 'polish', 'tasks'] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize transition ${
                    mode === m
                      ? 'bg-violet-500 text-white shadow-sm shadow-violet-900/70'
                      : isDarkMode
                        ? 'border border-slate-600/80 bg-slate-900/80 text-slate-200 hover:bg-slate-800'
                        : 'border border-violet-300/60 bg-violet-50/70 text-violet-900 hover:bg-violet-100/70'
                  }`}
                >
                  {modeLabel(m)}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-3">
              <StorageIndicator isDarkMode={isDarkMode} />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveManually}
                  disabled={!input.trim()}
                  className={`rounded-full border px-3 py-1 text-xs hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'border-slate-600/80 text-slate-300 hover:bg-slate-800/80'
                      : 'border-violet-300/60 text-violet-900 hover:bg-violet-50/70'
                  }`}
                  title="Cmd/Ctrl + S"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    isDarkMode
                      ? 'border-slate-600/80 text-slate-300 hover:bg-slate-800/80'
                      : 'border-violet-300/60 text-violet-900 hover:bg-violet-50/70'
                  }`}
                  title="Cmd/Ctrl + K"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={!input.trim() || isProcessing}
                  className="inline-flex items-center gap-1.5 rounded-full bg-violet-500 px-4 py-1.5 text-xs font-medium text-white shadow-lg shadow-violet-900/50 hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-slate-600"
                  title="Cmd/Ctrl + Enter"
                >
                  {isProcessing ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-slate-900 border-t-slate-50" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <span>Make it sharp</span>
                      <span>➜</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mode Description - Centered below storage */}
            <p className={`mt-2 text-center text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {modeDescription(mode)}
            </p>
          </div>

          {/* output */}
          <div className="flex flex-col gap-4">
            <div className={`flex flex-1 flex-col rounded-2xl border p-4 shadow-xl backdrop-blur ${
              isDarkMode
                ? 'border-slate-700/70 bg-slate-900/80 shadow-slate-950/60'
                : 'border-violet-200/60 bg-white/80 shadow-violet-200/40'
            }`}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h2 className={`text-sm font-semibold ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}`}>
                    {mode === 'summarize' && 'Sharp summary'}
                    {mode === 'structure' && 'Structured outline'}
                    {mode === 'polish' && 'Polished draft'}
                    {mode === 'tasks' && 'Actionable task list'}
                  </h2>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide ${
                    isDarkMode 
                      ? 'bg-slate-900/80 text-slate-400' 
                      : 'bg-violet-100/70 text-violet-700'
                  }`}>
                    {modeLabel(mode)}
                  </span>
                </div>
                {output && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleCopyOutput}
                      className={`rounded-full border px-3 py-1 text-[11px] flex items-center gap-1.5 ${
                        isDarkMode
                          ? 'border-slate-600/80 bg-slate-900/70 text-slate-200 hover:bg-slate-800'
                          : 'border-violet-300/60 bg-violet-50/70 text-violet-900 hover:bg-violet-100/70'
                      }`}
                    >
                      <span>📋</span>
                      <span>Copy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExport('md')}
                      className={`rounded-full border px-3 py-1 text-[11px] ${
                        isDarkMode
                          ? 'border-slate-600/80 bg-slate-900/70 text-slate-200 hover:bg-slate-800'
                          : 'border-violet-300/60 bg-violet-50/70 text-violet-900 hover:bg-violet-100/70'
                      }`}
                      title="Cmd/Ctrl + E"
                    >
                      Export
                    </button>
                  </div>
                )}
              </div>

              {output ? (
                <pre className={`mt-1 flex-1 whitespace-pre-wrap rounded-xl p-3 text-xs leading-relaxed ${
                  isDarkMode 
                    ? 'bg-slate-950/70 text-slate-100' 
                    : 'bg-violet-50/50 text-slate-900'
                }`}>
                  {output}
                </pre>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
                  <div className={`h-14 w-14 rounded-xl border border-dashed ${
                    isDarkMode 
                      ? 'border-slate-600/80 bg-slate-900/60' 
                      : 'border-violet-300/60 bg-violet-50/50'
                  }`} />
                  <p className={`max-w-xs text-xs ${isDarkMode ? 'text-slate-300/80' : 'text-slate-600/80'}`}>
                    Your transformed notes will show up here. Paste something on the left,
                    pick a mode, and hit &ldquo;Make it sharp&rdquo;.
                  </p>
                </div>
              )}
            </div>

            <div className={`rounded-2xl border p-4 text-[11px] shadow-xl backdrop-blur ${
              isDarkMode
                ? 'border-slate-700/70 bg-slate-900/80 text-slate-300/80 shadow-slate-950/60'
                : 'border-violet-200/60 bg-white/80 text-slate-600/80 shadow-violet-200/40'
            }`}>
              <p className={`mb-1 font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                ⌨️ Keyboard Shortcuts
              </p>
              <div className="space-y-1 text-[10px]">
                <p><kbd className={`px-1 py-0.5 rounded ${isDarkMode ? 'bg-slate-800' : 'bg-violet-100'}`}>Cmd/Ctrl+Enter</kbd> Transform</p>
                <p><kbd className={`px-1 py-0.5 rounded ${isDarkMode ? 'bg-slate-800' : 'bg-violet-100'}`}>Cmd/Ctrl+S</kbd> Save</p>
                <p><kbd className={`px-1 py-0.5 rounded ${isDarkMode ? 'bg-slate-800' : 'bg-violet-100'}`}>Cmd/Ctrl+E</kbd> Export</p>
                <p><kbd className={`px-1 py-0.5 rounded ${isDarkMode ? 'bg-slate-800' : 'bg-violet-100'}`}>Cmd/Ctrl+K</kbd> Clear</p>
              </div>
            </div>
          </div>
        </section>

        <footer className={`mt-8 text-center text-xs space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p className={isDarkMode ? 'text-slate-500' : 'text-slate-600'}>
            Built for builders, writers, and overthinkers. SHRP Notes stores everything locally — unlimited & private.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px]">
            <a 
              href="https://github.com/digitalwareshub/sharpnotes" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-slate-700 hover:text-violet-600'
              }`}
            >
              ⭐ Star on GitHub
            </a>
            <span className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}>•</span>
            <a 
              href="https://x.com/digi_wares" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-slate-700 hover:text-violet-600'
              }`}
            >
              🐦 Follow Updates
            </a>
            <span className={isDarkMode ? 'text-slate-600' : 'text-slate-400'}>•</span>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className={`transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-slate-700 hover:text-violet-600'
              }`}
            >
              ✉️ Feedback
            </button>
          </div>
          <p className={`text-[10px] ${isDarkMode ? 'text-slate-600' : 'text-slate-500'}`}>
            Made with ❤️ by <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className={isDarkMode ? 'text-violet-400 hover:underline' : 'text-violet-600 hover:underline'}>Digiwares</a> • Open Source (MIT License)
          </p>
        </footer>
      </main>

      {/* History Sidebar */}
      <NoteHistory
        notes={notes}
        isLoading={isHistoryLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectNote={handleSelectNote}
        onDeleteNote={handleDeleteNote}
        onToggleFavorite={toggleFavorite}
        onToggleNotePin={togglePin}
        selectedNoteId={currentNote?.id}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        isPinned={isHistoryPinned}
        onTogglePin={() => setIsHistoryPinned(!isHistoryPinned)}
        isDarkMode={isDarkMode}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
}