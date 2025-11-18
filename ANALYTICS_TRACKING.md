# Analytics Tracking - SHRP Notes

**Platform:** Google Analytics 4 (GA4)  
**Property ID:** `G-K5WHXKDGE4`  
**Implementation:** Custom event tracking via `gtag()`  
**Last Updated:** November 18, 2025

---

## 📊 All Tracked Events (10 Total)

### 1. **note_transform** 🔄
**Trigger:** When user transforms notes using any mode  
**Parameters:**
- `mode`: string - "summarize" | "structure" | "polish" | "tasks"
- `word_count`: number - Number of words in input text
- `category`: "engagement"

**Location:** `app/webapp/page.tsx` → `handleRun()`  
**Code:**
```typescript
trackNoteTransform(mode, wordCount);
```

**Purpose:** Track which transformation modes are most popular and typical note length

---

### 2. **note_export** 📦
**Trigger:** When user exports a note in any format  
**Parameters:**
- `format`: string - "txt" | "md" | "json" | "zip" | "docx"
- `category`: "engagement"

**Location:** `app/webapp/page.tsx` → `handleExport()`  
**Code:**
```typescript
trackNoteExport('zip'); // Currently only ZIP export implemented
```

**Purpose:** Track export format preferences and feature usage

---

### 3. **note_save** 💾
**Trigger:** When user saves a note (manual or auto)  
**Parameters:**
- `type`: string - "auto" | "manual"
- `category`: "engagement"

**Location:** 
- `app/webapp/page.tsx` → `handleSaveManually()` (manual)
- `hooks/useAutoSave.ts` → auto-save timer (auto)

**Code:**
```typescript
trackNoteSave(false); // Manual save
trackNoteSave(true);  // Auto save
```

**Purpose:** Understand save behavior patterns and auto-save adoption

---

### 4. **copy_to_clipboard** 📋
**Trigger:** When user copies transformed output to clipboard  
**Parameters:**
- `category`: "engagement"

**Location:** `app/webapp/page.tsx` → `handleCopyOutput()`  
**Code:**
```typescript
trackCopyToClipboard();
```

**Purpose:** Track how often users copy results vs export

---

### 5. **note_delete** 🗑️
**Trigger:** When user deletes a note from history  
**Parameters:**
- `category`: "engagement"

**Location:** `app/webapp/page.tsx` → `handleDeleteNote()`  
**Code:**
```typescript
trackNoteDelete();
```

**Purpose:** Track note deletion patterns and storage management behavior

---

### 6. **search** 🔍
**Trigger:** When user searches through note history  
**Parameters:**
- `search_term`: string - First 50 characters of search query (privacy-safe)
- `category`: "engagement"

**Location:** **NOT CURRENTLY IMPLEMENTED** ⚠️  
**Defined in:** `lib/analytics.ts`  
**Code:**
```typescript
trackSearch(query); // Function exists but not called anywhere
```

**Status:** ❌ Defined but unused

---

### 7. **keyboard_shortcut** ⌨️
**Trigger:** When user uses keyboard shortcuts  
**Parameters:**
- `shortcut`: string - "cmd+enter" | "cmd+s" | "cmd+e" | "cmd+k"
- `category`: "engagement"

**Location:** `app/webapp/page.tsx` → keyboard shortcut callbacks  
**Shortcuts Tracked:**
- `cmd+enter` - Transform note
- `cmd+s` - Save note
- `cmd+e` - Export note
- `cmd+k` - Clear note

**Code:**
```typescript
trackKeyboardShortcut('cmd+enter');
```

**Purpose:** Track power user behavior and keyboard shortcut adoption

---

### 8. **storage_warning** ⚠️
**Trigger:** When storage quota warning is shown  
**Parameters:**
- `percentage`: number - Storage usage percentage
- `category`: "technical"

**Location:** **NOT CURRENTLY IMPLEMENTED** ⚠️  
**Defined in:** `lib/analytics.ts`  
**Code:**
```typescript
trackStorageWarning(percentage); // Function exists but not called
```

**Status:** ❌ Defined but unused  
**Recommendation:** Implement in `StorageIndicator` component when usage > 80%

---

### 9. **error** 🚨
**Trigger:** When application errors occur  
**Parameters:**
- `error_type`: string - Type/category of error
- `error_message`: string - First 100 characters (privacy-safe)
- `category`: "technical"

**Location:** **NOT CURRENTLY IMPLEMENTED** ⚠️  
**Defined in:** `lib/analytics.ts`  
**Code:**
```typescript
trackError('transform_failed', error.message);
```

**Status:** ❌ Defined but unused  
**Recommendation:** Add to error boundaries and try-catch blocks

---

### 10. **page_view** 📄
**Trigger:** SPA navigation between pages  
**Parameters:**
- `page_path`: string - URL path

**Location:** **NOT CURRENTLY IMPLEMENTED** ⚠️  
**Defined in:** `lib/analytics.ts`  
**Code:**
```typescript
trackPageView('/webapp');
```

**Status:** ❌ Defined but unused  
**Note:** GA4 auto-tracks page views via default script, so manual tracking may not be needed

---

## 📈 Event Usage Summary

| **Event** | **Status** | **Category** | **Usage** |
|-----------|-----------|--------------|-----------|
| `note_transform` | ✅ Active | Engagement | High |
| `note_export` | ✅ Active | Engagement | Medium |
| `note_save` | ✅ Active | Engagement | High |
| `copy_to_clipboard` | ✅ Active | Engagement | Medium |
| `note_delete` | ✅ Active | Engagement | Low |
| `search` | ❌ Unused | Engagement | - |
| `keyboard_shortcut` | ✅ Active | Engagement | Medium |
| `storage_warning` | ❌ Unused | Technical | - |
| `error` | ❌ Unused | Technical | - |
| `page_view` | ❌ Unused | Technical | - |

**Active Events:** 6/10 (60%)  
**Defined but Unused:** 4/10 (40%)

---

## 🎯 Key Metrics Tracked

### User Engagement:
- ✅ Note transformation frequency (by mode)
- ✅ Average note length (word count)
- ✅ Export behavior
- ✅ Save patterns (manual vs auto)
- ✅ Copy-to-clipboard usage
- ✅ Keyboard shortcut adoption
- ✅ Note deletion patterns

### Technical Health:
- ⚠️ Error tracking (defined but not implemented)
- ⚠️ Storage quota warnings (defined but not implemented)

### Missing Metrics:
- ❌ Search behavior (not tracked)
- ❌ Session duration (GA4 default)
- ❌ PWA installation rate (not tracked)
- ❌ Voice input usage (not tracked)
- ❌ Theme preference (not tracked)
- ❌ Browser/device breakdown (GA4 default)

---

## 🔒 Privacy Considerations

### What We Track:
- ✅ **Anonymous event data** - No personal identification
- ✅ **Truncated search queries** (first 50 chars only)
- ✅ **Truncated error messages** (first 100 chars only)
- ✅ **Aggregated usage patterns**

### What We DON'T Track:
- ❌ **Note content** - Never sent to analytics
- ❌ **User identities** - No login/email tracking
- ❌ **IP addresses** - Anonymized by GA4
- ❌ **Full search queries** - Privacy-safe truncation
- ❌ **Full error messages** - Privacy-safe truncation

### GA4 Configuration:
```javascript
gtag('config', 'G-K5WHXKDGE4', {
  page_path: url,
  anonymize_ip: true, // Should be added for privacy
});
```

---

## 🚀 Recommendations

### HIGH PRIORITY:

1. **Implement Error Tracking**
   ```typescript
   // Add to error boundaries
   useEffect(() => {
     console.error('Application error:', error);
     trackError('component_crash', error.message); // ADD THIS
   }, [error]);
   ```

2. **Implement Storage Warning Tracking**
   ```typescript
   // Add to StorageIndicator component
   if (percentage >= 80 && !warningShown) {
     trackStorageWarning(percentage);
     setWarningShown(true);
   }
   ```

3. **Add PWA Installation Tracking**
   ```typescript
   // Add new event in analytics.ts
   export const trackPWAInstall = (browser: string, outcome: 'accepted' | 'dismissed') => {
     trackEvent('pwa_install', { browser, outcome, category: 'engagement' });
   };
   ```

### MEDIUM PRIORITY:

4. **Implement Search Tracking** (if/when search is added to note history)
   ```typescript
   // In NoteHistory component
   const handleSearch = (query: string) => {
     setSearchQuery(query);
     if (query.length >= 3) {
       trackSearch(query);
     }
   };
   ```

5. **Add Voice Input Tracking**
   ```typescript
   export const trackVoiceInput = (duration: number, wordCount: number) => {
     trackEvent('voice_input', { duration, word_count: wordCount, category: 'engagement' });
   };
   ```

6. **Add Theme Toggle Tracking**
   ```typescript
   export const trackThemeChange = (theme: 'light' | 'dark') => {
     trackEvent('theme_change', { theme, category: 'engagement' });
   };
   ```

### LOW PRIORITY:

7. **Track Note History Actions**
   - Pin/unpin note
   - Favorite/unfavorite note
   - Open note from history

8. **Track Feature Discovery**
   - First-time keyboard shortcut use
   - First-time export
   - First-time voice input

---

## 📝 Implementation Guide

### Adding a New Event:

1. **Define in `lib/analytics.ts`:**
```typescript
export const trackMyNewEvent = (param: string) => {
  trackEvent('my_new_event', {
    parameter_name: param,
    category: 'engagement', // or 'technical'
  });
};
```

2. **Import where needed:**
```typescript
import { trackMyNewEvent } from '../../lib/analytics';
```

3. **Call at appropriate trigger:**
```typescript
const handleAction = () => {
  // ... your logic
  trackMyNewEvent('value');
};
```

4. **Update this document!**

---

## 🔍 Viewing Analytics Data

### Google Analytics Dashboard:
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select property: `G-K5WHXKDGE4`
3. Navigate to **Reports** → **Events**
4. View custom events: `note_transform`, `note_save`, etc.

### Custom Reports:
- **Engagement Funnel:** Transform → Save → Export
- **Mode Popularity:** Group by `mode` parameter in `note_transform`
- **Power Users:** Filter by `keyboard_shortcut` event frequency
- **Export Preferences:** Group by `format` in `note_export`

---

## 📊 Expected Event Volume

Based on typical usage patterns:

| **Event** | **Frequency** | **Monthly Volume (Est.)** |
|-----------|--------------|---------------------------|
| `note_transform` | High | 10,000+ |
| `note_save` | High | 8,000+ |
| `keyboard_shortcut` | Medium | 3,000+ |
| `copy_to_clipboard` | Medium | 2,000+ |
| `note_export` | Low | 500+ |
| `note_delete` | Low | 300+ |

**Total Monthly Events:** ~24,000+ (for 1,000 active users)

---

## 🛡️ Error Handling

All tracking functions fail silently if:
- GA4 script is blocked by ad blockers
- `gtag` function is undefined
- JavaScript errors occur in tracking code

**No tracking failures will break the app.**

---

## 🔄 Version History

- **v1.0** (November 18, 2025) - Initial analytics implementation
  - 6 active events
  - 4 defined but unused events
  - Privacy-safe truncation implemented

---

## 📞 Contact

**Analytics Owner:** Digiwares Team  
**Questions:** Contact via [GitHub Issues](https://github.com/digitalwareshub/sharpnotes/issues)  
**Privacy Policy:** [shrp.app/privacy](https://shrp.app/privacy)

---

**Last Audit:** November 18, 2025  
**Next Review:** Q1 2026  
**Status:** ✅ Core tracking operational, recommendations pending
