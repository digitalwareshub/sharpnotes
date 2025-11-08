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
  metadata?: TransformMetadata;
}

export interface TransformMetadata {
  originalLength: number;
  transformedLength: number;
  compressionRatio?: number;
  tasksFound?: number;
  entitiesExtracted?: ExtractedEntities;
}

export interface ExtractedEntities {
  people?: string[];
  places?: string[];
  organizations?: string[];
  dates?: string[];
  numbers?: string[];
  topics?: string[];
}

export interface Task {
  task: string;
  person?: string;
  date?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface SentenceScore {
  sentence: string;
  score: number;
}