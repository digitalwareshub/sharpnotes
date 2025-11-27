# Redirect Testing URLs

## 🧪 Quick Test Links

Copy-paste these URLs into your browser after deploying to verify redirects work correctly.

---

## High Priority (From Analytics Traffic)

These are the specific URLs you mentioned seeing traffic to:

1. **Blog Post: Free vs Paid OCR**
   ```
   https://shrp.app/blog/free-vs-paid-ocr-software-comparison
   ```
   **Expected:** Redirects to `/blog/privacy-cost-of-cloud-note-apps`

2. **Blog Post: Extract Text from PDF**
   ```
   https://shrp.app/blog/how-to-extract-text-from-pdf-complete-guide-2025
   ```
   **Expected:** Redirects to `/blog/how-to-organize-meeting-notes`

3. **Blog Post: OCR Software Comparison**
   ```
   https://shrp.app/blog/ocr-software-comparison-shrp-vs-competitors
   ```
   **Expected:** Redirects to `/blog/shrp-vs-notion-vs-obsidian`

4. **Webapp OCR (malformed URL)**
   ```
   https://shrp.app/webapp%20ocr
   ```
   **Expected:** Redirects to `/webapp`

---

## Tools Pages

5. **PDF to Excel Tool**
   ```
   https://shrp.app/tools/pdf-to-excel
   ```
   **Expected:** Redirects to `/blog/how-to-organize-meeting-notes`

6. **Contract Parser Tool**
   ```
   https://shrp.app/tools/contract-parser
   ```
   **Expected:** Redirects to `/` (homepage)

7. **Invoice Extractor Tool**
   ```
   https://shrp.app/tools/invoice-extractor
   ```
   **Expected:** Redirects to `/` (homepage)

8. **Receipt Scanner Tool**
   ```
   https://shrp.app/tools/receipt-scanner
   ```
   **Expected:** Redirects to `/` (homepage)

---

## Service Pages

9. **Digitize Main**
   ```
   https://shrp.app/digitize
   ```
   **Expected:** Redirects to `/` (homepage)

10. **OCR Service**
    ```
    https://shrp.app/ocr
    ```
    **Expected:** Redirects to `/` (homepage)

11. **PDF Extract**
    ```
    https://shrp.app/pdf-extract
    ```
    **Expected:** Redirects to `/blog/how-to-organize-meeting-notes`

---

## Info Pages

12. **About Page**
    ```
    https://shrp.app/about
    ```
    **Expected:** Redirects to `/blog`

13. **FAQ Page**
    ```
    https://shrp.app/faq
    ```
    **Expected:** Redirects to `/blog`

14. **Contact Page**
    ```
    https://shrp.app/contact
    ```
    **Expected:** Redirects to `/report`

15. **How It Works**
    ```
    https://shrp.app/how-it-works
    ```
    **Expected:** Redirects to `/` (homepage)

---

## Old Blog Posts

16. **Document Digitization Guide**
    ```
    https://shrp.app/blog/document-digitization-guide
    ```
    **Expected:** Redirects to `/blog/how-to-organize-meeting-notes`

17. **OCR Accuracy Standards**
    ```
    https://shrp.app/blog/ocr-accuracy-standards
    ```
    **Expected:** Redirects to `/blog`

18. **Small Business Paperless**
    ```
    https://shrp.app/blog/small-business-paperless-office-setup
    ```
    **Expected:** Redirects to `/blog`

---

## 404 Page Test

19. **Non-existent Page (should show new 404)**
    ```
    https://shrp.app/this-page-definitely-does-not-exist-12345
    ```
    **Expected:** Shows new branded 404 page with:
    - White background
    - Orange accents
    - Header and Footer
    - Clear messaging about service evolution
    - Links to webapp, homepage, blog
    - Featured blog post cards

---

## Quick Test Script

Run this in your browser console to test multiple URLs:

```javascript
const testUrls = [
  '/blog/free-vs-paid-ocr-software-comparison',
  '/blog/how-to-extract-text-from-pdf-complete-guide-2025',
  '/blog/ocr-software-comparison-shrp-vs-competitors',
  '/webapp%20ocr',
  '/tools/pdf-to-excel',
  '/tools/contract-parser',
  '/digitize',
  '/ocr',
  '/about',
  '/faq',
  '/contact',
];

console.log('Testing redirects...\n');
testUrls.forEach(url => {
  fetch(url)
    .then(response => {
      console.log(`${url} → Status: ${response.status} → ${response.url}`);
    })
    .catch(err => console.error(`${url} → Error:`, err));
});
```

---

## Manual Testing Checklist

After deploying, manually check:

- [ ] All 4 high-priority URLs from analytics redirect correctly
- [ ] 404 page shows new branded design (test with random URL)
- [ ] 404 page has working Header and Footer
- [ ] 404 page CTAs work (webapp, homepage, blog, report)
- [ ] Featured blog cards on 404 page link correctly
- [ ] No console errors on 404 page
- [ ] Mobile responsive (test 404 page on phone)

---

## Expected HTTP Status Codes

- **301:** Permanent redirect (most old URLs)
- **404:** Not found (only truly non-existent pages)
- **200:** Successfully loaded destination page

---

## Monitoring After Deployment

### Week 1:
- Check Vercel Analytics for 404 error rate
- Look for any new broken URLs in analytics
- Monitor user feedback via /report page

### Week 2-4:
- Check Google Search Console for crawl errors
- Review redirect performance
- Identify any missed URLs

### Month 2-3:
- Analyze if redirected URLs are showing up in search results
- Consider removing rarely-used redirects
- Update documentation if needed

---

## Troubleshooting

### If a redirect doesn't work:
1. Check if URL is in `middleware.ts` or `next.config.js`
2. Clear browser cache
3. Test in incognito mode
4. Check Vercel deployment logs
5. Verify `middleware.ts` is being executed (add console.log)

### If 404 page doesn't show correctly:
1. Check `app/not-found.tsx` exists
2. Verify Header and Footer components are imported correctly
3. Check browser console for errors
4. Test locally first: `npm run dev`

---

**Testing Status:** ⏳ Pending Deployment  
**Last Updated:** November 27, 2025
