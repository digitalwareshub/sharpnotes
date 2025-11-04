import { TransformResult } from '../../types';

export function structureText(text: string): TransformResult {
  const sentences = text
    .split(/([.!?])\s+/)
    .reduce<string[]>((acc, part, index, arr) => {
      if (index % 2 === 0) {
        const sentence = part + (arr[index + 1] || '');
        if (sentence.trim()) acc.push(sentence.trim());
      }
      return acc;
    }, []);
  
  if (!sentences.length) {
    return {
      output: 'Not enough structure detected yet. Try adding a few more complete thoughts.',
    };
  }
  
  const output = sentences.map(s => `• ${s}`).join('\n');
  
  return {
    output,
    metadata: {
      originalLength: text.split(/\s+/).length,
      transformedLength: sentences.length,
    },
  };
}
