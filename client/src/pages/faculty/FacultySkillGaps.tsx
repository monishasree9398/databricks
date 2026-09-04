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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
              CURRICULUM DEFICIT RADAR
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              Class Bottlenecks
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Class Skill Gaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Identifies common technical vulnerabilities holding back the cohort from clearing technical interview loops.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-orange text-white font-black text-xs shadow-neu-orange transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Accelerated Syllabus</span>
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
