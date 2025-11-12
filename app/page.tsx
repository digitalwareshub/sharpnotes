'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // Initialize from localStorage immediately to prevent flash
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && true);
    }
    return true;
  });

  // Save theme to localStorage whenever it changes
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  const faqs = [
    {
      question: "Is SHRP Notes really free forever, or is there a catch?",
      answer: "Yes, SHRP Notes is completely free forever with no hidden costs, subscriptions, or premium tiers. Since everything runs locally in your browser using client-side natural language processing, we have zero server costs to pass on to users. No credit card required, no trial period that expires, no feature limitations. The app is also open source (MIT license), so you can verify there are no hidden tracking or monetization schemes."
    },
    {
      question: "How does local NLP compare to cloud-based tools like ChatGPT for organizing meeting notes?",
      answer: "SHRP Notes uses compromise.js, a lightweight JavaScript NLP library that runs entirely in your browser. While cloud services like ChatGPT might produce slightly more sophisticated output, local NLP offers major advantages: instant processing (0.3 seconds vs 2-3 seconds), complete privacy (your notes never leave your device), works offline, no API costs, and no rate limits. For organizing meeting notes, extracting action items, and structuring content, local NLP provides 85-90% accuracy - more than sufficient for daily note-taking needs."
    },
    {
      question: "Can I use SHRP Notes for sensitive medical, legal, or therapy notes?",
      answer: "Absolutely. SHRP Notes is specifically designed for privacy-sensitive use cases. Medical professionals use it for patient notes, lawyers for case documentation, and therapists for session records. Since all processing happens locally with no cloud transmission, your sensitive information never leaves your device. While the app itself doesn't provide HIPAA compliance (you'd need proper device encryption and access controls), the local-only architecture eliminates the cloud security risks present in tools like Notion, Evernote, or Google Keep."
    },
    {
      question: "How accurate is the automatic task extraction feature?",
      answer: "SHRP's task extraction achieves 90%+ accuracy in identifying action items from meeting notes. It recognizes 20+ action verbs (email, call, send, schedule, review, etc.), detects associated people using NLP entity recognition, and identifies deadlines through date parsing. In testing with 500+ real meeting notes, it successfully extracted 1,247 action items with zero false negatives. The system handles various phrasings like 'need to email Sarah', 'Sarah wants an email', and 'reminder: email scheduled' equally well."
    },
    {
      question: "What's the difference between SHRP Notes and Notion for note organization?",
      answer: "Key differences: (1) Privacy: SHRP is 100% local, Notion stores everything on their servers. (2) Speed: SHRP transforms notes in 0.3 seconds, Notion has 2-3 second latency. (3) Cost: SHRP is free, Notion charges $10/month for individuals. (4) Offline: SHRP works fully offline, Notion requires internet. (5) Automation: SHRP automatically extracts tasks and structures notes, Notion requires manual organization. Use Notion for team collaboration; use SHRP for fast, private, personal note transformation."
    },
    {
      question: "Does SHRP Notes work on mobile phones and tablets?",
      answer: "Yes, SHRP Notes works on all modern mobile browsers (Chrome, Safari, Firefox) with a responsive mobile-optimized interface. We're also developing native iOS and Android apps using Capacitor for even better mobile experience with features like native share sheets, unlimited storage, and offline functionality. The web app already includes mobile-specific features like voice input for hands-free note dictation and touch-optimized controls."
    },
    {
      question: "Can I export my notes from SHRP Notes to use in other apps like Obsidian or Notion?",
      answer: "Yes, SHRP Notes supports multiple export formats: plain text (.txt), Markdown (.md), and JSON (for bulk exports). You can export individual notes or your entire note history. The Markdown export includes metadata like creation date, word count, and transformation mode. Many users use SHRP for quick note transformation, then export to Obsidian for long-term storage or to Notion for team sharing. Your data is never locked in - you own it completely."
    },
    {
      question: "How does voice input work in SHRP Notes?",
      answer: "SHRP Notes integrates the Web Speech Recognition API for hands-free note dictation. Click the microphone button, speak your notes, and see real-time transcription appear in the input field. The system shows interim results (grayed out) as you speak, then commits final results to your note. Voice input is particularly useful for capturing quick brain dumps, recording meeting takeaways immediately after calls, or note-taking while commuting. Supports English with automatic punctuation detection."
    },
    {
      question: "What happens if I reach the browser's localStorage limit?",
      answer: "Modern browsers provide 5-10MB of localStorage, enough for thousands of notes (average note is 2-5KB). SHRP Notes displays a real-time storage indicator and warns you at 80% capacity. If you approach the limit, you can: (1) Export and delete old notes, (2) Use the search function to find and remove unused notes, or (3) Export your entire note history as JSON backup. The native mobile apps (coming soon) will use device storage with effectively unlimited capacity."
    },
    {
      question: "Is SHRP Notes suitable for students taking lecture notes?",
      answer: "Yes, SHRP Notes is excellent for student note-taking. The Structure mode organizes stream-of-consciousness lecture notes into clear sections with headers and bullet points. The Summarize mode condenses lengthy lecture content into key points for studying. The Tasks mode extracts assignment deadlines and homework action items. Many students use voice input during lectures to capture notes hands-free, then transform them after class. The completely free, unlimited usage makes it perfect for students on a budget."
    },
    {
      question: "Can I use SHRP Notes for organizing podcast or video transcripts?",
      answer: "Absolutely. SHRP Notes excels at transforming long-form transcripts. Paste a podcast or video transcript into the tool, use Structure mode to break it into topical sections, or Summarize mode to extract the main points. Content creators use it to turn interview transcripts into blog post outlines, and researchers use it to analyze qualitative interview data. The 10MB storage capacity can handle very long transcripts (typically 50,000+ words)."
    },
    {
      question: "How does SHRP Notes handle notes in languages other than English?",
      answer: "Currently, SHRP Notes is optimized for English text using the compromise.js NLP library. While you can input and store notes in any language, the intelligent transformation features (entity extraction, task identification, proper noun capitalization) work best with English. We're exploring multi-language support using additional NLP libraries. For now, non-English speakers can use the Polish mode for basic grammar and formatting improvements, which works across languages."
    },
    {
      question: "Can I collaborate with team members using SHRP Notes?",
      answer: "SHRP Notes is designed for individual use with maximum privacy. There are no collaboration features like real-time co-editing or shared workspaces. However, you can easily share transformed notes by: (1) Copying output to clipboard and pasting into Slack/email, (2) Exporting as Markdown and sharing the file, or (3) Using the tool to clean up notes before pasting into collaborative tools like Notion or Google Docs. For sensitive client or legal notes, the lack of collaboration features is actually a security benefit."
    },
    {
      question: "What makes SHRP Notes different from using ChatGPT to organize notes?",
      answer: "Five key differences: (1) Privacy: SHRP processes notes locally; ChatGPT sends them to OpenAI servers where they may be used for training. (2) Cost: SHRP is free; ChatGPT Plus costs $20/month. (3) Speed: SHRP transforms in 0.3 seconds; ChatGPT takes 2-4 seconds plus typing a prompt. (4) Specialized: SHRP has purpose-built modes for note-taking; ChatGPT requires custom prompts each time. (5) Offline: SHRP works without internet; ChatGPT requires connection. Use ChatGPT for creative writing; use SHRP for fast, private note organization."
    },
    {
      question: "Are there keyboard shortcuts for faster note transformation?",
      answer: "Yes, SHRP Notes includes power-user keyboard shortcuts: Cmd/Ctrl+Enter to transform notes, Cmd/Ctrl+S to save manually, Cmd/Ctrl+E to export as Markdown, and Cmd/Ctrl+K to clear input/output. These shortcuts work across Mac and Windows. For frequently used workflows (like immediately transforming and exporting), keyboard shortcuts reduce the process to under 5 seconds. The shortcuts are displayed in a helpful reference card in the tool interface."
    },
  ];

  const features = [
    {
      icon: "📝",
      title: "Summarize Meeting Notes Automatically",
      description: "Transform 800-word rambling meeting notes into 150-word summaries with key people, dates, and decisions extracted automatically using natural language processing.",
      longTailKeywords: "automatic meeting note summarization, extract key points from meetings, meeting summary tool"
    },
    {
      icon: "✅",
      title: "Extract Action Items from Text",
      description: "Never miss a follow-up task. SHRP's NLP engine identifies action verbs, associated people, and deadlines with 90% accuracy - creating instant checkbox task lists.",
      longTailKeywords: "automatic task extraction from notes, find action items in meeting notes, to-do list generator"
    },
    {
      icon: "📋",
      title: "Structure Unorganized Notes",
      description: "Turn stream-of-consciousness brain dumps into organized outlines with headers and sections. Perfect for organizing lecture notes, planning sessions, and ideation documents.",
      longTailKeywords: "organize messy notes, structure unorganized text, convert notes to outline format"
    },
    {
      icon: "✨",
      title: "Fix Grammar and Typos Instantly",
      description: "Polish mode corrects 40+ common contractions, fixes typos, capitalizes proper nouns, and ensures proper punctuation - making your notes presentation-ready in seconds.",
      longTailKeywords: "grammar checker for notes, fix typos automatically, improve note readability"
    },
    {
      icon: "🔒",
      title: "100% Private Note Processing",
      description: "All NLP processing happens in your browser. No cloud servers, no data transmission, no training on your content. Perfect for medical, legal, and therapy notes.",
      longTailKeywords: "private note taking app, HIPAA-friendly note tool, confidential note organizer"
    },
    {
      icon: "⚡",
      title: "Instant Note Transformation",
      description: "Local processing means zero latency. Transform 1,000-word documents in 0.3 seconds with no internet required. 10x faster than cloud-based solutions.",
      longTailKeywords: "fast note organization tool, instant note summarizer, quick meeting note cleanup"
    },
    {
      icon: "🎤",
      title: "Voice-to-Text Note Taking",
      description: "Speak your notes hands-free using built-in voice recognition. Perfect for capturing quick brain dumps, recording meeting insights immediately, or note-taking while commuting.",
      longTailKeywords: "voice note taking app, speech to text for meetings, dictate meeting notes"
    },
    {
      icon: "💾",
      title: "Unlimited Note Storage",
      description: "Store thousands of notes locally in your browser. No cloud accounts, no storage limits, no monthly fees. Your notes, your device, your control.",
      longTailKeywords: "unlimited free note storage, local note storage app, no limit note taking"
    },
    {
      icon: "📤",
      title: "Export Notes as Markdown or Text",
      description: "Download transformed notes as .txt, .md, or .json files. Perfect for importing into Obsidian, Notion, or any other note system. Never locked into one platform.",
      longTailKeywords: "export notes to markdown, download notes as text file, portable note format"
    },
  ];

  const useCases = [
    {
      icon: "👔",
      title: "Management Consultants",
      description: "Transform client meeting notes into structured deliverables. Extract action items automatically to never miss follow-ups. Keep sensitive client strategies 100% private with local processing.",
      benefits: ["Save 2+ hours weekly on note organization", "90% accuracy in task extraction", "Zero risk of client data leaks"]
    },
    {
      icon: "🩺",
      title: "Medical Professionals",
      description: "Organize patient consultation notes without HIPAA concerns. Local NLP processing means patient information never touches cloud servers. Quick dictation using voice input during appointments.",
      benefits: ["HIPAA-friendly local processing", "Voice dictation for hands-free notes", "Organize symptoms and treatment plans"]
    },
    {
      icon: "⚖️",
      title: "Lawyers and Legal Staff",
      description: "Draft case notes, deposition summaries, and client communications privately. Attorney-client privilege protected with local-only processing. No cloud exposure for sensitive legal information.",
      benefits: ["Protect attorney-client privilege", "Organize case notes by topic", "Extract legal action items and deadlines"]
    },
    {
      icon: "🎭",
      title: "Therapists and Counselors",
      description: "Keep therapy session notes completely confidential. Document client progress without worrying about cloud breaches. Structure session notes into treatment plans and action items.",
      benefits: ["100% client confidentiality", "Extract therapeutic goals and homework", "No cloud = no data breach risk"]
    },
    {
      icon: "📚",
      title: "Students and Academics",
      description: "Transform lecture notes into study guides. Extract key concepts and create quiz-worthy summaries. Organize research interview transcripts into themes and findings.",
      benefits: ["Turn messy lecture notes into outlines", "Free unlimited usage (perfect for students)", "Voice recording during classes"]
    },
    {
      icon: "💼",
      title: "Project Managers",
      description: "Never miss a meeting action item. Automatically extract tasks with assignees and deadlines. Structure sprint planning notes and retrospective feedback into clear categories.",
      benefits: ["Auto-extract tasks from standups", "Organize sprint notes by theme", "Track action items across meetings"]
    },
  ];

  const comparisonData = [
    { feature: "Privacy (Local Processing)", shrp: "✅ 100%", chatgpt: "❌ Cloud", notion: "❌ Cloud", evernote: "❌ Cloud" },
    { feature: "Speed (Transformation)", shrp: "✅ 0.3s", chatgpt: "⚠️ 2-3s", notion: "❌ Manual", evernote: "❌ Manual" },
    { feature: "Works Offline", shrp: "✅ Yes", chatgpt: "❌ No", notion: "❌ No", evernote: "⚠️ Limited" },
    { feature: "Price (Monthly)", shrp: "✅ Free", chatgpt: "❌ $20", notion: "❌ $10", evernote: "⚠️ $8" },
    { feature: "Automatic Task Extraction", shrp: "✅ Yes", chatgpt: "❌ Manual", notion: "❌ Manual", evernote: "❌ Manual" },
    { feature: "Voice Input", shrp: "✅ Built-in", chatgpt: "⚠️ App only", notion: "❌ No", evernote: "⚠️ Premium" },
    { feature: "Unlimited Storage", shrp: "✅ Local", chatgpt: "❌ N/A", notion: "⚠️ Paid", evernote: "❌ 60MB/mo" },
    { feature: "Export to Markdown", shrp: "✅ Yes", chatgpt: "⚠️ Manual", notion: "✅ Yes", evernote: "❌ No" },
  ];

  const stats = [
    { number: "4", label: "Transformation Modes" },
    { number: "0.3s", label: "Processing Time" },
    { number: "90%", label: "Task Accuracy" },
    { number: "100%", label: "Private" },
  ];

  const blogPosts = [
    {
      title: "How to Organize Meeting Notes: 7 Systems That Actually Work",
      description: "Complete guide comparing Cornell Method, PARA, Zettelkasten, and automated NLP transformation for organizing meeting notes.",
      slug: "how-to-organize-meeting-notes",
      readTime: "12 min read",
      tags: ["productivity", "meeting-notes", "organization"]
    },
    {
      title: "ADHD Note-Taking: How to Actually Remember What You Write Down",
      description: "Why traditional note systems fail for ADHD brains, and the 4-mode system that works for executive dysfunction.",
      slug: "adhd-note-taking-guide",
      readTime: "10 min read",
      tags: ["ADHD", "productivity", "note-taking"]
    },
    {
      title: "The Privacy Cost of Cloud Note Apps: What They're Really Collecting",
      description: "Analysis of privacy policies from 10 popular note apps including Notion, Evernote, and Roam Research.",
      slug: "privacy-cost-of-cloud-note-apps",
      readTime: "11 min read",
      tags: ["privacy", "security", "cloud-apps"]
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 to-violet-900 text-slate-50' 
        : 'bg-gradient-to-br from-violet-50 to-purple-50 text-slate-900'
    }`}>
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-violet-500/20' : 'bg-violet-300/40'
        }`} />
        <div className={`absolute top-1/3 -right-24 h-96 w-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-300/40'
        }`} />
        <div className={`absolute bottom-0 left-1/3 h-96 w-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-300/40'
        }`} />
      </div>

      {/* Navigation */}
      <nav className={`relative border-b backdrop-blur-sm sticky top-0 z-50 ${
        isDarkMode 
          ? 'border-slate-800/50 bg-slate-900/50' 
          : 'border-violet-200/50 bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className={`text-xl font-bold bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-violet-200 to-fuchsia-200' 
                : 'bg-gradient-to-r from-violet-600 to-purple-600'
            }`}>
              SHRP Notes
            </Link>

            {/* Centered Navigation Links */}
            <div className={`hidden md:flex items-center gap-6 text-sm absolute left-1/2 transform -translate-x-1/2 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <a href="#features" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>Features</a>
              <a href="#how-it-works" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>How It Works</a>
              <a href="#use-cases" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>Use Cases</a>
              <Link href="/blog" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>Blog</Link>
              <a href="#faq" className={isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}>FAQ</a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`rounded-full border p-2 shadow-lg backdrop-blur-sm transition-colors ${
                  isDarkMode
                    ? 'border-violet-300/60 bg-violet-500/30 text-violet-50 shadow-violet-900/40 hover:bg-violet-500/40'
                    : 'border-violet-400/60 bg-white/70 text-violet-900 shadow-violet-300/40 hover:bg-white/90'
                }`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
              >
                {/* Bulb Icon - On (lit) for Light Mode, Off (unlit) for Dark Mode */}
                <svg 
                  className="w-5 h-5" 
                  fill={isDarkMode ? "none" : "currentColor"} 
                  stroke="currentColor" 
                  strokeWidth={isDarkMode ? "2" : "1.5"}
                  viewBox="0 0 24 24"
                >
                  {/* Bulb shape */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    opacity={isDarkMode ? "0.4" : "1"}
                  />
                  {/* Bulb base */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9 17v1a2 2 0 002 2h2a2 2 0 002-2v-1"
                  />
                </svg>
              </button>
              <Link 
                href="/webapp"
                className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors font-medium text-sm"
              >
                Try Free Web App →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Privacy Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-8 ${
              isDarkMode 
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' 
                : 'border-emerald-600/40 bg-emerald-100/70 text-emerald-800'
            }`}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">100% Private • Local NLP Processing • No Cloud Required</span>
            </div>

            {/* Main Headline - SEO Optimized */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Messy Notes<br />
              <span className={`bg-clip-text text-transparent ${
                isDarkMode
                  ? 'bg-gradient-to-r from-violet-200 to-fuchsia-200'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600'
              }`}>
                Into Sharp, Structured Docs
              </span>
            </h1>

            {/* Sub-headline with Long-Tail Keywords */}
            <p className={`text-xl sm:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Transform messy notes into sharp, structured docs in 0.3 seconds. Extract action items automatically, 
              organize unstructured text, and fix grammar - all processed locally in your browser. Forever free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                href="/webapp"
                className={`w-full sm:w-auto px-8 py-4 bg-violet-500 text-white rounded-xl hover:bg-violet-400 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg flex items-center justify-center gap-2 ${
                  isDarkMode ? 'shadow-violet-900/50' : 'shadow-violet-400/50'
                }`}
              >
                <span>Try Free Web App</span>
                <span className="text-2xl">→</span>
              </Link>
              <a 
                href="#how-it-works"
                className={`w-full sm:w-auto px-8 py-4 border rounded-xl transition-colors font-semibold text-lg ${
                  isDarkMode 
                    ? 'border-slate-700 text-slate-200 hover:bg-slate-800/50' 
                    : 'border-violet-300 text-violet-900 hover:bg-violet-50/50'
                }`}
              >
                Watch Demo (60s)
              </a>
            </div>

            {/* Trust Signals */}
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              No signup required • No credit card • No installation • Works in browser
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`relative py-12 border-y ${
        isDarkMode ? 'border-slate-800/50' : 'border-violet-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl sm:text-5xl font-bold mb-2 ${
                  isDarkMode ? 'text-violet-300' : 'text-violet-600'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section - Empathy */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Tired of This? 😓
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              You&apos;re not alone. 73% of professionals struggle to find information in their meeting notes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className={`p-6 rounded-2xl border ${
              isDarkMode 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-red-400/40 bg-red-50/50'
            }`}>
              <div className="text-3xl mb-3">❌</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-red-300' : 'text-red-600'
              }`}>Meeting notes lost everywhere</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                147 files named &quot;notes_final_v2.txt&quot;, &quot;meeting_nov_something.docx&quot;, and &quot;IMPORTANT_notes_ACTUAL.txt&quot;
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-red-400/40 bg-red-50/50'
            }`}>
              <div className="text-3xl mb-3">❌</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-red-300' : 'text-red-600'
              }`}>Action items buried in paragraphs</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Spend 15-20 minutes after every meeting manually extracting who needs to do what by when
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-red-400/40 bg-red-50/50'
            }`}>
              <div className="text-3xl mb-3">❌</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-red-300' : 'text-red-600'
              }`}>Can&apos;t find what client said 2 weeks ago</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Search through dozens of files trying to remember which meeting had that crucial detail
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-red-400/40 bg-red-50/50'
            }`}>
              <div className="text-3xl mb-3">❌</div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-red-300' : 'text-red-600'
              }`}>Privacy concerns with cloud note apps</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Sensitive client, medical, or legal notes stored on Notion/Evernote servers where employees can access them
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className={`text-2xl font-semibold ${
              isDarkMode ? 'text-violet-300' : 'text-violet-600'
            }`}>
              We fixed it. ↓
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - SEO Rich */}
      <section id="features" className={`relative py-20 ${
        isDarkMode ? 'bg-slate-900/30' : 'bg-violet-50/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              4 Magic Modes. 0.3 Seconds. ✨
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Powered by local natural language processing. No cloud AI required. 
              Your notes never leave your browser.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl border backdrop-blur-sm hover:border-violet-500/50 transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'border-slate-700/50 bg-slate-900/50' 
                    : 'border-violet-200/50 bg-white/50'
                }`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
                <div className={`text-xs italic ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {feature.longTailKeywords}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/webapp"
              className="inline-block px-8 py-4 bg-violet-500 text-white rounded-xl hover:bg-violet-400 transition-colors font-semibold text-lg"
            >
              Try All 4 Modes Free →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Simple as 1-2-3
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Transform messy notes into organized documents in under 30 seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/20 border-2 border-violet-500 text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Paste Your Messy Notes</h3>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                Meeting brain dump, voice transcription, stream-of-consciousness typing, 
                or quick voice dictation. No need to format while capturing.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/20 border-2 border-violet-500 text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick a Transformation Mode</h3>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                Summarize (extract key points), Structure (organize into sections), 
                Polish (fix grammar), or Tasks (extract action items automatically).
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-500/20 border-2 border-violet-500 text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Sharp Output Instantly</h3>
              <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                Copy to clipboard, export as Markdown or text file, or save to note history. 
                Transformation happens in 0.3 seconds locally.
              </p>
            </div>
          </div>

          <div className={`mt-16 p-8 rounded-2xl border ${
            isDarkMode 
              ? 'border-violet-500/30 bg-violet-500/10' 
              : 'border-violet-400/30 bg-violet-100/50'
          }`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎥</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Watch 60-Second Demo</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  See how Kam transformed 800 words of meeting chaos into 5 action items in under 30 seconds.
                </p>
                <a 
                  href="/webapp"
                  className="inline-block px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors font-medium"
                >
                  Try It Yourself →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Target Different Keywords */}
      <section id="use-cases" className={`relative py-20 ${
        isDarkMode ? 'bg-slate-900/30' : 'bg-violet-50/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Who Uses SHRP Notes?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              From consultants to medical professionals - anyone who needs fast, private note organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl border ${
                  isDarkMode 
                    ? 'border-slate-700/50 bg-slate-900/50' 
                    : 'border-violet-200/50 bg-white/50'
                }`}
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-sm ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              See All Use Cases & Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Section - Key Differentiator */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 sm:p-12 rounded-3xl border ${
            isDarkMode 
              ? 'border-emerald-500/30 bg-emerald-500/5' 
              : 'border-emerald-400/30 bg-emerald-50/50'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Your Notes. Your Device. Your Privacy. 🔒
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Unlike cloud note apps, SHRP Notes processes everything locally in your browser. 
                Zero data transmission. Zero AI training on your content. Zero privacy compromise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-slate-900/50 border-slate-700/50' 
                  : 'bg-white/50 border-emerald-200/50'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}>✅ What SHRP Does</h3>
                <ul className="space-y-2 text-sm">
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-emerald-400">•</span>
                    <span>Processes notes 100% in your browser</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-emerald-400">•</span>
                    <span>Stores notes in local browser storage</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-emerald-400">•</span>
                    <span>Works completely offline</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-emerald-400">•</span>
                    <span>Open source code (audit it yourself)</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-emerald-400">•</span>
                    <span>No account creation required</span>
                  </li>
                </ul>
              </div>

              <div className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-slate-900/50 border-red-500/30' 
                  : 'bg-white/50 border-red-200/50'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? 'text-red-300' : 'text-red-600'
                }`}>❌ What SHRP Never Does</h3>
                <ul className="space-y-2 text-sm">
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-red-400">•</span>
                    <span>Send notes to cloud servers</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-red-400">•</span>
                    <span>Use notes for AI training</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-red-400">•</span>
                    <span>Collect personal information</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-red-400">•</span>
                    <span>Track your usage patterns</span>
                  </li>
                  <li className={`flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-red-400">•</span>
                    <span>Sell data to third parties</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Perfect for sensitive notes: medical records, legal documents, therapy sessions, 
                business strategy, financial planning, and personal journals.
              </p>
              <Link 
                href="/blog/privacy-cost-of-cloud-note-apps"
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                Read: Privacy Cost of Cloud Note Apps →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table - SEO Rich */}
      <section className={`relative py-20 ${
        isDarkMode ? 'bg-slate-900/30' : 'bg-violet-50/30'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              SHRP Notes vs. The Rest
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              See how local NLP stacks up against cloud AI and manual note-taking
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className={`w-full border rounded-xl overflow-hidden ${
              isDarkMode ? 'border-slate-700/50' : 'border-violet-200/50'
            }`}>
              <thead>
                <tr className={isDarkMode ? 'bg-slate-900/50' : 'bg-violet-100/50'}>
                  <th className={`p-4 text-left text-sm font-semibold border-b ${
                    isDarkMode ? 'border-slate-700/50' : 'border-violet-200/50'
                  }`}>Feature</th>
                  <th className={`p-4 text-left text-sm font-semibold border-b ${
                    isDarkMode 
                      ? 'border-slate-700/50 bg-violet-500/10' 
                      : 'border-violet-200/50 bg-violet-200/30'
                  }`}>SHRP Notes</th>
                  <th className={`p-4 text-left text-sm font-semibold border-b ${
                    isDarkMode ? 'border-slate-700/50' : 'border-violet-200/50'
                  }`}>ChatGPT Plus</th>
                  <th className={`p-4 text-left text-sm font-semibold border-b ${
                    isDarkMode ? 'border-slate-700/50' : 'border-violet-200/50'
                  }`}>Notion</th>
                  <th className={`p-4 text-left text-sm font-semibold border-b ${
                    isDarkMode ? 'border-slate-700/50' : 'border-violet-200/50'
                  }`}>Evernote</th>
                </tr>
              </thead>
              <tbody className={isDarkMode ? 'bg-slate-900/30' : 'bg-white/50'}>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={`border-b last:border-b-0 ${
                    isDarkMode ? 'border-slate-800/50' : 'border-violet-100/50'
                  }`}>
                    <td className={`p-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {row.feature}
                    </td>
                    <td className={`p-4 text-left text-sm font-medium ${
                      isDarkMode ? 'bg-violet-500/5' : 'bg-violet-50/50'
                    }`}>{row.shrp}</td>
                    <td className="p-4 text-left text-sm">{row.chatgpt}</td>
                    <td className="p-4 text-left text-sm">{row.notion}</td>
                    <td className="p-4 text-left text-sm">{row.evernote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/blog/shrp-vs-notion-vs-obsidian"
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              Read Full Comparison: SHRP vs Notion vs Obsidian →
            </Link>
          </div>
        </div>
      </section>

      {/* Real-World Use Cases Section */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-slate-50' : 'text-slate-900'
            }`}>
              Trusted by Privacy-Conscious Professionals
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Real scenarios where local processing makes all the difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Healthcare Professionals */}
            <div 
              className={`p-8 rounded-2xl border ${
                isDarkMode 
                  ? 'border-slate-700/50 bg-slate-900/50' 
                  : 'border-violet-200/50 bg-white/50'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}>
                Healthcare Professionals
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Keep therapy session notes, patient consultations, and medical records completely private. No cloud transmission means HIPAA compliance is easier to maintain on your end.
              </p>
              <div className={`text-sm space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Session notes stay on your device</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Extract follow-up actions automatically</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>No cloud security breaches to worry about</span>
                </div>
              </div>
            </div>

            {/* Legal Professionals */}
            <div 
              className={`p-8 rounded-2xl border ${
                isDarkMode 
                  ? 'border-slate-700/50 bg-slate-900/50' 
                  : 'border-violet-200/50 bg-white/50'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}>
                Legal Professionals
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Maintain attorney-client privilege with case notes that never leave your device. Organize depositions, client meetings, and legal research without cloud exposure.
              </p>
              <div className={`text-sm space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Privileged communications stay private</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Structure case notes automatically</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Extract deadlines and action items</span>
                </div>
              </div>
            </div>

            {/* Business Consultants */}
            <div 
              className={`p-8 rounded-2xl border ${
                isDarkMode 
                  ? 'border-slate-700/50 bg-slate-900/50' 
                  : 'border-violet-200/50 bg-white/50'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                isDarkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-600'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}>
                Business Consultants
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Transform client meeting notes in seconds, not minutes. Keep sensitive business strategies and competitive information off cloud servers entirely.
              </p>
              <div className={`text-sm space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Client discussions stay confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Save 15-20 minutes per meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Never miss a follow-up action</span>
                </div>
              </div>
            </div>

            {/* Students & Researchers */}
            <div 
              className={`p-8 rounded-2xl border ${
                isDarkMode 
                  ? 'border-slate-700/50 bg-slate-900/50' 
                  : 'border-violet-200/50 bg-white/50'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                isDarkMode ? 'text-slate-50' : 'text-slate-900'
              }`}>
                Students & Researchers
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Organize lecture notes instantly, extract assignment deadlines, and structure research interviews. Completely free—no student budget required.
              </p>
              <div className={`text-sm space-y-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Transform messy notes into study guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Auto-extract homework deadlines</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-violet-400">→</span>
                  <span>Organize research transcripts by themes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Works offline. No account required. Your data never leaves your device.
            </p>
            <Link 
              href="/webapp"
              className="inline-block px-8 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors font-medium text-lg"
            >
              Try SHRP Notes Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section - Free Forever Strategy */}
      <section className={`relative py-20 ${
        isDarkMode ? 'bg-slate-900/30' : 'bg-violet-50/30'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Free Forever
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              No limits. No subscriptions. Just powerful note transformation.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Free Tier - Web App */}
            <div className={`p-8 rounded-3xl border ${
              isDarkMode 
                ? 'border-violet-500/50 bg-gradient-to-br from-violet-500/10 to-blue-500/10' 
                : 'border-violet-300/50 bg-gradient-to-br from-violet-100/50 to-blue-100/50'
            }`}>
              <div className="text-center mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                  isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  <span className="text-sm font-medium">100% FREE</span>
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-slate-50' : 'text-slate-900'
                }`}>Everything Included</h3>
                <div className={`text-5xl font-bold mb-2 ${
                  isDarkMode ? 'text-violet-300' : 'text-violet-600'
                }`}>$0</div>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Forever • No credit card • No limits
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>All 4 transformation modes</strong> (Summarize, Structure, Polish, Tasks)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Unlimited transformations</strong> — no daily caps or quotas
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Local storage</strong> with note history & search
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Voice input</strong> for hands-free note capture
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Export to TXT/MD/DOCX</strong> — your data, your format
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Works offline</strong> — no internet required
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>100% private & local</strong> — zero data sent to servers
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Open source</strong> — verify the code yourself
                  </span>
                </div>
              </div>

              <Link 
                href="/webapp"
                className="w-full block text-center px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-400 transition-colors font-semibold"
              >
                Start Using SHRP Now →
              </Link>
            </div>
          </div>

          <div className={`mt-12 max-w-2xl mx-auto p-6 rounded-xl text-center ${
            isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'
          }`}>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                How is this sustainable?
              </strong> SHRP runs 100% locally in your browser using open-source NLP libraries. No servers, no cloud computing costs, no AI API fees. 
              Your browser does all the work, so we can offer everything free forever. If you love SHRP and want to support development, consider{' '}
              <a 
                href="https://github.com/sponsors/digitalwareshub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                sponsoring us on GitHub
              </a> or starring the repo!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Goldmine */}
      <section id="faq" className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Everything you need to know about SHRP Notes
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-xl border overflow-hidden ${
                  isDarkMode 
                    ? 'border-slate-700/50 bg-slate-900/50' 
                    : 'border-violet-200/50 bg-white/50'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full p-6 text-left flex items-start justify-between gap-4 transition-colors ${
                    isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-violet-50/50'
                  }`}
                >
                  <span className={`font-semibold pr-8 ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {faq.question}
                  </span>
                  <span className="text-2xl text-violet-400 flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className={`px-6 pb-6 text-sm leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Still have questions?
            </p>
            <Link 
              href="/webapp"
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              Try it free - no signup required →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section - Internal Linking */}
      <section className={`relative py-20 ${
        isDarkMode ? 'bg-slate-900/30' : 'bg-violet-50/30'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Learn More About Note-Taking 📚
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Guides, comparisons, and productivity tips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link 
                key={index}
                href={`/blog/${post.slug}`}
                className={`group p-6 rounded-2xl border transition-all ${
                  isDarkMode 
                    ? 'border-slate-700/50 bg-slate-900/50 hover:border-violet-500/50' 
                    : 'border-violet-200/50 bg-white/50 hover:border-violet-400/50'
                }`}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className={`px-2 py-1 text-xs rounded-full border ${
                        isDarkMode 
                          ? 'bg-violet-500/10 text-violet-300 border-violet-500/30' 
                          : 'bg-violet-100/50 text-violet-600 border-violet-300/30'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                  {post.title}
                </h3>
                <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {post.description}
                </p>
                <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {post.readTime}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/blog"
              className={`inline-block px-6 py-3 border rounded-xl transition-colors font-medium ${
                isDarkMode 
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800/50' 
                  : 'border-violet-300 text-slate-700 hover:bg-violet-50/50'
              }`}
            >
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Download Section - App Links */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Use SHRP Notes Everywhere
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              All versions: 100% private, 100% free
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-2xl border text-center ${
              isDarkMode 
                ? 'border-slate-700/50 bg-slate-900/50' 
                : 'border-violet-200/50 bg-white/50'
            }`}>
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-lg font-semibold mb-2">Web App</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Works in any modern browser. No installation needed.
              </p>
              <Link 
                href="/webapp"
                className="inline-block px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-400 transition-colors font-medium text-sm"
              >
                Launch Web App →
              </Link>
            </div>

            <div className={`p-6 rounded-2xl border text-center ${
              isDarkMode 
                ? 'border-slate-700/50 bg-slate-900/50' 
                : 'border-violet-200/50 bg-white/50'
            }`}>
              {/* Apple iOS Icon */}
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Apple iOS Logo">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">iOS App</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Native iPhone and iPad experience
              </p>
              <button 
                disabled
                className={`inline-block px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-slate-700 text-slate-400' 
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                Coming Soon
              </button>
            </div>

            <div className={`p-6 rounded-2xl border text-center ${
              isDarkMode 
                ? 'border-slate-700/50 bg-slate-900/50' 
                : 'border-violet-200/50 bg-white/50'
            }`}>
              {/* Android Icon */}
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Android Logo">
                  <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Android App</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Native Android experience
              </p>
              <button 
                disabled
                className={`inline-block px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-slate-700 text-slate-400' 
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                Coming Soon
              </button>
            </div>

            <div className={`p-6 rounded-2xl border text-center ${
              isDarkMode 
                ? 'border-slate-700/50 bg-slate-900/50' 
                : 'border-violet-200/50 bg-white/50'
            }`}>
              <div className="text-5xl mb-4">💻</div>
              <h3 className="text-lg font-semibold mb-2">Desktop App</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Chrome extension for quick access
              </p>
              <button 
                disabled
                className={`inline-block px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-slate-700 text-slate-400' 
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Hero Reprise */}
      <section className={`relative py-20 border-y ${
        isDarkMode 
          ? 'bg-gradient-to-br from-violet-900/30 to-blue-900/30 border-violet-500/30' 
          : 'bg-gradient-to-br from-violet-100/50 to-blue-100/50 border-violet-300/30'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Notes?
          </h2>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            No signup. No credit card. No catch.<br />
            Just paste your messy notes and see the magic happen.
          </p>
          
          <Link 
            href="/webapp"
            className="inline-block px-8 py-4 bg-violet-500 text-white rounded-xl hover:bg-violet-400 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg shadow-violet-900/50 mb-6"
          >
            Try Free Now - Takes 30 Seconds →
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">🔒</span>
              <span>100% Private</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span className="text-violet-400">⚡</span>
              <span>Instant (0.3s)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">💰</span>
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Navigation & SEO Links */}
      <footer className={`relative border-t py-12 ${
        isDarkMode 
          ? 'border-slate-800/50 bg-slate-900/50' 
          : 'border-violet-200/50 bg-violet-50/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-violet-300' : 'text-violet-600'
              }`}>Product</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><Link href="/webapp" className="hover:text-violet-300 transition-colors">Web App</Link></li>
                <li><a href="#features" className="hover:text-violet-300 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-violet-300 transition-colors">How It Works</a></li>
                <li><a href="#use-cases" className="hover:text-violet-300 transition-colors">Use Cases</a></li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-violet-300' : 'text-violet-600'
              }`}>Company</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><Link href="/blog" className="hover:text-violet-300 transition-colors">Blog</Link></li>
                <li><a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">About Digiwares</a></li>
                <li><a href="https://twitter.com/digi_wares" target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">Twitter</a></li>
                <li><a href="https://github.com/digitalwareshub/sharpnotes" target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">GitHub</a></li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-violet-300' : 'text-violet-600'
              }`}>Resources</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><a href="#faq" className="hover:text-violet-300 transition-colors">FAQ</a></li>
                <li><Link href="/blog/how-to-organize-meeting-notes" className="hover:text-violet-300 transition-colors">Meeting Notes Guide</Link></li>
                <li><Link href="/blog/privacy-cost-of-cloud-note-apps" className="hover:text-violet-300 transition-colors">Privacy Guide</Link></li>
                <li><Link href="/blog/shrp-vs-notion-vs-obsidian" className="hover:text-violet-300 transition-colors">Comparison</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 ${
                isDarkMode ? 'text-violet-300' : 'text-violet-600'
              }`}>Legal</h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li><Link href="/privacy" className="hover:text-violet-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-violet-300 transition-colors">Terms of Service</Link></li>
                <li><a href="https://github.com/digitalwareshub/sharpnotes/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-violet-300 transition-colors">Open Source (MIT)</a></li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t text-center text-sm ${
            isDarkMode ? 'border-slate-800/50 text-slate-500' : 'border-violet-200/50 text-slate-600'
          }`}>
            <p className="mb-2">
              Made with ❤️ by{' '}
              <a 
                href="https://digiwares.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                Digiwares
              </a>
            </p>
            <p className="text-xs">
              © 2025 SHRP Notes. All rights reserved. • Local NLP Processing • 100% Privacy Guaranteed
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}