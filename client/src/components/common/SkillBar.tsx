import React from 'react';
import { motion } from 'framer-motion';
import { StudentSkill, SkillStatus } from '../../types/index.js';

interface SkillBarProps {
  skill: StudentSkill | {
    skillName: string;
    category?: string;
    currentLevel: number;
    targetLevel?: number;
    status?: SkillStatus | string;
    evidence?: string;
    verifiedProjectsCount?: number;
  };
  showDetails?: boolean;
  className?: string;
}

export const SkillBar: React.FC<SkillBarProps> = ({ skill, showDetails = true, className = '' }) => {
  const name = 'name' in skill ? skill.name : skill.skillName;
  const level = 'level' in skill ? skill.level : skill.currentLevel;
  const status = skill.status || (level >= 80 ? 'strong' : level >= 65 ? 'improve' : 'learning');
  const verifiedCount = 'verifiedProjectsCount' in skill ? skill.verifiedProjectsCount : undefined;

  const statusConfig: Record<string, { label: string; bg: string; text: string; barColor: string }> = {
    strong: {
      label: 'Verified Strong',
      bg: 'bg-emerald-50 text-emerald-700',
      text: 'text-emerald-700',
      barColor: 'bg-emerald-500',
    },
    have: {
      label: 'Mastered',
      bg: 'bg-emerald-50 text-emerald-700',
      text: 'text-emerald-700',
      barColor: 'bg-emerald-500',
    },
    improve: {
      label: 'Needs Depth',
      bg: 'bg-orange-50 text-brand-orange',
      text: 'text-brand-orange',
      barColor: 'bg-brand-orange',
    },
    learn: {
      label: 'To Learn',
      bg: 'bg-blue-50 text-blue-700',
      text: 'text-blue-700',
      barColor: 'bg-blue-500',
    },
    missing: {
      label: 'Gap Identified',
      bg: 'bg-amber-50 text-amber-700',
      text: 'text-amber-700',
      barColor: 'bg-amber-500',
    },
    learning: {
      label: 'In Progress',
      bg: 'bg-blue-50 text-blue-700',
      text: 'text-blue-700',
      barColor: 'bg-blue-500',
    },
  };

  const currentStatus = statusConfig[status.toString().toLowerCase()] || statusConfig.improve;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 tracking-tight text-sm line-clamp-1">{name}</span>
          {verifiedCount !== undefined && verifiedCount > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              • {verifiedCount} verified
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold shadow-neu-sm font-mono ${currentStatus.bg}`}>
            {currentStatus.label}
          </span>
          <span className="font-mono text-xs font-bold text-slate-800 min-w-[32px] text-right">
            {level}%
          </span>
        </div>
      </div>

      {/* Sunken Neumorphic Progress Track */}
      <div className="relative h-2.5 w-full rounded-full bg-[#EEF2F6] shadow-neu-pressed overflow-hidden p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${currentStatus.barColor} shadow-sm`}
        />
      </div>

      {'evidence' in skill && skill.evidence && showDetails && (
        <p className="text-[11px] text-slate-500 line-clamp-1 italic font-medium">
          Evidence: {skill.evidence}
        </p>
      )}
    </div>
  );
};
