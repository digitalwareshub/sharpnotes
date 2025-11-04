import toast from 'react-hot-toast';
import { Note, ExportOptions } from '../types';

/**
 * Download a file with error handling
 */
function downloadFile(content: string, filename: string, mimeType: string): boolean {
  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Downloaded ${filename}`);
    return true;
  } catch (error) {
    console.error('Failed to download file:', error);
    toast.error('Failed to download file. Check browser permissions.');
    return false;
  }
}

/**
 * Export a single note as TXT
 */
export function exportNoteAsTxt(note: Note): boolean {
  const content = `${note.title}\n${'='.repeat(note.title.length)}\n\n${note.output}`;
  const filename = `${sanitizeFilename(note.title)}.txt`;
  return downloadFile(content, filename, 'text/plain');
}

/**
 * Export a single note as Markdown
 */
export function exportNoteAsMarkdown(note: Note): boolean {
  const date = new Date(note.createdAt).toLocaleDateString();
  const content = `# ${note.title}

**Created:** ${date}  
**Mode:** ${note.mode}  
**Words:** ${note.wordCount}

---

## Original Input

${note.input}

---

## Transformed Output

${note.output}
`;
  
  const filename = `${sanitizeFilename(note.title)}.md`;
  return downloadFile(content, filename, 'text/markdown');
}

/**
 * Export multiple notes as JSON
 */
export function exportNotesAsJSON(notes: Note[]): boolean {
  const content = JSON.stringify({
    exportDate: new Date().toISOString(),
    notesCount: notes.length,
    notes,
  }, null, 2);
  
  const filename = `shrp-notes-export-${Date.now()}.json`;
  return downloadFile(content, filename, 'application/json');
}

/**
 * Export text content with format selection
 */
export function exportText(text: string, title: string, options: ExportOptions): boolean {
  const { format } = options;
  
  switch (format) {
    case 'txt':
      return downloadFile(text, `${sanitizeFilename(title)}.txt`, 'text/plain');
    
    case 'md':
      return downloadFile(text, `${sanitizeFilename(title)}.md`, 'text/markdown');
    
    case 'json':
      const jsonContent = JSON.stringify({ title, content: text }, null, 2);
      return downloadFile(jsonContent, `${sanitizeFilename(title)}.json`, 'application/json');
    
    default:
      toast.error(`Unsupported format: ${format}`);
      return false;
  }
}

/**
 * Copy text to clipboard with error handling
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text || !text.trim()) {
    toast.error('Nothing to copy');
    return false;
  }
  
  try {
    // Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      toast.success('Copied to clipboard!');
      return true;
    } else {
      throw new Error('Copy command failed');
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    toast.error('Failed to copy. Please try manually.');
    return false;
  }
}

/**
 * Sanitize filename to remove invalid characters
 */
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .substring(0, 50) || 'untitled';
}

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
