import nlp from 'compromise';
// @ts-ignore - compromise plugins don't export proper types
import dates from 'compromise-dates';
// @ts-ignore - compromise plugins don't export proper types
import numbers from 'compromise-numbers';
import { TransformResult } from '../../types';

// Extend compromise with plugins
nlp.extend(dates);
nlp.extend(numbers);

export function summarizeText(text: string): TransformResult {
  const doc = nlp(text);
  const originalLength = text.split(/\s+/).filter(Boolean).length;
  
  // If text is already short, return as-is
  if (originalLength <= 50) {
    return {
      output: text.trim(),
      metadata: {
        originalLength,
        transformedLength: originalLength,
        compressionRatio: 1
      }
    };
  }
  
  // Extract key entities
  const people = doc.people().out('array') as string[];
  const places = doc.places().out('array') as string[];
  const organizations = doc.organizations().out('array') as string[];
  const topics = doc.topics().out('array') as string[];
  // @ts-ignore - dates plugin method
  const extractedDates = doc.dates().out('array') as string[];
  // @ts-ignore - numbers plugin method
  const extractedNumbers = doc.numbers().out('array') as string[];
  
  // Get all sentences
  const sentences = doc.sentences().out('array') as string[];
  
  // Score sentences based on importance
  const scoredSentences = sentences.map(sentence => {
    const sentDoc = nlp(sentence);
    let score = 0;
    
    // Higher score for sentences with people
    if (sentDoc.people().length > 0) score += 3;
    
    // Higher score for sentences with dates
    // @ts-ignore - dates plugin method
    if (sentDoc.dates().length > 0) score += 2;
    
    // Higher score for sentences with numbers
    if (sentDoc.numbers().length > 0) score += 2;
    
    // Higher score for sentences with topics
    if (sentDoc.topics().length > 0) score += 2;
    
    // Higher score for questions (often important)
    if (sentence.includes('?')) score += 3;
    
    // Higher score for sentences with important keywords
    const important = ['important', 'critical', 'urgent', 'key', 'must', 'need'];
    if (important.some(word => sentence.toLowerCase().includes(word))) score += 3;
    
    // Higher score for first and last sentences (often contain key info)
    if (sentence === sentences[0] || sentence === sentences[sentences.length - 1]) {
      score += 2;
    }
    
    // Lower score for very short sentences (likely incomplete thoughts)
    if (sentence.split(/\s+/).length < 5) score -= 1;
    
    return { sentence, score };
  });
  
  // Sort by score and take top sentences (aim for ~30% of original)
  const targetCount = Math.max(3, Math.ceil(sentences.length * 0.3));
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount)
    .map(s => s.sentence);
  
  // Build summary
  const summary: string[] = [];
  
  // Add entity sections if significant entities found
  if (people.length > 0) {
    const uniquePeople = [...new Set(people)].slice(0, 5);
    summary.push(`👥 **People:** ${uniquePeople.join(', ')}`);
  }
  
  if (places.length > 0) {
    const uniquePlaces = [...new Set(places)].slice(0, 3);
    summary.push(`📍 **Places:** ${uniquePlaces.join(', ')}`);
  }
  
  if (organizations.length > 0) {
    const uniqueOrgs = [...new Set(organizations)].slice(0, 3);
    summary.push(`🏢 **Organizations:** ${uniqueOrgs.join(', ')}`);
  }
  
  if (extractedDates.length > 0) {
    const uniqueDates = [...new Set(extractedDates)].slice(0, 3);
    summary.push(`📅 **Dates:** ${uniqueDates.join(', ')}`);
  }
  
  if (extractedNumbers.length > 0) {
    const uniqueNumbers = [...new Set(extractedNumbers)].slice(0, 5);
    summary.push(`🔢 **Numbers:** ${uniqueNumbers.join(', ')}`);
  }
  
  // Add blank line if we have entities
  if (summary.length > 0) {
    summary.push('');
  }
  
  // Add key points
  summary.push('**Key Points:**');
  topSentences.forEach(s => {
    summary.push(`• ${s.trim()}`);
  });
  
  const output = summary.join('\n');
  const transformedLength = output.split(/\s+/).filter(Boolean).length;
  
  return {
    output,
    metadata: {
      originalLength,
      transformedLength,
      compressionRatio: originalLength / transformedLength
    }
  };
}