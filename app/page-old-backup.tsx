'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

type Mode = 'summarize' | 'structure' | 'polish' | 'tasks';

function summarizeText(text: string): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= 80) return text.trim();
  return words.slice(0, 80).join(' ') + '…';
}

function structureText(text: string): string {
  const sentences = text
    .split(/([.!?])\s+/)
    .reduce<string[]>((acc, part, index, arr) => {
      if (index % 2 === 0) {
        const sentence = part + (arr[index + 1] || '');
        if (sentence.trim()) acc.push(sentence.trim());
      }
      return acc;
    }, []);
  if (!sentences.length) return 'Not enough structure detected yet. Try adding a few more complete thoughts.';
  return sentences.map(s => `• ${s}`).join('\n');
}

function polishText(text: string): string {
  if (!text.trim()) return '';
  // Simple "polish": trim, normalize spacing, ensure sentences start with capital
  const cleaned = text
    .replace(/\s+/g, ' ')
    .trim();
  const pieces = cleaned.split(/([.!?])\s+/);
  const polished: string[] = [];
  for (let i = 0; i < pieces.length; i += 2) {
    const sentence = (pieces[i] || '').trim();
    const punct = pieces[i + 1] || '';
    if (!sentence) continue;
    const cap = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    polished.push(cap + punct);
  }
  return polished.join(' ');
}

function extractTasks(text: string): string {
  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  const taskKeywords = ['need to', 'have to', 'must', 'todo', 'to-do', 'should', 'remember to', 'remind', 'email', 'call', 'meet', 'schedule', 'finish', 'complete'];
  const tasks: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (taskKeywords.some(k => lower.includes(k))) {
      tasks.push(line);
    }
  }

  if (!tasks.length) {
    return 'No clear tasks detected yet. Try writing lines like “I need to…” or “I should remember to…”.';
  }

  return tasks.map((t, idx) => `${idx + 1}. ${t}`).join('\n');
}

function transform(text: string, mode: Mode): string {
  switch (mode) {
    case 'summarize':
      return summarizeText(text);
    case 'structure':
      return structureText(text);
    case 'polish':
      return polishText(text);
    case 'tasks':
      return extractTasks(text);
    default:
      return text;
  }
}

export default function Page() {
  const [mode, setMode] = useState<Mode>('summarize');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRun = () => {
    if (!input.trim()) {
      toast.error('Please enter some text first');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const result = transform(input, mode);
      setOutput(result);
      setIsProcessing(false);
      toast.success('Notes transformed successfully!');
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
    if (!output) {
      toast.error('Nothing to copy yet');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    toast('Cleared', { icon: '🗑️' });
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
        return 'Short, punchy overview of what you wrote.';
      case 'structure':
        return 'Turn messy paragraphs into bullet points.';
      case 'polish':
        return 'Clean up tone, spacing, and flow.';
      case 'tasks':
        return 'Pull out actionable items and todos.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-violet-900 text-slate-50">
      {/* glowing blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        {/* hero */}
        <header className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100 backdrop-blur">
            <span className="text-violet-200">✏️ SHRP Notes</span>
            <span className="h-1 w-1 rounded-full bg-violet-300" />
            <span className="text-violet-100/80">Turn messy notes into sharp docs</span>
          </span>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Your notes are chaotic.<br />
                <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-sky-200 bg-clip-text text-transparent">
                  SHRP makes them sharp.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-sm text-slate-200/80 sm:text-base">
                Paste your messy meeting notes, brain dumps, or half-written drafts.
                SHRP Notes restructures them into clean summaries, bullet-point outlines,
                polished text, or actionable task lists — in your browser.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('notes-input');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="inline-flex items-center justify-center rounded-full border border-violet-300/60 bg-violet-500/30 px-6 py-2 text-sm font-medium text-violet-50 shadow-lg shadow-violet-900/40 backdrop-blur-sm hover:bg-violet-500/40"
            >
              ⚡ Try it now
            </button>
          </div>
        </header>

        {/* main grid */}
        <section className="grid flex-1 gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          {/* input + controls */}
          <div
            id="notes-input"
            className="flex flex-col rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/60 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Raw notes</h2>
                <p className="text-xs text-slate-300/70">
                  Paste anything — meeting minutes, planning notes, or a messy braindump.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSample}
                className="rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-800"
              >
                Fill with sample
              </button>
            </div>

            <textarea
              className="min-h-[200px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-violet-400 focus:ring-1 focus:ring-violet-500"
              placeholder={`Example:\n"ok, meeting with team went all over the place. deadlines, bugs, new feature ideas... i need to email Sarah, fix that onboarding bug, and update the roadmap doc before Friday."`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* mode selector */}
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {(['summarize', 'structure', 'polish', 'tasks'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize transition ${
                      mode === m
                        ? 'bg-violet-500 text-slate-950 shadow-sm shadow-violet-900/70'
                        : 'border border-slate-600/80 bg-slate-900/80 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {modeLabel(m)}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                {modeDescription(mode)}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[11px] text-slate-400">
                No sign-up, no cloud. Everything runs in your browser.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-full border border-slate-600/80 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800/80"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={!input.trim() || isProcessing}
                  className="inline-flex items-center gap-1.5 rounded-full bg-violet-500 px-4 py-1.5 text-xs font-medium text-slate-950 shadow-lg shadow-violet-900/50 hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-slate-600"
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
          </div>

          {/* output */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-xl shadow-slate-950/60 backdrop-blur">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-50">
                    {mode === 'summarize' && 'Sharp summary'}
                    {mode === 'structure' && 'Structured outline'}
                    {mode === 'polish' && 'Polished draft'}
                    {mode === 'tasks' && 'Actionable task list'}
                  </h2>
                  <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    {modeLabel(mode)}
                  </span>
                </div>
                {output && (
                  <button
                    type="button"
                    onClick={handleCopyOutput}
                    className="rounded-full border border-slate-600/80 bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200 hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <span>📋</span>
                    <span>Copy</span>
                  </button>
                )}
              </div>

              {output ? (
                <pre className="mt-1 flex-1 whitespace-pre-wrap rounded-xl bg-slate-950/70 p-3 text-xs leading-relaxed text-slate-100">
                  {output}
                </pre>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
                  <div className="h-14 w-14 rounded-xl border border-dashed border-slate-600/80 bg-slate-900/60" />
                  <p className="max-w-xs text-xs text-slate-300/80">
                    Your transformed notes will show up here. Paste something on the left,
                    pick a mode, and hit &ldquo;Make it sharp&rdquo;.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 text-[11px] text-slate-300/80 shadow-xl shadow-slate-950/60 backdrop-blur">
              <p className="mb-1 font-semibold text-slate-100">Why SHRP Notes?</p>
              <p>
                Typing fast is easy. Turning chaos into something you can actually share
                with your team, clients, or future self is the hard part. SHRP Notes sits
                in between — a tiny layer that sharpens what your brain already produced.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-8 text-center text-[11px] text-slate-500">
          Built for builders, writers, and overthinkers. SHRP Notes is a playground — plug in your own AI later if you want.
        </footer>
      </main>
    </div>
  );
}
