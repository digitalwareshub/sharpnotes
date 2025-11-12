# SHRP Notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/digitalwareshub/sharpnotes/pulls)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://shrp.app)

**Turn messy notes into sharp docs — powered by natural language processing.**

SHRP Notes is a client-side note transformation tool that uses NLP (Natural Language Processing) to restructure your messy brain dumps into clean summaries, outlines, polished drafts, or actionable task lists. Everything happens in your browser with complete privacy.

🔗 **[Try Live Demo](https://shrp.app)** | 📖 **[Documentation](#-features)** | 🐛 **[Report Bug](https://shrp.app/report)** | 💡 **[Request Feature](https://shrp.app/report)**

![SHRP Notes Screenshot](./public/screenshot.png) <!-- Add screenshot later -->

## ✨ Features

### 🧠 **NLP-Powered Transformations**
- **Summarize**: Extract key people, places, dates, numbers, and important points automatically
- **Structure**: Organize messy paragraphs into clear sections with smart topic detection
- **Polish**: Fix typos, grammar, contractions, and improve readability
- **Tasks**: Extract actionable items with associated people and deadlines

### 🔒 **Privacy-First**
- 💾 **100% Local Processing** - Uses [compromise.js](https://github.com/spencermountain/compromise) for client-side NLP
- 🚫 **No Cloud APIs** - No OpenAI, no external services, no data leaves your browser
- ♾️ **Unlimited Storage** - Everything stored locally, no server limits
- 🔐 **Truly Private** - Perfect for sensitive notes (medical, legal, personal)

### ⚡ **Developer-Friendly**
- ⌨️ **Keyboard Shortcuts** - Power user friendly (Cmd+Enter, Cmd+S, Cmd+E, Cmd+K)
- 🎙️ **Voice Input** - Speak your notes (Web Speech API)
- 🔍 **Smart History** - Search, filter, favorite, and pin notes
- 📤 **Export Options** - Download as TXT/MD or copy to clipboard
- 🎯 **Auto-Save** - Never lose work (saves every 30 seconds)
- 📊 **Analytics Ready** - Google Analytics + Vercel Analytics integrated

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/digitalwareshub/sharpnotes.git

# Navigate to project
cd sharpnotes

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **NLP**: [Compromise.js](https://github.com/spencermountain/compromise) + plugins (dates, numbers)
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Storage**: Browser localStorage
- **Notifications**: react-hot-toast
- **Analytics**: Google Analytics + Vercel Analytics

## 🧪 How It Works

SHRP Notes uses **compromise.js** for natural language understanding:

### Summarize Mode
```typescript
// Extracts entities and scores sentences by importance
- Identifies people, places, organizations
- Detects dates and numbers
- Scores sentences based on entity density
- Returns top 30% of most important sentences
```

### Structure Mode
```typescript
// Organizes content into logical sections
- Detects questions and converts to headers
- Groups sentences by topic similarity
- Creates hierarchical bullet points
- Merges related content
```

### Polish Mode
```typescript
// Fixes common writing issues
- Corrects 40+ contractions (dont → don't)
- Fixes 25+ common typos (teh → the)
- Capitalizes proper nouns using NLP
- Ensures proper sentence punctuation
- Improves spacing and formatting
```

### Tasks Mode
```typescript
// Extracts actionable items intelligently
- Detects action verbs and task indicators
- Extracts associated people using NLP
- Identifies dates and deadlines
- Formats as checkbox list with metadata
```

## 🎯 Use Cases

- 📝 **Meeting Notes** - Extract action items and key decisions
- 🎓 **Student Notes** - Organize lecture notes into study guides
- 💼 **Professional** - Clean up client communications
- 📰 **Content Creation** - Structure blog post drafts
- 🧘 **Journaling** - Organize daily reflections
- 🩺 **Medical Notes** - Keep patient notes private and organized
- ⚖️ **Legal Notes** - Draft summaries without cloud exposure

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

### Project Structure

```
sharpnotes/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Landing page
│   ├── webapp/            # Main note transformation app
│   ├── blog/              # Blog articles
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   └── report/            # Bug/feature reporting
├── components/            # React components
│   ├── notes/             # Note-related components
│   └── ui/                # Reusable UI components
├── lib/                   # Core libraries
│   ├── transformers/      # NLP transformation logic
│   ├── storage/           # localStorage management
│   └── analytics.ts       # Analytics tracking
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 📝 Roadmap

### Phase 1 (Current - MVP) ✅
- [x] NLP-powered transformations (compromise.js)
- [x] Local storage with unlimited notes
- [x] Note history with search
- [x] Keyboard shortcuts
- [x] Export functionality
- [x] Auto-save
- [x] Voice input
- [x] Pin & favorite notes

### Phase 2 (Planned)
- [ ] Template library (meeting notes, daily standup, etc.)
- [ ] Batch operations (merge notes, find duplicates)
- [ ] Advanced export (PDF with styling)
- [ ] Browser extension (quick capture)
- [ ] Custom transformation rules
- [ ] Note tagging system
- [ ] Dark/light theme toggle
- [ ] Markdown editor mode

### Phase 3 (Future)
- [ ] Optional AI enhancement (GPT-4o-mini) for premium users
- [ ] Cloud sync (optional, encrypted)
- [ ] Collaboration features
- [ ] Mobile apps (iOS/Android)
- [ ] Integration with calendar/email

## 🤝 Contributing

We love contributions! SHRP Notes is open source and welcomes pull requests, bug reports, and feature suggestions.

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sharpnotes.git
   cd sharpnotes
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make your changes and commit**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your changes

### Contribution Guidelines

- **Code Style**: Follow existing TypeScript/React patterns
- **Commits**: Use clear, descriptive commit messages
- **Testing**: Test your changes locally before submitting
- **Documentation**: Update README if adding new features
- **Privacy**: Never add cloud dependencies or external API calls

### Areas We Need Help With

- 🌐 **Internationalization**: Translate UI to other languages
- 📱 **Mobile Apps**: Help build iOS/Android apps with Capacitor
- 🎨 **Design**: Improve UI/UX and create marketing materials
- 📝 **Documentation**: Write tutorials and guides
- 🐛 **Bug Fixes**: Check the [Issues](https://github.com/digitalwareshub/sharpnotes/issues) tab
- ✨ **Features**: Implement items from the roadmap

### Code of Conduct

Be respectful, inclusive, and constructive. We're building this together!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ Liability and warranty not provided

## 🌟 Star History

If you find SHRP Notes useful, please consider giving it a star on GitHub! It helps others discover the project.

[![Star History Chart](https://api.star-history.com/svg?repos=digitalwareshub/sharpnotes&type=Date)](https://star-history.com/#digitalwareshub/sharpnotes&Date)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- NLP powered by [Compromise.js](https://github.com/spencermountain/compromise)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from emoji unicode
- Inspired by the need for quick, private note organization

## 🔬 Why No AI APIs?

SHRP Notes deliberately uses rule-based NLP instead of cloud AI services:

**Privacy**: Your notes never leave your browser. No API calls = no data exposure.

**Cost**: Zero ongoing costs. No per-request API fees to pass to users.

**Speed**: Instant processing. No network latency or rate limits.

**Offline**: Works without internet. Perfect for airplanes, cafes, secure environments.

**Transparency**: Open source NLP logic. You can see exactly how text is processed.

For 80% of note-taking use cases, compromise.js provides sufficient intelligence without sacrificing privacy or requiring payment.

## 📧 Contact

Digiwares - [@digi_wares](https://twitter.com/digi_wares) - https://digiwares.xyz

Project Link: [https://github.com/digitalwareshub/sharpnotes](https://github.com/digitalwareshub/sharpnotes)

Live Demo: [https://shrp.app](https://shrp.app)

---

**Made with ❤️ by developers, for developers**

*Privacy-first. NLP-powered. Forever free.*