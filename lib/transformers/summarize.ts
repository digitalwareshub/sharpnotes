import { TransformResult } from '../../types';

export function summarizeText(text: string): TransformResult {
  const words = text.trim().split(/\s+/);
  const originalLength = words.length;
  
  if (originalLength <= 80) {
    return {
      output: text.trim(),
      metadata: {
        originalLength,
        transformedLength: originalLength,
        compressionRatio: 1,
      },
    };
  }
  
  const output = words.slice(0, 80).join(' ') + '…';
  
  return {
    output,
    metadata: {
      originalLength,
      transformedLength: 80,
      compressionRatio: originalLength / 80,
    },
  };
}
