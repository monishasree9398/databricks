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

  const statusConfig: Record<string, { label: string; color: string; bg: string; text: string; barColor: string }> = {
    strong: {
      label: 'Verified Strong',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      barColor: 'bg-emerald-500',
    },
    have: {
      label: 'Mastered',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      barColor: 'bg-emerald-500',
    },
    improve: {
      label: 'Needs Depth',
      color: 'text-brand-orange',
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-brand-orange',
      barColor: 'bg-brand-orange',
    },
    learn: {
      label: 'To Learn',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-700',
      barColor: 'bg-blue-500',
    },
    missing: {
      label: 'Gap Identified',
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      barColor: 'bg-amber-500',
    },
    learning: {
      label: 'In Progress',
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-700',
      barColor: 'bg-blue-500',
    },
  };

  const currentStatus = statusConfig[status.toString().toLowerCase()] || statusConfig.improve;

  return (
    <div className={`space-y-1.5 ${className}`}>
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
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border font-mono ${currentStatus.bg} ${currentStatus.text}`}>
            {currentStatus.label}
          </span>
          <span className="font-mono text-xs font-bold text-slate-700 min-w-[32px] text-right">
            {level}%
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${currentStatus.barColor}`}
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
