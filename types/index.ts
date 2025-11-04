// Core type definitions for SHRP Notes

export type Mode = 'summarize' | 'structure' | 'polish' | 'tasks';

export interface Note {
  id: string;
  title: string;
  input: string;
  output: string;
  mode: Mode;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
  wordCount: number;
  isFavorite: boolean;
  isPinned?: boolean; // Optional for backward compatibility
}

export interface UserPreferences {
  defaultMode: Mode;
  theme: 'light' | 'dark';
  autoSaveEnabled: boolean;
  autoSaveInterval: number; // in seconds
}

export interface StorageInfo {
  used: number; // in bytes
  total: number; // in bytes
  notesCount: number;
  percentage: number; // 0-100
}

export interface ExportOptions {
  format: 'txt' | 'md' | 'json';
  includeMetadata?: boolean;
}

export interface TransformResult {
  output: string;
  metadata?: {
    originalLength: number;
    transformedLength: number;
    compressionRatio?: number;
    tasksFound?: number;
  };
}
