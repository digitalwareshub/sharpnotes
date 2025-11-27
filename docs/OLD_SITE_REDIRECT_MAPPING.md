# Old Site Redirect Mapping

**Date:** November 27, 2025  
**Purpose:** Comprehensive redirect mapping from old document digitization site to new SHRP Notes

---

## 📋 Overview

This document maps all URLs from the old SHRP document digitization website to appropriate pages on the new SHRP Notes site. This ensures users don't encounter 404 errors and are directed to relevant content.

---

## 🔄 Redirect Strategy

### 1. **Blog Posts (OCR/PDF Content)**
Old blog posts about OCR and PDF extraction are redirected to the most relevant SHRP Notes content:

| Old URL | New Destination | Reasoning |
|---------|----------------|-----------|
| `/blog/free-vs-paid-ocr-software-comparison` | `/blog/privacy-cost-of-cloud-note-apps` | Privacy focus aligns with old security concerns |
| `/blog/how-to-extract-text-from-pdf-complete-guide-2025` | `/blog/how-to-organize-meeting-notes` | Similar problem (organizing unstructured content) |
| `/blog/ocr-software-comparison-shrp-vs-competitors` | `/blog/shrp-vs-notion-vs-obsidian` | Comparison article replacement |
| `/blog/document-digitization-for-law-firms` | `/blog/privacy-cost-of-cloud-note-apps` | Legal professionals care about privacy |
| `/blog/document-digitization-guide` | `/blog/how-to-organize-meeting-notes` | Organization guide replacement |
| `/blog/small-business-paperless-office-setup` | `/blog` | General blog page |
| `/blog/ocr-accuracy-standards` | `/blog` | General blog page |

### 2. **Tools Pages**
All old tool pages redirect based on relevance:

| Old URL | New Destination | Reasoning |
|---------|----------------|-----------|
| `/tools/pdf-to-excel` | `/blog/how-to-organize-meeting-notes` | Similar data extraction need |
| `/tools/contract-parser` | `/` | Homepage with overview |
| `/tools/invoice-extractor` | `/` | Homepage with overview |
| `/tools/receipt-scanner` | `/` | Homepage with overview |
| `/tools/*` (catch-all) | `/` | Homepage with overview |

### 3. **Service Pages**
Old digitization service pages:

| Old URL | New Destination | Reasoning |
|---------|----------------|-----------|
| `/digitize/*` (all paths) | `/` | Homepage introduces new service |
| `/ocr` | `/` | Homepage |
| `/pdf-extract` | `/blog/how-to-organize-meeting-notes` | Related content |
| `/extract-pdf` | `/blog/how-to-organize-meeting-notes` | Related content |
| `/preview` | `/` | Homepage |
| `/demo` | `/` | Homepage |

### 4. **Info Pages**
Old support and info pages:

| Old URL | New Destination | Reasoning |
|---------|----------------|-----------|
| `/about` | `/blog` | Blog explains our evolution |
| `/faq` | `/blog` | Blog has Q&A content |
| `/contact` | `/report` | Report page is our contact form |
| `/support` | `/report` | Report page handles support |
| `/help` | `/blog` | Blog contains guides |
| `/getting-started` | `/blog` | Blog has tutorials |
| `/how-it-works` | `/` | Homepage explains how SHRP Notes works |

### 5. **Legal Pages**
Old privacy/legal pages (we have equivalents):

| Old URL | New Destination | Reasoning |
|---------|----------------|-----------|
| `/data-privacy` | `/privacy` | We have privacy page |
| `/terms-of-service` | `/terms` | We have terms page |
| `/security` | `/blog/privacy-cost-of-cloud-note-apps` | Privacy blog post |
| `/cookie-policy` | `/privacy` | Privacy page covers this |

### 6. **API Endpoints**
Old API endpoints (no longer exist):

| Old URL | New Destination | Reasoning |
|---------|----------------|-----------|
| `/api/extract-text` | `/` | Homepage |
| `/api/pdf-to-excel` | `/` | Homepage |
| `/api/ocr` | `/` | Homepage |
| All other `/api/*` | `/` | Homepage |

### 7. **Special Cases**

#### Malformed URLs from Analytics:
- `/webapp ocr` (with space) → `/webapp`
- `/webapp%20ocr` (URL encoded space) → `/webapp`
- `/webapp-ocr` (with dash) → `/webapp`

These are handled by the middleware.

### 8. **Old Image Processing Services**
Services that no longer exist:

| Old URL | New Destination |
|---------|----------------|
| `/remove-background` | `/` |
| `/colorize` | `/` |
| `/decode` | `/` |
| `/product-photography` | `/` |
| `/transform` | `/` |

---

## 🛠️ Implementation Details

### Files Modified:

1. **`/middleware.ts`**
   - Added 60+ redirects for old blog posts and service URLs
   - Handles URL-encoded paths (e.g., `/webapp%20ocr`)
   - 301 permanent redirects (SEO-friendly)

2. **`/next.config.js`**
   - Added redirects for old blog posts → relevant SHRP Notes content
   - Tools pages → appropriate destinations
   - Info pages → blog or report page
   - All redirects are permanent (301 status)

3. **`/app/not-found.tsx`**
   - Completely redesigned to match current SHRP Notes theme
   - Clean white background with orange accents
   - Clear messaging about evolution from OCR service to note-taking
   - Helpful navigation to popular pages
   - Three featured blog posts with icons
   - Links to webapp, homepage, blog, and report page

---

## 🎨 404 Page Improvements

### Old Design Issues:
- ❌ Dark gradient background (didn't match site)
- ❌ Generic messaging
- ❌ Limited navigation options
- ❌ No metadata for SEO

### New Design Features:
- ✅ Clean white background matching landing page
- ✅ Clear messaging about service evolution
- ✅ Orange accent colors consistent with brand
- ✅ Header and Footer components for full navigation
- ✅ Three featured blog post cards
- ✅ Multiple CTAs (webapp, homepage, blog, report)
- ✅ Helpful explanation in orange box
- ✅ Client-side component for interactivity

---

## 📊 Coverage Analysis

### Old Site Pages Covered:

✅ **Blog Posts:** 12+ redirects  
✅ **Tools Pages:** 6+ redirects  
✅ **Service Pages:** 10+ redirects  
✅ **Info Pages:** 9+ redirects  
✅ **API Endpoints:** 6+ redirects  
✅ **Legal Pages:** 4 redirects  
✅ **Image Services:** 5 redirects  

**Total Redirects Implemented:** 70+

---

## 🧪 Testing Checklist

Test these URLs to verify redirects work:

### Blog Posts (Analytics Traffic):
- [ ] `https://shrp.app/blog/free-vs-paid-ocr-software-comparison`
- [ ] `https://shrp.app/blog/how-to-extract-text-from-pdf-complete-guide-2025`
- [ ] `https://shrp.app/blog/ocr-software-comparison-shrp-vs-competitors`

### Special Cases:
- [ ] `https://shrp.app/webapp%20ocr` (URL-encoded space)
- [ ] `https://shrp.app/webapp ocr` (with space, if browser allows)

### Tools:
- [ ] `https://shrp.app/tools/pdf-to-excel`
- [ ] `https://shrp.app/tools/contract-parser`
- [ ] `https://shrp.app/tools/invoice-extractor`
- [ ] `https://shrp.app/tools/receipt-scanner`

### Services:
- [ ] `https://shrp.app/digitize`
- [ ] `https://shrp.app/ocr`
- [ ] `https://shrp.app/pdf-extract`

### Info Pages:
- [ ] `https://shrp.app/about`
- [ ] `https://shrp.app/faq`
- [ ] `https://shrp.app/contact`

### 404 Page:
- [ ] `https://shrp.app/random-nonexistent-page` (should show new 404 design)

---

## 🎯 Expected User Experience

### Scenario 1: User clicks old blog post from search results
**Before:** 404 error with dark page  
**After:** Redirected to relevant SHRP Notes content (301 redirect)

### Scenario 2: User types `/tools/pdf-to-excel` from memory
**Before:** 404 error  
**After:** Redirected to note organization guide

### Scenario 3: User lands on truly non-existent page
**Before:** Generic dark 404 with limited options  
**After:** Branded 404 explaining evolution, with clear CTAs and navigation

---

## 📈 SEO Benefits

1. **301 Permanent Redirects**
   - Tells Google old URLs are permanently moved
   - Passes link equity to new URLs
   - Prevents duplicate content issues

2. **Relevant Redirects**
   - Users land on contextually similar content
   - Reduces bounce rate
   - Improves engagement metrics

3. **Branded 404 Page**
   - Explains service evolution clearly
   - Provides value even on error pages
   - Multiple navigation options reduce exit rate

---

## 🔮 Future Considerations

### If Analytics Show High Traffic to Specific Old URLs:
1. Consider creating dedicated content replacements
2. Add more specific redirect targets
3. Create migration guide blog post explaining the evolution

### If Users Report Broken Links:
1. Check middleware.ts and next.config.js
2. Add new redirect if needed
3. Update this document

### Monitoring:
- Review Vercel Analytics for 404 errors
- Check Search Console for crawl errors
- Monitor user feedback via /report page

---

## 📝 Maintenance

### When Adding New Blog Posts:
No action needed - old blog post redirects are already mapped

### When Removing Old Redirects:
Wait at least 6 months after deployment before removing any redirects to ensure search engines have updated their indexes

### When Adding New Features:
Consider if any old URL patterns should redirect to new features

---

## ✅ Deployment Checklist

- [x] Update middleware.ts with comprehensive redirects
- [x] Update next.config.js with blog post redirects
- [x] Redesign not-found.tsx to match site theme
- [x] Test key redirect URLs locally
- [ ] Deploy to production (Vercel)
- [ ] Test all redirect URLs on production
- [ ] Monitor analytics for 404 errors
- [ ] Update Search Console if needed

---

**Status:** ✅ Complete  
**Last Updated:** November 27, 2025  
**Next Review:** March 2026 (3 months)
