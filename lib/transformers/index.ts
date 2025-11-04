import { Mode, TransformResult } from '../../types';
import { summarizeText } from './summarize';
import { structureText } from './structure';
import { polishText } from './polish';
import { extractTasks } from './tasks';

export function transform(text: string, mode: Mode): TransformResult {
  switch (mode) {
    case 'summarize':
      return summarizeText(text);
    case 'structure':
      return structureText(text);
    case 'polish':
      return polishText(text);
    case 'tasks':
      return extractTasks(text);
    default:
      return { output: text };
  }
}

export { summarizeText, structureText, polishText, extractTasks };
