'use client';

import { Tooltip } from './Tooltip';

interface HelpIconProps {
  content: string;
  isDarkMode?: boolean;
}

export function HelpIcon({ content, isDarkMode = true }: HelpIconProps) {
  return (
    <Tooltip content={content} position="top" isDarkMode={isDarkMode}>
      <span
        role="button"
        tabIndex={0}
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold transition-colors cursor-help ${
          isDarkMode
            ? 'text-slate-400 hover:text-violet-400 hover:bg-slate-800/50'
            : 'text-slate-500 hover:text-violet-600 hover:bg-violet-100'
        }`}
        aria-label="Help"
      >
        ?
      </span>
    </Tooltip>
  );
}
