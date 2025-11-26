'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import type { Mode, Note } from '../../types';
import { transform } from '../../lib/transformers';
import { saveNote } from '../../lib/storage/localStorage';
import { exportNoteAsZip, copyToClipboard } from '../../lib/export';
import { validateAndSanitize, shouldWarnAboutTimeout } from '../../lib/validation';
import { useNoteHistory } from '../../hooks/useNoteHistory';
import { useAutoSave } from '../../hooks/useAutoSave';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { NoteHistory } from '../../components/notes/NoteHistory';
import StorageIndicator from '../../components/ui/StorageIndicator';
import { FeedbackModal } from '../../components/ui/FeedbackModal';
import OnboardingTour from '../../components/ui/OnboardingTour';
import { Tooltip } from '../../components/ui/Tooltip';
import PWAInstallPrompt from '../../components/ui/PWAInstallPrompt';
import {
  trackNoteTransform,
  trackNoteExport,
  trackNoteSave,
  trackCopyToClipboard,
  trackNoteDelete,
  trackKeyboardShortcut,
  trackError,
} from '../../lib/analytics';

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
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [activeView, setActiveView] = useState<'input' | 'output'>('input'); // Mobile view toggle
  
  // Check if this is the user's first visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dontShowAgain = localStorage.getItem('shrp_onboarding_dont_show');
      
      // Only show if user hasn't checked "don't show again"
      if (!dontShowAgain) {
        setIsOnboardingOpen(true);
      }
    }
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboardingOpen(false);
    // Note: We don't set anything here - the OnboardingTour component
    // handles saving the "don't show again" preference if user checked it
  };
  

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
        handleExport();
      },
      description: 'Export as ZIP (all formats)',
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
    // Validate and sanitize input
    const validation = validateAndSanitize(input);
    
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid input');
      trackError('validation_failed', validation.error || 'Invalid input');
      return;
    }

    // Show warning if text is very long
    if (validation.warning) {
      toast(validation.warning, {
        icon: '⚠️',
        duration: 3000,
      });
    }

    // Warn about potential timeout
    if (shouldWarnAboutTimeout(validation.sanitized)) {
      toast('Processing large text... This may take a few seconds', {
        icon: '⏱️',
        duration: 2000,
      });
    }

    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = transform(validation.sanitized, mode);
        setOutput(result.output);
        setIsProcessing(false);
        
        // Switch to output view on mobile after transformation
        setActiveView('output');
        
        // Track transformation
        const wordCount = validation.sanitized.split(/\s+/).filter(Boolean).length;
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
      } catch (error) {
        console.error('Transform error:', error);
        setIsProcessing(false);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        trackError('transform_failed', errorMessage);
        toast.error(
          error instanceof Error 
            ? `Transformation failed: ${error.message}` 
            : 'An unexpected error occurred. Please try again.'
        );
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
    try {
      const success = await copyToClipboard(output);
      if (success) {
        trackCopyToClipboard();
        // Toast handled in copyToClipboard
      }
    } catch (error) {
      console.error('Copy error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      trackError('copy_failed', errorMessage);
      toast.error('Failed to copy to clipboard. Please try again.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setCurrentNote(null);
    toast('Cleared', { icon: '🗑️' });
  };

  const handleSaveManually = () => {
    // Validate input
    const validation = validateAndSanitize(input);
    
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid input');
      return;
    }

    try {
      const note: Note = {
        // Always keep the same ID if we have a currentNote (update mode)
        id: currentNote?.id || `note-${Date.now()}`,
        title: generateTitle(validation.sanitized),
        input: validation.sanitized,
        output: output || validation.sanitized, // Use input as output if not transformed yet
        mode,
        createdAt: currentNote?.createdAt || Date.now(),
        updatedAt: Date.now(),
        wordCount: validation.sanitized.split(/\s+/).filter(Boolean).length,
        isFavorite: currentNote?.isFavorite || false,
      };

      const saved = saveNote(note);
      
      if (saved) {
        setCurrentNote(note);
        // Update input with sanitized version
        setInput(validation.sanitized);
        trackNoteSave(false); // Manual save
        toast.success(currentNote ? 'Note updated!' : 'Note saved!');
        refreshHistory();
      } else {
        console.error('Failed to save note');
        trackError('save_failed', 'saveNote returned false');
        toast.error('Failed to save note. Please try again.');
      }
    } catch (error) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      trackError('save_failed', errorMessage);
      toast.error(
        error instanceof Error
          ? `Save failed: ${error.message}`
          : 'An unexpected error occurred while saving. Please try again.'
      );
    }
  };

  const handleExport = async () => {
    if (!output) {
      toast.error('Nothing to export yet');
      return;
    }

    try {
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

      await exportNoteAsZip(note);
      trackNoteExport('zip');
    } catch (error) {
      console.error('Export error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      trackError('export_failed', errorMessage);
      toast.error(
        error instanceof Error
          ? `Export failed: ${error.message}`
          : 'An unexpected error occurred during export. Please try again.'
      );
    }
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
    <div className="min-h-screen transition-colors duration-300 ">
      {/* glowing blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl bg-orange-400/40" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl bg-blue-300/40" />
      </div>

      {/* Main Content */}
      <main 
        className={`relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-14 pt-8 sm:px-6 lg:px-8 transition-all duration-300 ${
          isHistoryPinned ? 'lg:pr-[336px]' : ''
        }`}
      >
        {/* hero */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-4">
            {/* App Logo/Name */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-gray-900">
                <span className="text-2xl">✏️</span>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-orange-600">
                    SHRP
                  </h1>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    NLP-Powered Notes
                  </p>
                </div>
              </Link>
              
              {/* Privacy Badge - Compact */}
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium ">
                <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>100% Local</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* History Toggle - Mobile Only */}
              <Tooltip 
                content="View your saved notes"
                position="bottom"
              >
                <button
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="rounded-full border p-2 sm:p-2.5 shadow-lg backdrop-blur-sm lg:hidden min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center "
                  aria-label="View history"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Mobile View Toggle */}
        <div className="mb-4 flex gap-2 lg:hidden">
          <button
            onClick={() => setActiveView('input')}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all "
          >
            📝 Input
          </button>
          <button
            onClick={() => setActiveView('output')}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all "
          >
            ✨ Output {output && <span className="ml-1">●</span>}
          </button>
        </div>

        {/* main grid */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-h-[calc(100vh-280px)] lg:h-[calc(100vh-280px)] lg:overflow-hidden">
          {/* input + controls */}
          <div
            id="notes-input"
            className="flex flex-col rounded-2xl border p-4 pb-6 shadow-xl backdrop-blur lg:h-full lg:overflow-hidden min-h-0 "
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <h2 className={`text-sm font-semibold $'text-gray-900'`}>
                  Raw notes
                </h2>
                <p className={`text-xs $'text-gray-600/70'`}>
                  Paste anything — meeting minutes, planning notes, or a messy braindump.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSample}
                className="rounded-full border px-3 py-1 text-[11px] "
              >
                Fill with sample
              </button>
            </div>

            <div className="relative flex-1 mb-3 min-h-[200px] lg:min-h-[280px] overflow-hidden">
              <textarea
                className="h-full w-full resize-none rounded-xl border px-3 py-3 pr-12 text-sm outline-none ring-0 "
                placeholder={`Example:\n"ok, meeting with team went all over the place. deadlines, bugs, new feature ideas... i need to email Sarah, fix that onboarding bug, and update the roadmap doc before Friday."`}
                value={input + (interimTranscript ? ` ${  interimTranscript}` : '')}
                onChange={(e) => {
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
                  className="absolute right-3 top-3 rounded-full p-2 sm:p-2.5 transition-all min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center "
                  aria-label={isListening ? 'Stop recording' : 'Start voice input'}
                  title={isListening ? 'Stop recording' : 'Start voice input'}
                >
                  {isListening ? (
                    <svg className="h-5 w-5 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Mode selector and action buttons */}
            <div className="space-y-3 flex-shrink-0">
              {/* Mode Description - Always visible, centered, above buttons */}
              <p className={`text-center text-xs leading-relaxed px-2 $'text-gray-600'`}>
                {modeDescription(mode)}
              </p>
              
              {/* Mode buttons - Full width on mobile */}
              <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:justify-center lg:gap-2">
                {(['summarize', 'structure', 'polish', 'tasks'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium capitalize transition lg:rounded-xl lg:px-4 lg:py-2 lg:text-xs "
                  >
                    {modeLabel(m)}
                  </button>
                ))}
              </div>
              
              {/* Mobile action buttons - Full width below mode buttons */}
              <div className="flex flex-col gap-2 lg:hidden">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium "
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveManually}
                    disabled={!input.trim()}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed "
                  >
                    Save
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={!input.trim() || isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-600 shadow-md shadow-orange-500/30"
                >
                  {isProcessing ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-[2px] border-slate-900 border-t-slate-50" />
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
            
            {/* Mobile storage indicator - below mode description */}
            <div className="lg:hidden flex-shrink-0">
              <StorageIndicator />
            </div>

            {/* Desktop action buttons and storage indicator */}
            <div className="hidden lg:flex items-center justify-between gap-3 flex-shrink-0 mt-3">
              <StorageIndicator />
              <div className="flex items-center gap-2">
                <Tooltip content="Save note (Cmd/Ctrl+S)" position="top">
                  <button
                    type="button"
                    onClick={handleSaveManually}
                    disabled={!input.trim()}
                    className="rounded-full border px-3 py-1 text-xs hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed "
                  >
                    Save
                  </button>
                </Tooltip>
                <Tooltip content="Clear all text (Cmd/Ctrl+K)" position="top">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="rounded-full border px-3 py-1 text-xs "
                  >
                    Clear
                  </button>
                </Tooltip>
                <Tooltip content="Transform your notes (Cmd/Ctrl+Enter)" position="top">
                  <button
                    type="button"
                    onClick={handleRun}
                    disabled={!input.trim() || isProcessing}
                    className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-600 shadow-lg shadow-orange-500/30"
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
                </Tooltip>
              </div>
            </div>
          </div>

          {/* output */}
          <div className={`flex flex-col gap-4 h-full overflow-hidden ${
            activeView === 'input' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="flex flex-col rounded-2xl border p-4 shadow-xl backdrop-blur flex-1 min-h-0 ">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h2 className={`text-sm font-semibold $'text-gray-900'`}>
                    {mode === 'summarize' && 'Sharp summary'}
                    {mode === 'structure' && 'Structured outline'}
                    {mode === 'polish' && 'Polished draft'}
                    {mode === 'tasks' && 'Actionable task list'}
                  </h2>
                  <span className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide ">
                    {modeLabel(mode)}
                  </span>
                </div>
                {output && (
                  <div className="flex items-center gap-1">
                    <Tooltip content="Copy to clipboard" position="bottom">
                      <button
                        type="button"
                        onClick={handleCopyOutput}
                        className="rounded-full border px-3 py-1 text-[11px] flex items-center gap-1.5 "
                      >
                        <span>📋</span>
                        <span>Copy</span>
                      </button>
                    </Tooltip>
                    <Tooltip content="Export as ZIP (TXT, MD, DOCX) - Cmd/Ctrl+E" position="bottom">
                      <button
                        type="button"
                        onClick={handleExport}
                        className="rounded-full border px-3 py-1 text-[11px] flex items-center gap-1.5 "
                      >
                        <span>📦</span>
                        <span>Export</span>
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>

              {output ? (
                <pre className="mt-1 flex-1 whitespace-pre-wrap rounded-xl p-3 text-xs leading-relaxed overflow-y-auto overflow-x-hidden ">
                  {output}
                </pre>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
                  <div className="h-14 w-14 rounded-xl border border-dashed " />
                  <p className={`max-w-xs text-xs $'text-gray-600/80'`}>
                    Your transformed notes will show up here. Paste something on the left,
                    pick a mode, and hit &ldquo;Make it sharp&rdquo;.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border p-4 text-[11px] shadow-xl backdrop-blur ">
              <p className={`mb-1 font-semibold $'text-gray-900'`}>
                ⌨️ Keyboard Shortcuts
              </p>
              <div className="space-y-1 text-[10px]">
                <p><kbd className={`px-1 py-0.5 rounded $'bg-orange-100'`}>Cmd/Ctrl+Enter</kbd> Transform</p>
                <p><kbd className={`px-1 py-0.5 rounded $'bg-orange-100'`}>Cmd/Ctrl+S</kbd> Save</p>
                <p><kbd className={`px-1 py-0.5 rounded $'bg-orange-100'`}>Cmd/Ctrl+E</kbd> Export</p>
                <p><kbd className={`px-1 py-0.5 rounded $'bg-orange-100'`}>Cmd/Ctrl+K</kbd> Clear</p>
              </div>
            </div>
          </div>
        </section>

        <footer className={`mt-8 text-center space-y-3 $'text-gray-600'`}>
          <p className={`text-xs sm:text-sm $'text-gray-600'`}>
            Built for builders, writers, and overthinkers. SHRP Notes stores everything locally — unlimited & private.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm sm:text-xs">
            <a 
              href="https://github.com/digitalwareshub/sharpnotes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors py-2 px-1 text-gray-700 hover:text-orange-600"
            >
              ⭐ Star on GitHub
            </a>
            <span className={`$'text-slate-400'`}>•</span>
            <Link 
              href="/blog"
              className="transition-colors py-2 px-1 text-gray-700 hover:text-orange-600"
            >
              📝 Blog
            </Link>
            <span className={`$'text-slate-400'`}>•</span>
            <Link 
              href="/privacy"
              className="transition-colors py-2 px-1 text-gray-700 hover:text-orange-600"
            >
              � Privacy
            </Link>
            <span className={`$'text-slate-400'`}>•</span>
            <a 
              href="https://x.com/digi_wares" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors py-2 px-1 text-gray-700 hover:text-orange-600"
            >
              🐦 Follow Updates
            </a>
            <span className={`$'text-slate-400'`}>•</span>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="transition-colors py-2 px-1 text-gray-700 hover:text-orange-600"
            >
              ✉️ Feedback
            </button>
            <span className={`$'text-slate-400'`}>•</span>
            <button
              onClick={() => {
                localStorage.removeItem('hasSeenOnboarding');
                localStorage.removeItem('shrp_onboarding_dont_show');
                setIsOnboardingOpen(true);
              }}
              className="transition-colors py-2 px-1 text-gray-700 hover:text-orange-600"
            >
              🎓 Tutorial
            </button>
          </div>
          <p className={`text-xs $'text-gray-500'`}>
            Made with ❤️ by <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className='text-orange-600 hover:underline'>Digiwares</a> • Open Source (MIT License)
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
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* Onboarding Tour */}
      {isOnboardingOpen && (
        <OnboardingTour
          onComplete={handleOnboardingComplete}
        />
      )}

      {/* PWA Installation Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}