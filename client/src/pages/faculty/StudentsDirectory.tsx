import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFacultyStudents } from '../../api/client.js';
import { useApp } from '../../context/AppContext.js';
import { Card } from '../../components/common/Card.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import {
  Search,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const StudentsDirectory: React.FC = () => {
  const { data: students, isLoading } = useFacultyStudents('cs-401');
  const { setActiveStudentId } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'ready' | 'almost' | 'needs'>('all');

  if (isLoading || !students) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const filteredStudents = students.filter(st => {
    const matchesSearch =
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.targetRole.toLowerCase().includes(search.toLowerCase()) ||
      (st.academic?.university || '').toLowerCase().includes(search.toLowerCase());

    const matchesTier =
      tierFilter === 'all'
        ? true
        : tierFilter === 'ready'
        ? st.readinessTier === 'Ready'
        : tierFilter === 'almost'
        ? st.readinessTier === 'Almost Ready'
        : st.readinessTier === 'Needs Work' || st.readinessTier === 'Foundational';

    return matchesSearch && matchesTier;
  });

  const handleInspectStudent = (studentId: string) => {
    setActiveStudentId(studentId);
    navigate(`/faculty/student/${studentId}/360`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
              COHORT ROSTER
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              CS-401 Class Directory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Students & Digital Twins
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Inspect individual student trajectories, verified competencies, and AI diagnostic reports.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search students by name, target role, or university..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#EEF2F6] shadow-neu-pressed rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setTierFilter('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              tierFilter === 'all'
                ? 'bg-brand-orange text-white shadow-neu-orange'
                : 'bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-slate-600'
            }`}
          >
            All Students ({students.length})
          </button>
          <button
            onClick={() => setTierFilter('ready')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              tierFilter === 'ready'
                ? 'bg-emerald-600 text-white shadow-neu-sm'
                : 'bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-slate-600'
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => setTierFilter('almost')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              tierFilter === 'almost'
                ? 'bg-brand-orange text-white shadow-neu-orange'
                : 'bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-slate-600'
            }`}
          >
            Almost Ready
          </button>
          <button
            onClick={() => setTierFilter('needs')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              tierFilter === 'needs'
                ? 'bg-amber-600 text-white shadow-neu-sm'
                : 'bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-slate-600'
            }`}
          >
            Needs Work
          </button>
        </div>
      </Card>

      {/* Grid of Student Twin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => {
          const statusBadge = {
            'Ready': 'bg-emerald-50 text-emerald-700 shadow-neu-sm',
            'Almost Ready': 'bg-orange-50 text-brand-orange shadow-neu-sm',
            'Needs Work': 'bg-amber-50 text-amber-800 shadow-neu-sm',
            'Foundational': 'bg-rose-50 text-rose-700 shadow-neu-sm',
          }[student.readinessTier] || 'bg-[#EEF2F6] text-slate-600 shadow-neu-sm';

          return (
            <Card
              key={student.id}
              onClick={() => handleInspectStudent(student.id)}
              className="p-6 flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div>
                {/* Header Profile Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                      alt={student.name}
                      className="w-12 h-12 rounded-2xl object-cover shadow-neu-sm shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-brand-orange transition-colors font-sans">
                        {student.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {student.cohort} • GPA {student.academic?.cgpa || 3.9}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 px-2.5 py-1 rounded-xl bg-[#EEF2F6] shadow-neu-pressed">
                    <span className="text-lg font-black text-slate-900 font-mono">{student.readinessScore}%</span>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold">READY</span>
                  </div>
                </div>

                {/* Target Role & Tier Badge */}
                <div className="flex items-center justify-between gap-2 py-2.5 border-t border-[#CAD4E0]/40 text-xs">
                  <span className="text-brand-orange font-bold truncate">
                    {student.targetRole}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold font-mono shrink-0 ${statusBadge}`}>
                    {student.readinessTier}
                  </span>
                </div>

                {/* Top Skills / Key Blocker */}
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Skill Gaps:</span>
                    <span className="font-bold text-slate-800 font-mono">
                      {student.skillGapsCount} Identified
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-5 pt-3.5 border-t border-[#CAD4E0]/40 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{student.matchedCount} Matched Roles</span>
                <span className="inline-flex items-center gap-1 text-brand-orange font-bold text-xs group-hover:translate-x-0.5 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect 360</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
