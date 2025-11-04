import { TransformResult } from '../../types';

export function extractTasks(text: string): TransformResult {
  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  const taskKeywords = [
    'need to',
    'have to',
    'must',
    'todo',
    'to-do',
    'should',
    'remember to',
    'remind',
    'email',
    'call',
    'meet',
    'schedule',
    'finish',
    'complete',
  ];
  
  const tasks: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (taskKeywords.some(k => lower.includes(k))) {
      tasks.push(line);
    }
  }

  if (!tasks.length) {
    return {
      output: 'No clear tasks detected yet. Try writing lines like "I need to…" or "I should remember to…".',
      metadata: {
        originalLength: text.split(/\s+/).length,
        transformedLength: 0,
        tasksFound: 0,
      },
    };
  }

  const output = tasks.map((t, idx) => `${idx + 1}. ${t}`).join('\n');
  
  return {
    output,
    metadata: {
      originalLength: text.split(/\s+/).length,
      transformedLength: output.split(/\s+/).length,
      tasksFound: tasks.length,
    },
  };
}
