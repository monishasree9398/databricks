import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card.js';
import { InternshipMatch } from '../../types/index.js';
import { MapPin, DollarSign, ArrowUpRight, ShieldCheck, Zap, XCircle } from 'lucide-react';

interface InternshipCardProps {
  match: InternshipMatch;
  compact?: boolean;
}

const companyPhotos: Record<string, string> = {
  'OpenAI': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80',
  'Stripe': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=160&q=80',
  'Anthropic': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=160&q=80',
  'Scale AI': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=160&q=80',
  'Figma': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=160&q=80',
  'Databricks': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=160&q=80',
  'Vercel': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=160&q=80',
  'Supabase': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=160&q=80',
};

export const InternshipCard: React.FC<InternshipCardProps> = ({ match }) => {
  const navigate = useNavigate();

  const statusColors = {
    'Ready': {
      badge: 'bg-emerald-50 text-emerald-700 shadow-neu-sm',
      icon: ShieldCheck,
    },
    'Almost Ready': {
      badge: 'bg-orange-50 text-brand-orange shadow-neu-sm',
      icon: Zap,
    },
    'Needs Work': {
      badge: 'bg-amber-50 text-amber-700 shadow-neu-sm',
      icon: Zap,
    },
    'Foundational': {
      badge: 'bg-rose-50 text-rose-700 shadow-neu-sm',
      icon: XCircle,
    },
  }[match.status] || {
    badge: 'bg-orange-50 text-brand-orange shadow-neu-sm',
    icon: Zap,
  };

  const photo = companyPhotos[match.company] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=160&q=80';

  const handleInspectGaps = () => {
    navigate('/skill-gap');
  };

  return (
    <Card className="p-6 flex flex-col justify-between" hover>
      <div>
        {/* Top bar: Company Photo + Details + Readiness % */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src={photo}
              alt={match.company}
              className="w-12 h-12 rounded-2xl object-cover shadow-neu-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  {match.company}
                </span>
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-mono ${statusColors.badge}`}>
                  {match.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 tracking-tight mt-1">
                {match.role}
              </h4>
            </div>
          </div>

          {/* Readiness Score Metric in Sunken Plate */}
          <div className="flex flex-col items-end px-3 py-1.5 rounded-xl bg-[#EEF2F6] shadow-neu-pressed">
            <div className="flex items-baseline">
              <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
                {match.readinessScore}
              </span>
              <span className="text-xs font-bold text-brand-orange ml-0.5 font-mono">%</span>
            </div>
            <span className="text-[9px] uppercase font-bold text-slate-400 font-mono">
              MATCH
            </span>
          </div>
        </div>

        {/* Location & Compensation */}
        <div className="mt-3.5 flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {match.location}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono font-bold text-slate-800">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            {match.stipend}
          </span>
        </div>

        {/* Matched & Missing Skills Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {match.matchedSkills.slice(0, 3).map(sk => (
            <span
              key={sk}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 shadow-neu-sm font-mono"
            >
              ✓ {sk}
            </span>
          ))}
          {match.missingSkills.slice(0, 2).map(sk => (
            <span
              key={sk}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-orange-50 text-brand-orange shadow-neu-sm font-mono"
            >
              - {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 pt-3.5 border-t border-[#CAD4E0]/40 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 truncate max-w-[200px] font-medium">
          {match.keyBlocker}
        </span>
        <button
          onClick={handleInspectGaps}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-brand-orange transition-all duration-150"
        >
          <span>View Gap</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
