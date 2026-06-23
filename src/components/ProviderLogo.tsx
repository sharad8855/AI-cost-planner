import React from 'react';

interface ProviderLogoProps {
  provider: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function ProviderLogo({ provider, className = '', size = 'md' }: ProviderLogoProps) {
  const norm = provider.toLowerCase();

  const sizeClasses = {
    xs: 'w-4 h-4 text-[10px]',
    sm: 'w-5 h-5 text-xs',
    md: 'w-7 h-7 text-sm',
    lg: 'w-10 h-10 text-lg',
  };

  const activeSize = sizeClasses[size];

  if (norm.includes('openai')) {
    return (
      <div id="logo-openai" className={`inline-flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 ${activeSize} ${className}`}>
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[70%] h-[70%]">
          <path d="M22.28 11.41a3.02 3.02 0 0 0-.52-1.63 3 3 0 0 0-1.89-1.3l.11-.64a3 3 0 0 0-.64-2.52 3 3 0 0 0-2.22-1.01l-.54.08a3 3 0 0 0-1.25-1.9 3.02 3.02 0 0 0-2.48-.19l-.53-.41a2.97 2.97 0 0 0-3.66.11l-.44.3a3 3 0 0 0-2.56.63 3 3 0 0 0-.85 2.29l-.02.59a3 3 0 0 0-1.89 1.34A3.01 3.01 0 0 0 3 12.63l.53.42a3 3 0 0 0 .52 1.63 3 3 0 0 0 1.89 1.3l-.11.64a3 3 0 0 0 .64 2.52 3 3 0 0 0 2.22 1l.54-.08a3 3 0 0 0 1.25 1.9 3 3 0 0 0 2.48.18l.53.42a3 3 0 0 0 1.83.62c.67 0 1.33-.23 1.83-.62l.44-.3a3 3 0 0 0 2.56-.63 3 3 0 0 0 .85-2.29l.02-.59a3 3 0 0 0 1.89-1.34A3 3 0 0 0 21 11.37l-.72-.38zm-1.8-.75c-.24.13-.5.2-.78.2h-.14a.75.75 0 0 1-.65-.38.75.75 0 0 1 0-.75l.93-1.61a1.5 1.5 0 0 0-.25-1.85 1.5 1.5 0 0 0-1.78-.23l-.14.07a.75.75 0 0 1-.74 0 .75.75 0 0 1-.37-.65v-1.85a1.5 1.5 0 0 0-1.07-1.44 1.51 1.51 0 0 0-1.73.57l-.93 1.62a.75.75 0 0 1-.65.37.75.75 0 0 1-.65-.37L10.9 3.2a1.5 1.5 0 0 0-2.8 1.02V6.1a.75.75 0 0 1-.37.65.75.75 0 0 1-.75 0l-1.61-.93a1.5 1.5 0 0 0-1.85.25A1.5 1.5 0 0 0 3.3 7.9l.06.14a.75.75 0 0 1-.38.99.75.75 0 0 1-1.01-.34A1.5 1.5 0 0 0 1 10.13a1.5 1.5 0 0 0 1 .87l1.86.53a.75.75 0 0 1 .53.92.75.75 0 0 1-.92.53l-1.86-.53a1.5 1.5 0 0 0-1.04 2.12v.11c.21.43.57.77 1 .95l1.62.93a.75.75 0 0 1 .37.65.75.75 0 0 1-.37.65l-1.62.93a1.5 1.5 0 0 0-.58 2l.06.1c.23.4.58.7.99.85a1.5 1.5 0 0 0 1.85-.25l1.01-1.01a.75.75 0 0 1 1.06 1.06l-1.01 1.01c-.4.4-.95.63-1.52.63-.3 0-.6-.07-.87-.2a1.5 1.5 0 0 0-.57-2.07l.93-1.62a.75.75 0 0 1 .65-.37.75.75 0 0 1 .65.37l.93 1.62a1.5 1.5 0 0 0 2.07.57l.11-.06c.4-.23.71-.58.85-.99a1.5 1.5 0 0 0-.25-1.58l-1.01-1.01A.75.75 0 0 1 11.23 14c.3-.3.73-.39 1.1-.24.38.14.65.48.71.88l.22 1.86a1.5 1.5 0 0 0 1.44 1.3c.12 0 .23-.01.35-.04l.11-.06a1.51 1.51 0 0 0 .58-2.08l-.93-1.62a.75.75 0 0 1 .37-1.02c.34-.14.73-.08 1.01.16l1.3 1.3c.43.34.98.47 1.51.35a1.51 1.51 0 0 0 .99-1.3v-.11a1.51 1.51 0 0 0-1.44-1.3l-1.86-.22a.75.75 0 0 1-.66-.64.75.75 0 0 1 .49-.8l1.86-.22a1.5 1.5 0 0 0 1.3-1.44c.03-.68-.26-1.34-.78-1.78z" />
        </svg>
      </div>
    );
  }

  if (norm.includes('google')) {
    return (
      <div id="logo-google" className={`inline-flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400 ${activeSize} ${className}`}>
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[70%] h-[70%]">
          <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.737-.08-1.3-.176-1.859H12.24z" />
        </svg>
      </div>
    );
  }

  if (norm.includes('anthropic')) {
    return (
      <div id="logo-anthropic" className={`inline-flex items-center justify-center font-bold font-serif rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 ${activeSize} ${className}`}>
        AI
      </div>
    );
  }

  if (norm.includes('deepseek')) {
    return (
      <div id="logo-deepseek" className={`inline-flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 ${activeSize} ${className}`}>
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[70%] h-[70%]">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1zm2.34-5.2c-.39.52-1 .92-1.34 1.4-.33.48-.33.91-.33 1.8h-1.34c0-1.12.06-1.56.57-2.1.49-.53 1.15-1 1.45-1.4.3-.41.45-.85.45-1.35 0-1.11-.9-2-2-2s-2 .89-2 2H8.11c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .9-.33 1.74-.77 2.65z" />
        </svg>
      </div>
    );
  }

  if (norm.includes('meta') || norm.includes('llama')) {
    return (
      <div id="logo-meta" className={`inline-flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 ${activeSize} ${className}`}>
        <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-[70%] h-[70%]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5c-1.5 0-3 1.5-4.5 4.5-1.5-3-3-4.5-4.5-4.5C5.07 7.5 3 9.57 3 12c0 2.43 2.07 4.5 4.5 4.5 1.5 0 3-1.5 4.5-4.5 1.5 3 3 4.5 4.5 4.5 2.43 0 4.5-2.07 4.5-4.5 0-2.43-2.07-4.5-4.5-4.5z" />
        </svg>
      </div>
    );
  }

  if (norm.includes('mistral')) {
    return (
      <div id="logo-mistral" className={`inline-flex items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 ${activeSize} ${className}`}>
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-[70%] h-[70%]">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 10h-2.5v4.5h-1V13H11v4.5h-1V13H7v-1h2.5V7.5h1V12h2.5V7.5h1V12H17v1z" />
        </svg>
      </div>
    );
  }

  if (norm.includes('glm') || norm.includes('zhipu')) {
    return (
      <div id="logo-glm" className={`inline-flex items-center justify-center font-black rounded-lg bg-red-50 text-red-600 dark:bg-red-950/45 dark:text-red-400 ${activeSize} ${className}`}>
        Z
      </div>
    );
  }

  if (norm.includes('qwen') || norm.includes('alibaba')) {
    return (
      <div id="logo-qwen" className={`inline-flex items-center justify-center font-black rounded-lg bg-indigo-50 text-indigo-650 dark:bg-indigo-950/45 dark:text-indigo-400 ${activeSize} ${className}`}>
        Q
      </div>
    );
  }

  if (norm.includes('cohere')) {
    return (
      <div id="logo-cohere" className={`inline-flex items-center justify-center font-bold font-mono rounded-lg bg-cyan-50 text-cyan-700 dark:bg-cyan-950/45 dark:text-cyan-400 ${activeSize} ${className}`}>
        C
      </div>
    );
  }

  if (norm.includes('xai') || norm.includes('grok')) {
    return (
      <div id="logo-xai" className={`inline-flex items-center justify-center font-black rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 ${activeSize} ${className}`}>
        X
      </div>
    );
  }

  if (norm.includes('moonshot') || norm.includes('kimi')) {
    return (
      <div id="logo-kimi" className={`inline-flex items-center justify-center font-black rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/45 dark:text-teal-450 ${activeSize} ${className}`}>
        K
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ${activeSize} ${className}`}>
      {provider[0] || 'AI'}
    </div>
  );
}
