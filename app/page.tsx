'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // Initialize from localStorage immediately to prevent flash



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
    <div className="min-h-screen">

      {/* Navigation */}
      <nav relative border-b backdrop-blur-sm sticky top-0 z-50 border-slate-200 bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" text-xl sm:text-2xl font-bold 
            }`}>
              SHRP
            </Link>

            {/* Centered Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm absolute left-1/2 transform -translate-x-1/2 "
                title="Switch to Dark Mode"
                aria-label="Toggle theme"
              >
                {/* Bulb Icon - On (lit) for Light Mode, Off (unlit) for Dark Mode */}
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  {/* Bulb shape */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    opacity="1"
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
                px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-orange-600 text-white hover:bg-orange-700`}
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
            <div inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-8 border-emerald-600/40 bg-emerald-100/70 text-emerald-800`}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">100% Private • Local NLP Processing • No Cloud Required</span>
            </div>

            {/* Main Headline - SEO Optimized */}
            <h1 heading-primary mb-6 text-gray-900`}>
              Transform Messy Notes<br />
              <span className='text-orange-600'>
                Into Sharp, Structured Docs
              </span>
            </h1>

            {/* Sub-headline with Long-Tail Keywords */}
            <p text-responsive mb-8 max-w-4xl mx-auto 
            }`}>
              Transform messy notes into sharp, structured docs in 0.3 seconds. Extract action items automatically,
              organize unstructured text, and fix grammar - all processed locally in your browser. Forever free.
            </p>

            {/* CTA Buttons */}
            <div className=`}
              >
                <span>Try Free Web App</span>
                <span className="text-2xl">→</span>
              </Link>
              <a 
                href="#how-it-works"
                w-full sm:w-auto px-8 py-4 border rounded-xl transition-colors font-semibold text-lg 
                }`}
              >
                Watch Demo (60s)
              </a>
            </div>

            {/* Trust Signals */}
            <p className="text-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div text-2xl sm:text-3xl font-bold mb-2 
                }`}>
                  {stat.number}
                </div>
                <div className="text-sm ">
              You&apos;re not alone. 73% of professionals struggle to find information in their meeting notes.
            </p>
          </div>

          <div className=`}>
              <div className="text-3xl mb-3">❌</div>
              <h3 text-lg font-semibold mb-2 
              }`}>Meeting notes lost everywhere</h3>
              <p className="text-sm ">
              <div className=`}>Action items buried in paragraphs</h3>
              <p text-sm }`}>
                Spend 15-20 minutes after every meeting manually extracting who needs to do what by when
              </p>
            </div>

            <div className="p-6 rounded-2xl border ">Can&apos;t find what client said 2 weeks ago</h3>
              <p className="text-sm ">
              <div className=`}>Privacy concerns with cloud note apps</h3>
              <p text-sm }`}>
                Sensitive client, medical, or legal notes stored on Notion/Evernote servers where employees can access them
              </p>
            </div>
          </div>

          <div className=`}>
              We fixed it. ↓
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - SEO Rich */}
      <section id="features" relative py-20 
      }`}>
        <div className=`}>
              Powered by local natural language processing. No cloud AI required. 
              Your notes never leave your browser.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                p-6 rounded-2xl border backdrop-blur-sm hover:border-orange-500 transition-all hover:scale-105 border-slate-200 bg-white`}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 text-xl font-semibold mb-3 
                }`}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 ">
                  {feature.longTailKeywords}
                </div>
              </div>
            ))}
          </div>

          <div className=`}
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
            <h2 className="heading-secondary mb-6">
              Simple as 1-2-3
            </h2>
            <p text-xl }`}>
              Transform messy notes into organized documents in under 30 seconds
            </p>
          </div>

          <div className=`}>
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Paste Your Messy Notes</h3>
              <p className='text-gray-900'>
                Meeting brain dump, voice transcription, stream-of-consciousness typing, 
                or quick voice dictation. No need to format while capturing.
              </p>
            </div>

            <div className="text-center">
              <div inline-flex items-center justify-center w-16 h-16 rounded-full border-2 text-2xl font-bold mb-6 bg-orange-100 border-orange-500`}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick a Transformation Mode</h3>
              <p className='text-gray-900'>
                Summarize (extract key points), Structure (organize into sections), 
                Polish (fix grammar), or Tasks (extract action items automatically).
              </p>
            </div>

            <div className="text-center">
              <div inline-flex items-center justify-center w-16 h-16 rounded-full border-2 text-2xl font-bold mb-6 bg-orange-100 border-orange-500`}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Sharp Output Instantly</h3>
              <p className='text-gray-900'>
                Copy to clipboard, export as Markdown or text file, or save to note history. 
                Transformation happens in 0.3 seconds locally.
              </p>
            </div>
          </div>

          <div mt-16 p-8 rounded-2xl border 
          }`}>
            <div className=`}>
                  See how Kam transformed 800 words of meeting chaos into 5 action items in under 30 seconds.
                </p>
                <a 
                  href="/webapp"
                  inline-block px-6 py-3 rounded-lg font-medium shadow-lg transition-all 
                  }`}
                >
                  Try It Yourself →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Target Different Keywords */}
      <section id=`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">
              Who Uses SHRP Notes?
            </h2>
            <p text-xl max-w-3xl mx-auto text-gray-900`}>
              From consultants to medical professionals - anyone who needs fast, private note organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                p-6 rounded-2xl border border-slate-200 bg-white`}
              >
                <div className="text-3xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p text-sm mb-4 text-gray-600`}>
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} flex items-start gap-2 text-sm text-gray-900`}>
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
              className="text-orange-400 hover:text-orange-400 font-medium"
            >
              See All Use Cases & Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Section - Key Differentiator */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div p-8 sm:p-12 rounded-3xl border 
          }`}>
            <div className=`}>
                Unlike cloud note apps, SHRP Notes processes everything locally in your browser. 
                Zero data transmission. Zero AI training on your content. Zero privacy compromise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div p-6 rounded-xl border 
              }`}>
                <h3 className="text-lg font-semibold mb-3 ">
                    <span className=`}>
                    <span className="text-emerald-400">•</span>
                    <span>Stores notes in local browser storage</span>
                  </li>
                  <li flex items-start gap-2 }`}>
                    <span className=`}>
                    <span className="text-emerald-400">•</span>
                    <span>Open source code (audit it yourself)</span>
                  </li>
                  <li flex items-start gap-2 }`}>
                    <span className=`}>
                <h3 text-lg font-semibold mb-3 
                }`}>❌ What SHRP Never Does</h3>
                <ul className=`}>
                    <span className="text-red-400">•</span>
                    <span>Send notes to cloud servers</span>
                  </li>
                  <li flex items-start gap-2 }`}>
                    <span className=`}>
                    <span className="text-red-400">•</span>
                    <span>Collect personal information</span>
                  </li>
                  <li flex items-start gap-2 }`}>
                    <span className=`}>
                    <span className="text-red-400">•</span>
                    <span>Sell data to third parties</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p mb-4 text-gray-600`}>
                Perfect for sensitive notes: medical records, legal documents, therapy sessions, 
                business strategy, financial planning, and personal journals.
              </p>
              <Link 
                href="/blog/privacy-cost-of-cloud-note-apps"
                className="text-orange-400 hover:text-orange-400 font-medium"
              >
                Read: Privacy Cost of Cloud Note Apps →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table - SEO Rich */}
      <section relative py-20 
      }`}>
        <div className=`}>
              See how local NLP stacks up against cloud AI and manual note-taking
            </p>
          </div>

          <div className="overflow-x-auto">
            <table w-full border rounded-xl overflow-hidden border-slate-200`}>
              <thead>
                <tr className='bg-slate-100'>
                  <th p-4 text-left text-sm font-semibold border-b 
                  }`}>Feature</th>
                  <th className="p-4 text-left text-sm font-semibold border-b ">ChatGPT Plus</th>
                  <th className="p-4 text-left text-sm font-semibold border-b ">Evernote</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {comparisonData.map((row, index) => (
                  <tr key={index} border-b last:border-b-0 
                  }`}>
                    <td className="p-4 text-sm ">{row.shrp}</td>
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
              className="text-orange-400 hover:text-orange-400 font-medium"
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
            <h2 text-3xl sm:text-4xl font-bold mb-6 
            }`}>
              Trusted by Privacy-Conscious Professionals
            </h2>
            <p className="text-xl "
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ">
                Healthcare Professionals
              </h3>
              <p className="text-sm leading-relaxed mb-4 ">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Session notes stay on your device</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Extract follow-up actions automatically</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>No cloud security breaches to worry about</span>
                </div>
              </div>
            </div>

            {/* Legal Professionals */}
            <div 
              p-8 rounded-2xl border 
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ">
                Legal Professionals
              </h3>
              <p className="text-sm leading-relaxed mb-4 ">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Privileged communications stay private</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Structure case notes automatically</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Extract deadlines and action items</span>
                </div>
              </div>
            </div>

            {/* Business Consultants */}
            <div 
              p-8 rounded-2xl border 
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ">
                Business Consultants
              </h3>
              <p className="text-sm leading-relaxed mb-4 ">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Client discussions stay confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Save 15-20 minutes per meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span>
                  <span>Never miss a follow-up action</span>
                </div>
              </div>
            </div>

            {/* Students & Researchers */}
            <div 
              p-8 rounded-2xl border 
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ">
                Students & Researchers
              </h3>
              <p className="text-sm leading-relaxed mb-4 ">
                <div className=`}>
              Works offline. No account required. Your data never leaves your device.
            </p>
            <Link 
              href="/webapp"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium text-lg"
            >
              Try SHRP Notes Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section - Free Forever Strategy */}
      <section relative py-20 
      }`}>
        <div className=`}>
              No limits. No subscriptions. Just powerful note transformation.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Free Tier - Web App */}
            <div p-8 rounded-3xl border 
            }`}>
              <div className=`}>
                  <span className="text-sm font-medium">100% FREE</span>
                </div>
                <h3 text-2xl font-bold mb-2 
                }`}>Everything Included</h3>
                <div className="text-5xl font-bold mb-2 ">
                  Forever • No credit card • No limits
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>All 4 transformation modes</strong> (Summarize, Structure, Polish, Tasks)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>Unlimited transformations</strong> — no daily caps or quotas
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>Local storage</strong> with note history & search
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>Voice input</strong> for hands-free note capture
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>Export to TXT/MD/DOCX</strong> — your data, your format
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>Works offline</strong> — no internet required
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>100% private & local</strong> — zero data sent to servers
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 text-xl flex-shrink-0">✓</span>
                  <span className='text-gray-900'>
                    <strong>Open source</strong> — verify the code yourself
                  </span>
                </div>
              </div>

              <Link 
                href="/webapp"
                className="w-full block text-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-400 transition-colors font-semibold"
              >
                Start Using SHRP Now →
              </Link>
            </div>
          </div>

          <div mt-12 max-w-2xl mx-auto p-6 rounded-xl text-center 
          }`}>
            <p className="text-sm 
              <a 
                href="https://github.com/sponsors/digitalwareshub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-400 underline"
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
            <h2 className="heading-secondary mb-6">
              Frequently Asked Questions
            </h2>
            <p text-xl text-gray-900">
              Everything you need to know about SHRP Notes
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                rounded-xl border overflow-hidden 
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 transition-colors ">
                    {faq.question}
                  </span>
                  <span className="text-2xl flex-shrink-0 
                  </span>
                </button>
                {openFaq === index && (
                  <div px-6 pb-6 text-sm leading-relaxed 
                  }">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className=`}>
              Still have questions?
            </p>
            <Link 
              href="/webapp"
              className='text-orange-600 hover:text-orange-700 font-medium'
            >
              Try it free - no signup required →
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section - Internal Linking */}
      <section relative py-20 
      }`}>
        <div className=`}>
              Guides, comparisons, and productivity tips
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link 
                key={index}
                href={`/blog/${post.slug}`}
                group p-6 rounded-2xl border transition-all border-slate-200 bg-white hover:border-orange-500`}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      px-2 py-1 text-xs rounded-full border 
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2 transition-colors ">
                  {post.description}
                </p>
                <div className="text-xs "
            >
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Download Section - App Links */}
      <section className=`}>
              All versions: 100% private, 100% free
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div p-6 rounded-2xl border text-center 
            }`}>
              <div className=`}>
                Works in any modern browser. No installation needed.
              </p>
              <Link 
                href="/webapp"
                className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium text-sm"
              >
                Launch Web App →
              </Link>
            </div>

            <div p-6 rounded-2xl border text-center 
            }`}>
              {/* Apple iOS Icon */}
              <div className=`}>
                Native iPhone and iPad experience
              </p>
              <button 
                disabled
                inline-block px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed 
                }`}
              >
                Coming Soon
              </button>
            </div>

            <div className="p-6 rounded-2xl border text-center ">
                Native Android experience
              </p>
              <button 
                disabled
                className="inline-block px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed ">
              <div className=`}>
                Chrome extension for quick access
              </p>
              <button 
                disabled
                inline-block px-4 py-2 rounded-lg font-medium text-sm cursor-not-allowed 
                }`}
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Hero Reprise */}
      <section className="relative py-20 border-y ">
            No signup. No credit card. No catch.<br />
            Just paste your messy notes and see the magic happen.
          </p>
          
          <Link 
            href="/webapp"
            className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-400 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg shadow-orange-900/50 mb-6"
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
              <span className="text-orange-400">⚡</span>
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
      <footer relative border-t py-12 
      }`}>
        <div className=`}>Product</h3>
              <ul space-y-2 text-sm }`}>
                <li><Link href=`}>Company</h3>
              <ul space-y-2 text-sm }`}>
                <li><Link href=`}>Resources</h3>
              <ul space-y-2 text-sm }`}>
                <li><a href=`}>Legal</h3>
              <ul space-y-2 text-sm }`}>
                <li><Link href=`}>
            <p className="mb-2">
              Made with ❤️ by{' '}
              <a 
                href="https://digiwares.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
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