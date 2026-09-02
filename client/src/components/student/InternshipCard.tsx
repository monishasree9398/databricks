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

export const InternshipCard: React.FC<InternshipCardProps> = ({ match, compact = false }) => {
  const navigate = useNavigate();

  const statusColors = {
    'Ready': {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
    },
    'Almost Ready': {
      badge: 'bg-orange-50 text-brand-orange border-orange-200',
      icon: Zap,
    },
    'Needs Work': {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Zap,
    },
    'Foundational': {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: XCircle,
    },
  }[match.status] || {
    badge: 'bg-orange-50 text-brand-orange border-orange-200',
    icon: Zap,
  };

  const photo = companyPhotos[match.company] || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=160&q=80';

  const handleInspectGaps = () => {
    navigate('/skill-gap');
  };

  return (
    <Card className="p-5 flex flex-col justify-between" hover>
      <div>
        {/* Top bar: Company Photo + Details + Readiness % */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={photo}
              alt={match.company}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  {match.company}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border font-mono ${statusColors.badge}`}>
                  {match.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 tracking-tight mt-0.5">
                {match.role}
              </h4>
            </div>
          </div>

          {/* Readiness Score Metric */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">
                {match.readinessScore}
              </span>
              <span className="text-xs font-bold text-brand-orange ml-0.5 font-mono">%</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
              MATCH
            </span>
          </div>
        </div>

        {/* Location & Compensation */}
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {match.location}
          </span>
          <span className="inline-flex items-center gap-1 font-mono font-semibold text-slate-700">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            {match.stipend}
          </span>
        </div>

        {/* Matched & Missing Skills Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {match.matchedSkills.slice(0, 3).map(sk => (
            <span
              key={sk}
              className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono"
            >
              ✓ {sk}
            </span>
          ))}
          {match.missingSkills.slice(0, 2).map(sk => (
            <span
              key={sk}
              className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono"
            >
              - {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 truncate max-w-[200px] font-medium">
          {match.keyBlocker}
        </span>
        <button
          onClick={handleInspectGaps}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 text-slate-700 hover:bg-brand-orange hover:text-white border border-slate-200 hover:border-brand-orange transition-all duration-150"
        >
          <span>View Gap</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
