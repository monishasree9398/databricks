import React, { useState } from 'react';
import { useFacultySkillGaps } from '../../api/client.js';
import { SkillGapMatrix } from '../../components/faculty/SkillGapMatrix.js';
import { TrainingPlanModal } from '../../components/faculty/TrainingPlanModal.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { Sparkles } from 'lucide-react';

export const FacultySkillGaps: React.FC = () => {
  const { data: skillGaps = [], isLoading } = useFacultySkillGaps('cs-401');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              CURRICULUM DEFICIT RADAR
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Class Bottlenecks
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Class Skill Gaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Identifies common technical vulnerabilities holding back the cohort from clearing technical interview loops.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-orange text-white font-bold text-xs hover:bg-brand-orangeHover transition-all shadow-sm self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          Generate Accelerated Syllabus
        </button>
      </div>

      {/* Main Ranked Matrix */}
      <SkillGapMatrix skillGaps={skillGaps} />

      {/* Training Plan Generator Modal */}
      <TrainingPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
