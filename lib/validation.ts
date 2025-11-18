/**
 * Input validation utilities for text transformations
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
  warning?: string;
}

// Configuration constants
const MAX_TEXT_LENGTH = 50000; // 50k characters
const MIN_TEXT_LENGTH = 10; // Minimum 10 characters for meaningful transformation
const RECOMMENDED_MAX_LENGTH = 10000; // Recommend shorter text for best results

/**
 * Validate input text before transformation
 */
export function validateInput(text: string): ValidationResult {
  // Check if text is empty or only whitespace
  if (!text || text.trim().length === 0) {
    return {
      valid: false,
      error: 'Please enter some text to transform',
    };
  }

  const trimmedLength = text.trim().length;

  // Check minimum length
  if (trimmedLength < MIN_TEXT_LENGTH) {
    return {
      valid: false,
      error: `Text too short. Please enter at least ${MIN_TEXT_LENGTH} characters.`,
    };
  }

  // Check maximum length
  if (trimmedLength > MAX_TEXT_LENGTH) {
    return {
      valid: false,
      error: `Text too long (${trimmedLength.toLocaleString()} characters). Maximum is ${MAX_TEXT_LENGTH.toLocaleString()} characters.`,
    };
  }

  // Warning for very long text (but still valid)
  if (trimmedLength > RECOMMENDED_MAX_LENGTH) {
    return {
      valid: true,
      warning: `Large text (${trimmedLength.toLocaleString()} characters). Processing may take a few seconds.`,
    };
  }

  return { valid: true };
}

/**
 * Sanitize input text (remove potentially problematic characters)
 */
export function sanitizeInput(text: string): string {
  // Remove null bytes and other control characters except newlines, tabs, and carriage returns
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Validate and sanitize input (combined operation)
 */
export function validateAndSanitize(text: string): {
  valid: boolean;
  sanitized: string;
  error?: string;
  warning?: string;
} {
  const validation = validateInput(text);
  
  if (!validation.valid) {
    return {
      valid: false,
      sanitized: '',
      error: validation.error,
    };
  }

  const sanitized = sanitizeInput(text);

  return {
    valid: true,
    sanitized,
    warning: validation.warning,
  };
}

/**
 * Get estimated processing time based on text length
 */
export function getEstimatedProcessingTime(text: string): number {
  const length = text.trim().length;
  
  // Rough estimate: 1ms per 10 characters
  const baseTime = (length / 10);
  
  // Add overhead for NLP processing
  const overhead = 200; // 200ms base overhead
  
  return Math.max(baseTime + overhead, 200); // Minimum 200ms
}

/**
 * Check if processing should have a timeout warning
 */
export function shouldWarnAboutTimeout(text: string): boolean {
  const estimatedTime = getEstimatedProcessingTime(text);
  return estimatedTime > 3000; // Warn if > 3 seconds
}

/**
 * Validate note title
 */
export function validateTitle(title: string): ValidationResult {
  if (!title || title.trim().length === 0) {
    return {
      valid: false,
      error: 'Title cannot be empty',
    };
  }

  if (title.length > 200) {
    return {
      valid: false,
      error: 'Title too long (max 200 characters)',
    };
  }

  return { valid: true };
}

/**
 * Truncate text to a maximum length (with ellipsis)
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength - 3)}...`;
}

/**
 * Get word count from text
 */
export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Get character count (excluding whitespace)
 */
export function getCharCount(text: string): number {
  return text.replace(/\s/g, '').length;
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): ValidationResult {
  if (query.length > 100) {
    return {
      valid: false,
      error: 'Search query too long (max 100 characters)',
    };
  }

  return { valid: true };
}
