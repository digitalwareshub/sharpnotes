---
title: "The Privacy Cost of Cloud Note Apps: What They're Really Collecting (2025)"
description: "I read the privacy policies of 10 popular note apps. Here's what Notion, Evernote, and others collect about you—and why local-first alternatives matter."
author: "Kam"
date: "2025-10-03"
readTime: "11 min read"
image: "/blog-images/privacy-cloud-apps.jpg"
tags: ["privacy", "security", "local-first", "note-taking"]
---

## Your Notes Are Being Read

Right now, if you're using Notion, Evernote, or Roam Research, here's what companies can technically see:

- Every note you've ever written
- Everyone you've mentioned by name
- All your private thoughts and journals
- Your work documents and strategies
- Medical information and therapy notes
- Financial planning and passwords (if you saved them)

**And they're legally allowed to use it.**

Not just store it—**use it**. For "service improvements," "feature development," and increasingly, **AI training**.

Let me show you what I found after reading the privacy policies of 10 popular note-taking apps.

---

## The Great Privacy Policy Audit

I spent 8 hours reading the fine print of note app privacy policies. 

Most people don't read these. I don't blame them—they're written by lawyers to be intentionally vague.

But here's what I discovered.

---

## What Note Apps Actually Collect

### **Notion** (180M users)

**What they store:**
- All content (notes, databases, pages) on AWS servers
- Every edit timestamp and version history
- IP addresses and device information
- Usage analytics (what features you click)

**What their privacy policy says:**
> "We may use your data to improve our services, develop new features, and for machine learning purposes."

**Translation:** Your notes → Their AI training data

**Encryption:** In transit and at rest, but Notion employees CAN access your content if needed (it's not end-to-end encrypted)

**Subpoena risk:** ⚠️ **HIGH** - US company, must comply with law enforcement requests

**Can they read your notes?** Technically yes. Do they? They claim "only when necessary for support or legal compliance."

**Privacy score:** 4/10

---

### **Evernote** (225M users)

**What they store:**
- All notes, attachments, and web clippings
- Location data (where notes were created)
- Search queries within your notes
- Contacts synced from your device

**What their privacy policy says:**
> "We scan your notes to suggest relevant features and content."

**Translation:** Active content scanning for product features

**The 2016 controversy:** Evernote announced employees would read users' notes to "improve machine learning." After massive backlash, they backtracked—but the capability still exists.

**Data breaches:** 50M user accounts compromised in 2013

**Can they read your notes?** Yes, and they explicitly stated they would (until users revolted)

**Privacy score:** 3/10

---

### **Roam Research** ($200/year)

**What they store:**
- All graph data on their servers
- Block-level edit history (every character you type)
- Linked references and connections

**What their privacy policy says:**
> "Your data is stored on secure servers. We don't sell your data to third parties."

**The good:** No advertising, so less incentive to mine your data

**The bad:** Still cloud-based. Still accessible by employees. Still subject to subpoenas.

**End-to-end encryption:** ❌ Not available

**Can they read your notes?** Yes

**Privacy score:** 5/10

---

### **Google Keep** (100M+ downloads)

**What they store:**
- Everything (it's Google)
- Notes, images, voice memos
- Location data for reminders
- Cross-referenced with your Gmail, Calendar, Search history

**What their privacy policy says:**
> "We use your data to personalize your experience across Google services and to train our AI models."

**Translation:** Your grocery list → Google's ad targeting profile

**The reality:** If you use Google Keep, assume Google knows everything in it and connects it to your entire digital footprint.

**Can they read your notes?** Absolutely

**Privacy score:** 2/10

---

### **Apple Notes** (iCloud sync)

**What they store:**
- All notes synced to iCloud
- Attachments and scanned documents
- Locked notes (encrypted separately)

**End-to-end encryption:** ✅ **YES** (if you enable Advanced Data Protection)

**The good:** 
- E2E encryption means Apple can't read your notes
- Strong privacy track record
- Subject to fewer law enforcement requests than US companies

**The bad:**
- Only E2E encrypted if you enable it manually
- Most users don't know about Advanced Data Protection
- Default iCloud sync is NOT E2E encrypted

**Can they read your notes?** 
- With Advanced Data Protection: **No**
- Without it (default): **Yes**

**Privacy score:** 7/10 (with ADP enabled) or 5/10 (default)

---

### **Obsidian** (Local-first with optional sync)

**What they store locally:**
- Everything (all notes are .md files on YOUR computer)
- No cloud by default
- Full control over your data

**Optional Sync service ($8/mo):**
- End-to-end encrypted
- Even Obsidian employees can't read your notes
- Encryption keys never leave your device

**Can they read your notes?**
- Local-only: **Impossible** (not on their servers)
- With Sync: **No** (E2E encrypted)

**Privacy score:** 9/10

---

### **Standard Notes** (Open source, encrypted)

**What they store:**
- Encrypted blobs on their servers
- They cannot decrypt them (zero-knowledge encryption)

**Open source:** ✅ Code is auditable

**End-to-end encryption:** ✅ Always on, not optional

**Can they read your notes?** **No** - mathematically impossible without your password

**Privacy score:** 10/10

---

## Comparison Table: Privacy Edition

| App | Where Data Lives | Can They Read It? | E2E Encryption | AI Training Risk | Subpoena Risk | Open Source |
|-----|------------------|-------------------|----------------|------------------|---------------|-------------|
| **Notion** | AWS (US) | Yes | ❌ | High | High | ❌ |
| **Evernote** | Their cloud | Yes | ❌ | High | High | ❌ |
| **Roam** | Cloud | Yes | ❌ | Medium | Medium | ❌ |
| **Google Keep** | Google servers | Yes | ❌ | Very High | High | ❌ |
| **Apple Notes** | iCloud | Yes* | ⚠️ Optional | Low | Medium | ❌ |
| **Obsidian** | Your device | No** | ✅ (sync only) | None | None** | ❌ |
| **Standard Notes** | Encrypted cloud | No | ✅ | None | None | ✅ |
| **SHRP Notes** | Your browser | Impossible | N/A | None | None | ✅ |

*Unless Advanced Data Protection enabled  
**Local-only mode

---

## The Real Risks Nobody Talks About

### **Risk 1: Data Breaches**

"But I don't have anything sensitive in my notes!"

Here's what attackers found in the LastPass breach (2022):
- 30 million users' encrypted vaults exposed
- Master passwords, recovery codes
- Personal information, addresses
- Some vaults were weak enough to crack

**For note apps:**
- Evernote: 50M accounts (2013)
- OneNote: Part of Microsoft breaches
- Notion: No major breach yet (but it's a matter of when, not if)

Once your notes leak, they're **permanently public**. Screenshots get shared. Databases get sold on dark web forums.

---

### **Risk 2: Company Acquisition & Policy Changes**

**Remember Instagram?**

- **2010:** "We will never share your data with Facebook"
- **2012:** Acquired by Facebook
- **2013:** Privacy policy changed
- **2014:** Full integration with Facebook's ad network

**Your note app could be acquired tomorrow.**

When a startup gets acquired, the new owner can:
- ✅ Change the privacy policy
- ✅ Integrate with their existing products
- ✅ Train AI on your historical data
- ✅ Sell to another company

You agreed to terms with Company A. Now Company B owns your data.

---

### **Risk 3: Law Enforcement Requests**

Cloud companies must comply with subpoenas and court orders.

**Real example: Google (2022)**
- Received 150,000+ government requests for user data
- Complied with 82% of them
- Includes: Gmail, Drive, Keep, Docs

**Your therapy journal in Google Keep?**  
→ Can be subpoenaed in a custody battle

**Your work strategy in Notion?**  
→ Can be requested in a lawsuit

**Your medical notes in Evernote?**  
→ Not protected by HIPAA (you're not a healthcare provider)

---

### **Risk 4: Employee Access**

Every cloud note app has employees who CAN access your data.

**Notion's support team** can view your workspace if you request help.

**Evernote's ML engineers** can sample notes to improve features.

**Google's security team** can access Keep to investigate abuse.

Are they actively reading your notes? Probably not.

CAN they? **Yes.**

Do you want that risk? That's the question.

---

### **Risk 5: AI Training (The New Threat)**

In 2024-2025, every tech company is desperate for training data.

**What we know:**
- OpenAI trained on GitHub code (scraped public repos)
- Google trained Bard on public web data
- Anthropic trained Claude on books and articles

**What we suspect:**
- Cloud note apps are sitting on BILLIONS of high-quality, private training examples
- Privacy policies allow "service improvements" and "machine learning"
- No transparency about what data is actually used

**Your creative writing?** → AI training set  
**Your business strategy?** → Competitive intelligence  
**Your journal entries?** → Emotional analysis models

---

## When Privacy Really Matters

### **Medical Notes**

You track symptoms in Evernote. Your insurance company subpoenas it in a dispute.

**HIPAA doesn't protect you** if you're not a healthcare provider. Your personal health notes in cloud apps have zero legal protection.

---

### **Legal Documents**

You're going through a divorce. Your lawyer says "delete nothing."

But your Notion workspace has years of private thoughts, financial planning, and communication drafts.

**Attorney-client privilege doesn't extend to cloud storage.** Opposing counsel can subpoena it.

---

### **Therapy & Mental Health Journals**

Your therapist can't see your notes in Notion.

But Notion's employees technically can.

And if there's a data breach, so can hackers.

**Your mental health journey deserves privacy.**

---

### **Business Strategy**

You're planning a startup. You document everything in Roam:
- Competitor analysis
- Pricing strategy
- Customer research
- Fundraising plans

**Then:**
- Your co-founder leaves and takes legal action
- Your notes are subpoenaed
- Your competitor hires an ex-Roam employee

Unlikely? Yes. Impossible? No.

---

### **Personal Diary**

"I don't care if Google reads my grocery list."

**True.** But what about:
- Political opinions that could affect future employment
- Relationship struggles you don't want public
- Financial stress and debt
- Family conflicts
- Private thoughts about coworkers

**Ask yourself:** Would you want your notes displayed at your wedding? Your funeral? Your job interview?

If no, why are they on someone else's server?

---

## The Local-First Alternative

### What is Local-First?

**Simple definition:** Your data lives on YOUR device, not someone else's server.

**Key principles:**
1. Data stored locally by default
2. Cloud sync is optional (and encrypted if used)
3. No company can access your data
4. Works offline
5. You own your data (literally—it's a file you can copy)

---

### Tools That Are Actually Private

#### **1. Plain Text Files**

The OG local-first solution.

**Privacy:** 10/10 (just files on your computer)  
**Convenience:** 3/10 (no features, hard to search)  
**Encryption:** Only if you encrypt your hard drive

**Best for:** People who don't need fancy features

---

#### **2. Obsidian (Local Mode)**

Markdown files stored on your computer. No cloud by default.

**Privacy:** 9/10 (fully local)  
**Convenience:** 8/10 (powerful search, linking, plugins)  
**Encryption:** Optional E2E encrypted sync ($8/mo)

**Best for:** Power users who want features + privacy

**How it works:**
```
Your Computer/
├── Obsidian Vault/
│   ├── Daily Notes/
│   ├── Projects/
│   └── Journal/
```

Just folders and files. You can back them up to Dropbox, Git, or an encrypted USB drive.

---

#### **3. Standard Notes**

Open-source, encrypted note app.

**Privacy:** 10/10 (zero-knowledge encryption)  
**Convenience:** 7/10 (good apps, but less features than Notion)  
**Encryption:** Always on, not optional

**Best for:** People who want cloud convenience WITHOUT privacy trade-offs

**How it works:**
- Your notes are encrypted on your device
- Encrypted blobs stored on Standard Notes servers
- Even their employees can't decrypt them
- Open source = auditable security

---

#### **4. SHRP Notes**

Privacy-first note transformation (my project).

**Privacy:** 10/10 (100% browser-based, nothing sent to server)  
**Convenience:** 9/10 (instant, no signup, works offline)  
**Encryption:** Not needed (data never leaves your browser)

**Best for:** Quick note cleanup without cloud exposure

**How it works:**
1. Paste messy notes
2. Browser uses local NLP (compromise.js) to transform them
3. Get clean output
4. Export or copy (nothing saved on our servers)

**Use cases:**
- Therapy session notes (stay 100% private)
- Legal document drafts (no cloud exposure)
- Medical symptom tracking (HIPAA not required)
- Sensitive work notes (nothing logged)

---

## The Trade-Offs (Be Honest)

### What You Lose Going Local

**❌ No automatic cloud sync** (unless you self-host)  
**❌ No real-time collaboration** (can't co-edit with teammates)  
**❌ No web access** (must be on your device)  
**❌ No AI features** (GPT integration requires cloud)

**For teams:** Local-first is harder. Notion wins here.

**For personal notes:** Local-first is better in almost every way.

---

### What You Gain

**✅ Complete privacy** (mathematically impossible for companies to access)  
**✅ No monthly fees** (most local tools are free or one-time purchase)  
**✅ Works offline** (planes, cafes, anywhere)  
**✅ No vendor lock-in** (just files you can move anywhere)  
**✅ Faster** (no network latency)  
**✅ No AI training** (your data is yours alone)  
**✅ No data breaches** (can't hack what's not on a server)

---

## How to Transition to Local-First

### Step 1: Export Your Data

**Notion:**
1. Settings → Export content
2. Choose Markdown & CSV
3. Download ZIP file

**Evernote:**
1. File → Export Notes
2. Save as .enex file
3. Use tool to convert to Markdown

**Roam:**
1. Settings → Export All
2. Choose JSON or Markdown
3. Download

---

### Step 2: Choose Your Local Tool

**For personal knowledge management:** Obsidian  
**For maximum privacy + cloud sync:** Standard Notes  
**For quick note cleanup:** SHRP Notes  
**For simplicity:** Plain text files in Dropbox

---

### Step 3: Import Your Notes

**Obsidian:**
- Drag exported Markdown files into vault
- Use plugins to preserve structure

**Standard Notes:**
- Import from Evernote, Simplenote, plain text

**Plain text:**
- Just copy files to a folder
- Organize however you want

---

### Step 4: Delete Cloud Data

**Don't just stop using it—actually delete your account.**

**Notion:**
1. Settings → Danger Zone → Delete Workspace
2. Confirm via email

**Evernote:**
1. Account Settings → Delete Account
2. Wait 30 days (grace period)
3. Confirm deletion

**Why?** If you don't delete, your data still exists on their servers.

---

## Privacy Questions Answered

### "Isn't this paranoid?"

**10 years ago:** Maybe.

**Today:** No.

- AI companies need training data
- Data breaches happen weekly
- Privacy policies change overnight
- Governments request data constantly

**You're not paranoid for locking your front door.** This is the same principle.

---

### "I have nothing to hide"

**This isn't about hiding.**

It's about:
- Control (you own your thoughts)
- Security (breaches happen)
- Freedom (write without self-censoring)
- Future-proofing (who knows what's acceptable in 10 years?)

**Your notes from 2015 might be embarrassing in 2025.** Do you want them on a server forever?

---

### "Doesn't encryption solve this?"

**Only if it's end-to-end encryption (E2E).**

**Regular encryption** = Encrypted in transit, decrypted on their servers (they can still read it)

**E2E encryption** = Only you have the keys (company can't read it)

Most cloud apps use regular encryption, not E2E.

---

### "What about Google Docs for collaboration?"

**For collaboration:** Use cloud tools (you have to trade privacy for convenience).

**For personal notes:** Use local tools.

**Separate your use cases.**

- Team wiki → Notion (collaboration needed)
- Personal journal → Obsidian (privacy needed)
- Quick notes → SHRP (speed + privacy needed)

---

## The Bottom Line

Cloud note apps are convenient.

But you're paying with your privacy.

**What they collect:**
- Every note you've written
- Everyone you've mentioned
- Your private thoughts
- Potentially used for AI training
- Subject to breaches and subpoenas

**Local-first alternatives give you:**
- Complete privacy (impossible for companies to access)
- No ongoing costs
- Offline access
- Data ownership
- Peace of mind

**You don't need to go full privacy paranoid.**

But you should make an informed choice.

---

## Try Local-First Today

### For Quick Note Cleanup:
**SHRP Notes** - Transform messy notes in your browser (nothing sent to cloud)

👉 [Try SHRP Notes](https://shrp.app) (no signup required)

### For Long-Term Storage:
**Obsidian** - Powerful local-first knowledge base

**Standard Notes** - E2E encrypted cloud sync

---

## One More Thing

**Privacy policies can change overnight.**

The privacy policy you agreed to in 2020 might be completely different in 2025.

**With local-first tools:**
- No privacy policy
- No terms of service
- No company that can change the rules

**Your notes. Your device. Your control.**

---

*Read time: 11 minutes*  
*Privacy score: This article doesn't track you 😊*  
*No cookies. No analytics. No third-party scripts.*

---

**About the Author**

Kam is the founder of [Digiwares](https://digiwares.xyz) and creator of [SHRP Notes](https://shrp.app), a privacy-first note transformation tool. Passionate about building tools that respect user privacy while delivering real value.

Follow [@digi_wares](https://twitter.com/digi_wares) for more on privacy, productivity, and building in public.

---

**Further Reading:**

- [EFF's Guide to Choosing Secure Messaging Apps](https://www.eff.org)
- [Privacy Guides: Note-Taking Apps](https://www.privacyguides.org)
- [GDPR and Your Personal Data](https://gdpr.eu)

---

**Disclaimer:** Privacy policies and features change frequently. Information accurate as of November 2025. Always read current privacy policies before choosing a note app.