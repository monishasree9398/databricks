import React from 'react';
import { ArrowRight } from 'lucide-react';

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
  prompts?: string[];
}

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelect, prompts }) => {
  const defaultPrompts = [
    "What is the single biggest gap blocking my OpenAI internship readiness?",
    "How can I improve my Distributed Systems score from 74% to 85%?",
    "Compare my digital twin against the Stripe Backend Engineer requirements.",
    "Generate a 3-day accelerated study schedule for my upcoming week."
  ];

  const list = prompts && prompts.length > 0 ? prompts : defaultPrompts;

  return (
    <div className="space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
        Suggested Inquiries
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {list.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(prompt)}
            className="group text-left p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-orange/40 hover:bg-orange-50/50 transition-all flex items-center justify-between"
          >
            <span className="text-xs text-slate-700 font-medium group-hover:text-brand-orange transition-colors line-clamp-1">
              {prompt}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange shrink-0 ml-2 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
