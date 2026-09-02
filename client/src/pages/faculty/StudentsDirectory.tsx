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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              COHORT ROSTER
            </span>
            <span className="text-xs text-slate-500 font-mono">
              CS-401 Class Directory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Students & Digital Twins
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Inspect individual student trajectories, verified competencies, and AI diagnostic reports.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search students by name, target role, or university..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setTierFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              tierFilter === 'all' ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Students ({students.length})
          </button>
          <button
            onClick={() => setTierFilter('ready')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              tierFilter === 'ready' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => setTierFilter('almost')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              tierFilter === 'almost' ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Almost Ready
          </button>
          <button
            onClick={() => setTierFilter('needs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              tierFilter === 'needs' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Needs Work
          </button>
        </div>
      </Card>

      {/* Grid of Student Twin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map(student => {
          const statusBadge = {
            'Ready': 'bg-emerald-50 text-emerald-700 border-emerald-200',
            'Almost Ready': 'bg-orange-50 text-brand-orange border-orange-200',
            'Needs Work': 'bg-amber-50 text-amber-800 border-amber-200',
            'Foundational': 'bg-rose-50 text-rose-700 border-rose-200',
          }[student.readinessTier] || 'bg-slate-100 text-slate-600 border-slate-200';

          return (
            <Card
              key={student.id}
              onClick={() => handleInspectStudent(student.id)}
              className="p-5 flex flex-col justify-between cursor-pointer group hover:border-brand-orange/40 transition-all"
            >
              <div>
                {/* Header Profile Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                      alt={student.name}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-orange transition-colors font-sans">
                        {student.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {student.cohort} • GPA {student.academic?.cgpa || 3.9}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xl font-black text-slate-900 font-mono">{student.readinessScore}%</span>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">READY</span>
                  </div>
                </div>

                {/* Target Role & Tier Badge */}
                <div className="flex items-center justify-between gap-2 py-2 border-t border-slate-100 text-xs">
                  <span className="text-brand-orange font-bold truncate">
                    {student.targetRole}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono shrink-0 ${statusBadge}`}>
                    {student.readinessTier}
                  </span>
                </div>

                {/* Top Skills / Key Blocker */}
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Skill Gaps:</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {student.skillGapsCount} Identified
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
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
