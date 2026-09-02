import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card.js';
import { AIRecommendationCard } from '../../types/index.js';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface NextMoveCardProps {
  title: string;
  summary: string;
  actions: AIRecommendationCard[];
}

export const NextMoveCard: React.FC<NextMoveCardProps> = ({ title, summary, actions }) => {
  const navigate = useNavigate();

  const handleAction = (action: AIRecommendationCard) => {
    if (action.actionType === 'navigate_roadmap') {
      navigate('/roadmap');
    } else if (action.actionType === 'navigate_skillgap') {
      navigate('/skill-gap');
    }
  };

  return (
    <Card className="p-5 md:p-6 overflow-hidden relative border-orange-200 bg-orange-50/30" hover={false}>
      {/* Header */}
      <div className="relative flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-orange text-white font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            PRIORITIZED NEXT MOVE
          </span>
          <span className="text-sm font-bold text-slate-900 font-sans truncate">
            {title}
          </span>
        </div>
        <button
          onClick={() => navigate('/roadmap')}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orangeHover transition-colors font-mono shrink-0"
        >
          <span>Open Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {summary && (
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {summary}
        </p>
      )}

      {/* Actionable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {actions.map((act, idx) => (
          <div
            key={act.id || idx}
            onClick={() => handleAction(act)}
            className="group cursor-pointer p-4 rounded-xl bg-white border border-slate-200 hover:border-brand-orange/40 transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-900 group-hover:text-brand-orange transition-colors truncate">
                  {act.title}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono shrink-0">
                  {act.impactLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {act.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                <Clock className="w-3 h-3" />
                {act.effortLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-brand-orange font-bold text-xs group-hover:translate-x-0.5 transition-transform">
                {act.actionText}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
