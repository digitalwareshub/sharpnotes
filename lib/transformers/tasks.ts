import nlp from 'compromise';
import dates from 'compromise-dates';
import type { TransformResult } from '../../types';

// Extend compromise with dates plugin
nlp.extend(dates);

export function extractTasks(text: string): TransformResult {
  const doc = nlp(text);
  const tasks: Array<{ task: string; person?: string; date?: string }> = [];
  
  // Action verbs that indicate tasks
  const actionVerbs = [
    'email', 'call', 'send', 'review', 'prepare', 'schedule',
    'finish', 'complete', 'update', 'create', 'write', 'meet',
    'contact', 'follow', 'check', 'confirm', 'book', 'order',
    'reach', 'set', 'sign', 'submit', 'draft', 'organize'
  ];
  
  // Task indicator phrases
  const taskIndicators = [
    'need to', 'have to', 'should', 'must', 'remember to',
    'todo', 'to-do', 'action item', 'follow up', 'don\'t forget'
  ];
  
  // Get all sentences
  const sentences = doc.sentences();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sentences.forEach((sentence: any) => {
    const sentText = sentence.out('text');
    const sentDoc = nlp(sentText);
    const lowerText = sentText.toLowerCase();
    
    // Check if sentence contains action verbs
    const verbs = sentDoc.verbs().out('array') as string[];
    const hasActionVerb = verbs.some(v => 
      actionVerbs.some(av => v.toLowerCase().includes(av))
    );
    
    // Check if sentence has task indicators
    const hasTaskIndicator = taskIndicators.some(indicator => 
      lowerText.includes(indicator)
    );
    
    // Check if sentence starts with imperative verb
    const firstWord = sentText.split(' ')[0]?.toLowerCase();
    const startsWithAction = actionVerbs.includes(firstWord);
    
    if (hasActionVerb || hasTaskIndicator || startsWithAction) {
      // Extract people mentioned
      const people = sentDoc.people().out('array') as string[];
      
      // Extract dates/times
      // @ts-expect-error - dates() added by compromise-dates plugin
      const extractedDates = sentDoc.dates().out('array') as string[];
      
      // Clean up task text - remove task indicators
      let taskText = sentText;
      taskIndicators.forEach(indicator => {
        const regex = new RegExp(`^(i |we |you |they )?${indicator}\\s+`, 'i');
        taskText = taskText.replace(regex, '');
      });
      
      // Trim and capitalize
      taskText = taskText.trim();
      if (taskText.length > 0) {
        taskText = taskText.charAt(0).toUpperCase() + taskText.slice(1);
        
        // Ensure ends with punctuation
        if (!taskText.match(/[.!?]$/)) {
          taskText = taskText.replace(/[.,!?]*$/, '.');
        }
        
        tasks.push({
          task: taskText,
          person: people[0],
          date: extractedDates[0]
        });
      }
    }
  });
  
  // Remove duplicates (case-insensitive comparison)
  const uniqueTasks = tasks.filter((task, index, self) =>
    index === self.findIndex(t => t.task.toLowerCase() === task.task.toLowerCase())
  );
  
  if (!uniqueTasks.length) {
    return {
      output: `⚠️ No action items detected.

Try including:
- Action verbs (email, call, send, review, schedule)
- Task phrases ("need to", "should", "remember to")
- Specific people and dates
- Imperative sentences ("Send the report", "Call John")`,
      metadata: {
        originalLength: text.split(/\s+/).filter(Boolean).length,
        transformedLength: 0,
        tasksFound: 0
      }
    };
  }
  
  // Format output with checkboxes
  const formatted = uniqueTasks.map((t, idx) => {
    let task = `${idx + 1}. [ ] ${t.task}`;
    
    // Add person if mentioned
    if (t.person) {
      task += ` (${t.person})`;
    }
    
    // Add date if mentioned
    if (t.date) {
      task += ` [${t.date}]`;
    }
    
    return task;
  });
  
  const output = formatted.join('\n');
  
  return {
    output,
    metadata: {
      originalLength: text.split(/\s+/).filter(Boolean).length,
      transformedLength: output.split(/\s+/).filter(Boolean).length,
      tasksFound: uniqueTasks.length
    }
  };
}