import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage, AIRecommendationCard } from '../../types/index.js';
import { AIBadge } from '../common/AIBadge.js';
import { Sparkles, User, ArrowRight, Clock } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const navigate = useNavigate();
  const isAI = message.role === 'assistant';

  const handleAction = (card: AIRecommendationCard) => {
    if (card.actionType === 'navigate_roadmap') navigate('/roadmap');
    else if (card.actionType === 'navigate_skillgap') navigate('/skill-gap');
  };

  return (
    <div className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
      {/* AI Avatar */}
      {isAI && (
        <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-brand-orange" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-2xl space-y-3 ${isAI ? 'w-full' : ''}`}>
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed ${
            isAI
              ? 'bg-white border border-slate-200 text-slate-800 shadow-sm'
              : 'bg-brand-orange text-white font-medium ml-auto rounded-tr-none shadow-sm'
          }`}
        >
          {isAI && (
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
              <AIBadge label="UNLOCK AI" size="sm" />
              <span className="text-[10px] text-slate-400 font-mono">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}

          <p className="whitespace-pre-wrap">{message.content}</p>

          {/* Highlighted Skills Chips */}
          {isAI && message.highlightedSkills && message.highlightedSkills.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 font-mono">
                Analyzed Factors:
              </span>
              {message.highlightedSkills.map(sk => (
                <span
                  key={sk}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-orange-50 text-brand-orange border border-orange-200"
                >
                  {sk}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Structured Percentage Indicators */}
        {isAI && message.percentages && message.percentages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {message.percentages.map(pct => (
              <div
                key={pct.label}
                className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono line-clamp-1">
                  {pct.label}
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900 font-mono">{pct.value}</span>
                  <span className="text-xs font-bold text-brand-orange font-mono">%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Structured AI Recommendation Action Cards */}
        {isAI && message.recommendationCards && message.recommendationCards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {message.recommendationCards.map(card => (
              <div
                key={card.id}
                onClick={() => handleAction(card)}
                className="group cursor-pointer p-3.5 rounded-xl bg-white border border-slate-200 hover:border-brand-orange/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                      {card.title}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                      {card.impactLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {card.effortLabel}
                  </span>
                  <span className="text-brand-orange font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    {card.actionText}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      )}
    </div>
  );
};
