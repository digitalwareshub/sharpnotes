import { TransformResult } from '../../types';

export function polishText(text: string): TransformResult {
  if (!text.trim()) {
    return { output: '' };
  }
  
  // Simple "polish": trim, normalize spacing, ensure sentences start with capital
  const cleaned = text
    .replace(/\s+/g, ' ')
    .trim();
  
  const pieces = cleaned.split(/([.!?])\s+/);
  const polished: string[] = [];
  
  for (let i = 0; i < pieces.length; i += 2) {
    const sentence = (pieces[i] || '').trim();
    const punct = pieces[i + 1] || '';
    if (!sentence) continue;
    const cap = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    polished.push(cap + punct);
  }
  
  const output = polished.join(' ');
  
  return {
    output,
    metadata: {
      originalLength: text.split(/\s+/).length,
      transformedLength: output.split(/\s+/).length,
    },
  };
}
