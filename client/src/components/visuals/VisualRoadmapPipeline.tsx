import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Lock, Sparkles, ChevronRight, Zap } from 'lucide-react';

interface StageProps {
  weekNumber: number;
  title: string;
  focus: string;
  deliverable: string;
  status: 'completed' | 'active' | 'upcoming';
  progress: number;
  onSelect?: () => void;
  isSelected?: boolean;
}

interface VisualRoadmapPipelineProps {
  activeWeek?: number;
  onSelectWeek?: (weekNumber: number) => void;
}

export const VisualRoadmapPipeline: React.FC<VisualRoadmapPipelineProps> = ({
  activeWeek = 2,
  onSelectWeek,
}) => {
  const stages: StageProps[] = [
    {
      weekNumber: 1,
      title: 'CUDA Foundations',
      focus: 'Memory hierarchy & shared mem kernels',
      deliverable: 'Custom SGEMM kernel with 85% cuBLAS speed',
      status: 'completed',
      progress: 100,
    },
    {
      weekNumber: 2,
      title: 'Distributed Systems',
      focus: 'AllReduce, NCCL rings & PyTorch DDP',
      deliverable: 'Multi-GPU Ring-AllReduce benchmark',
      status: 'active',
      progress: 60,
    },
    {
      weekNumber: 3,
      title: 'High-Throughput Serving',
      focus: 'PagedAttention & continuous batching',
      deliverable: 'vLLM custom inference engine deployment',
      status: 'upcoming',
      progress: 0,
    },
    {
      weekNumber: 4,
      title: 'Capstone & Interview Gate',
      focus: 'Production stress test & technical defense',
      deliverable: 'Verified Tier-1 AI Systems Readiness Badge',
      status: 'upcoming',
      progress: 0,
    },
  ];

  return (
    <div className="w-full p-6 rounded-3xl bg-[#EEF2F6] shadow-neu-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#CAD4E0]/40 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#EEF2F6] shadow-neu-sm text-brand-orange">
            <Zap className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              4-Week Verification Pipeline
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Live progression towards Tier-1 hiring readiness
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 shadow-neu-sm font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> W1 Verified
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-orange-50 text-brand-orange shadow-neu-sm font-mono flex items-center gap-1">
            <Flame className="w-3 h-3 animate-pulse" /> W2 In Progress
          </span>
        </div>
      </div>

      {/* Visual Pipeline Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {stages.map((stage, idx) => {
          const isCurrentActive = activeWeek === stage.weekNumber;
          return (
            <motion.div
              key={stage.weekNumber}
              whileHover={{ y: -3 }}
              onClick={() => onSelectWeek?.(stage.weekNumber)}
              className={`p-4 rounded-2xl flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
                stage.status === 'completed'
                  ? 'bg-[#EEF2F6] shadow-neu-sm border-t-2 border-emerald-500'
                  : stage.status === 'active'
                  ? 'bg-[#EEF2F6] shadow-neu-flat border-2 border-brand-orange ring-2 ring-brand-orange/20'
                  : 'bg-[#EEF2F6]/60 shadow-neu-sm opacity-80'
              }`}
            >
              {/* Header inside node */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black font-mono shadow-neu-sm bg-[#EEF2F6]">
                  WEEK 0{stage.weekNumber}
                </span>

                {stage.status === 'completed' && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Done
                  </span>
                )}
                {stage.status === 'active' && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-brand-orange font-mono">
                    <Flame className="w-3.5 h-3.5 animate-pulse" /> Active
                  </span>
                )}
                {stage.status === 'upcoming' && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 font-mono">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>

              {/* Title & Focus */}
              <div className="space-y-1.5 mb-4">
                <h4 className="text-sm font-black text-slate-900 tracking-tight">
                  {stage.title}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                  {stage.focus}
                </p>
              </div>

              {/* Progress bar and deliverable pill */}
              <div className="space-y-2 pt-2 border-t border-[#CAD4E0]/30">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-slate-400">Progress</span>
                  <span className={stage.status === 'completed' ? 'text-emerald-700' : stage.status === 'active' ? 'text-brand-orange' : 'text-slate-400'}>
                    {stage.progress}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#EEF2F6] shadow-neu-pressed p-0.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      stage.status === 'completed'
                        ? 'bg-emerald-500'
                        : stage.status === 'active'
                        ? 'bg-brand-orange'
                        : 'bg-slate-300'
                    }`}
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
