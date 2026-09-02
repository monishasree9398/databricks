import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.js';
import { useStudentInternshipMatches } from '../../api/client.js';
import { InternshipCard } from '../../components/student/InternshipCard.js';
import { Card } from '../../components/common/Card.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { Search, Briefcase } from 'lucide-react';

export const InternshipMatches: React.FC = () => {
  const { activeStudentId } = useApp();
  const { data: matches = [], isLoading } = useStudentInternshipMatches(activeStudentId);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const filteredMatches = matches.filter(m => {
    const matchesSearch =
      m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.matchedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTier =
      selectedTier === 'all' ||
      (selectedTier === 'ready' && m.status === 'Ready') ||
      (selectedTier === 'almost' && m.status === 'Almost Ready') ||
      (selectedTier === 'needs_work' && m.status === 'Needs Work');

    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              OPPORTUNITY RADAR
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Live Recruiter Feeds
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Internship Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Calculated by cross-referencing your digital twin telemetry against active production engineering requirements.
          </p>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search company, role, or specific skills (e.g. CUDA, React, PyTorch)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
          />
        </div>

        {/* Tier filter buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTier === 'all'
                ? 'bg-brand-orange text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Roles ({matches.length})
          </button>
          <button
            onClick={() => setSelectedTier('ready')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTier === 'ready'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Ready (80%+)
          </button>
          <button
            onClick={() => setSelectedTier('almost')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTier === 'almost'
                ? 'bg-brand-orange text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Almost Ready (68-79%)
          </button>
        </div>
      </Card>

      {/* Grid of Internship Cards */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMatches.map(match => (
            <InternshipCard key={match.internshipId} match={match} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center space-y-3">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto stroke-[1.5]" />
          <h3 className="text-base font-bold text-slate-900 font-sans">
            No matching internships found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to view all opportunities.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedTier('all'); }}
            className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </Card>
      )}
    </div>
  );
};
