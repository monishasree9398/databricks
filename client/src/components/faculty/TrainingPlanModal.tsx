import React, { useState } from 'react';
import { Modal } from '../common/Modal.js';
import { Copy, Check, Send, CheckCircle2 } from 'lucide-react';

interface TrainingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  gapName?: string;
}

export const TrainingPlanModal: React.FC<TrainingPlanModalProps> = ({
  isOpen,
  onClose,
  gapName = 'Distributed Systems & CUDA Kernels',
}) => {
  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const plan = {
    title: `Intervention Plan: Accelerated ${gapName} Mastery`,
    duration: '3-Week Lab Intensive',
    targetStudentCount: 64,
    estimatedReadinessIncrease: '+14% Cohort Average',
    modules: [
      {
        week: 1,
        title: 'Core Fundamentals & Memory Hierarchies',
        topics: ['Shared memory coalescing', 'Warp divergence reduction', 'Vectorized loads/stores'],
        labAssignment: 'Benchmark CUDA matrix multiplication against cuBLAS baseline.'
      },
      {
        week: 2,
        title: 'High-Throughput Distributed Runtime Engineering',
        topics: ['Continuous batching algorithms', 'KV cache PagedAttention mechanics', 'NCCL multi-GPU collectives'],
        labAssignment: 'Implement a minimal 2-GPU tensor parallel inference pipeline with PyTorch.'
      },
      {
        week: 3,
        title: 'Benchmarking, Profiling & Production Deployment',
        topics: ['NVIDIA Nsight compute kernel profiling', 'Triton inference server compilation', 'Dockerized deployment'],
        labAssignment: 'Submit end-to-end load testing telemetry report targeting <20ms p99 latency.'
      }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(plan, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeploy = () => {
    setDeployed(true);
    setTimeout(() => {
      setDeployed(false);
      onClose();
    }, 1800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI-Generated Cohort Training Plan" maxWidth="2xl">
      <div className="space-y-6">
        {/* Banner Header in Sunken Well */}
        <div className="p-5 rounded-2xl bg-[#EEF2F6] shadow-neu-pressed flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
                CURRICULUM AI
              </span>
              <span className="text-[11px] font-bold text-brand-orange uppercase font-mono">CS-401 Cohort</span>
            </div>
            <h4 className="text-base font-black text-slate-900 font-sans">{plan.title}</h4>
            <p className="text-xs text-slate-600 mt-1">{plan.duration} • Targets {plan.targetStudentCount} Students</p>
          </div>
          <div className="text-right shrink-0 px-3 py-2 rounded-xl bg-[#EEF2F6] shadow-neu-sm">
            <span className="text-xl font-black text-emerald-700 font-mono">{plan.estimatedReadinessIncrease}</span>
            <span className="text-[10px] text-slate-400 block uppercase font-bold font-mono">Projected Gain</span>
          </div>
        </div>

        {/* Modules Roadmap */}
        <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
          {plan.modules?.map((m: any) => (
            <div key={m.week} className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-orange font-mono uppercase">
                  Week 0{m.week}
                </span>
                <span className="text-xs font-bold text-slate-900 font-sans">
                  {m.title}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {m.topics?.map((topic: string) => (
                  <span key={topic} className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#EEF2F6] text-slate-700 shadow-neu-pressed">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="pt-2.5 border-t border-[#CAD4E0]/40 text-xs text-slate-600 flex items-start gap-2">
                <strong className="text-slate-900 text-[11px] uppercase font-bold shrink-0 font-mono">Capstone Lab:</strong>
                <span className="text-slate-700">{m.labAssignment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Deployed Notification */}
        {deployed && (
          <div className="p-4 rounded-2xl bg-[#EEF2F6] shadow-neu-sm text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            Training plan synchronized across 64 student roadmaps.
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#CAD4E0]/40 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#EEF2F6] shadow-neu-sm hover:shadow-neu-flat text-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Syllabus'}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={deployed}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDeploy}
              disabled={deployed}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-orange text-white shadow-neu-orange transition-all disabled:opacity-75"
            >
              {deployed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Deployed</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Deploy to Students</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
