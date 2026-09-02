import React, { useState } from 'react';
import { RoadmapWeek as IRoadmapWeek } from '../../types/index.js';
import { Card } from '../common/Card.js';
import { useApp } from '../../context/AppContext.js';
import { CheckCircle2, Circle, ExternalLink, ChevronDown, ChevronUp, Sparkles, TrendingUp } from 'lucide-react';

interface RoadmapWeekProps {
  week: IRoadmapWeek;
  onToggleTask?: (taskId: string) => void;
}

export const RoadmapWeek: React.FC<RoadmapWeekProps> = ({ week, onToggleTask }) => {
  const { completedTasks, toggleTask } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(week.state === 'current' || week.state === 'completed');

  const isTaskCompleted = (taskId: string, defaultCompleted: boolean) => {
    if (completedTasks[taskId] !== undefined) {
      return completedTasks[taskId];
    }
    return defaultCompleted;
  };

  const completedCount = week.tasks.filter(t => isTaskCompleted(t.id, t.completed)).length;
  const progressPercent = week.tasks.length > 0 ? Math.round((completedCount / week.tasks.length) * 100) : 0;
  const isAllDone = completedCount === week.tasks.length;

  const stateColors = {
    completed: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Completed',
    },
    current: {
      badge: 'bg-orange-50 text-brand-orange border-orange-200',
      label: 'Active Sprint',
    },
    upcoming: {
      badge: 'bg-slate-100 text-slate-500 border-slate-200',
      label: 'Upcoming',
    },
  }[isAllDone ? 'completed' : week.state];

  const handleTaskCheck = (taskId: string) => {
    toggleTask(taskId);
    if (onToggleTask) onToggleTask(taskId);
  };

  return (
    <Card className="p-5 transition-all" glow={week.state === 'current' && !isAllDone}>
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-3.5">
          {/* Week Number Icon Badge */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border ${
              isAllDone
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : week.state === 'current'
                ? 'bg-orange-50 text-brand-orange border-orange-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            W{week.weekNumber}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border font-mono ${stateColors.badge}`}>
                {stateColors.label}
              </span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {week.estimatedHoursTotal}h allocated
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                +6% Readiness Boost
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight mt-1 font-sans">
              {week.theme}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl font-normal">
              {week.tagline}
            </p>
          </div>
        </div>

        {/* Right side: Progress + Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-800 font-mono">
              {completedCount} / {week.tasks.length} Completed
            </span>
            <div className="w-24 h-1.5 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${isAllDone ? 'bg-emerald-500' : 'bg-brand-orange'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content: Key Milestone + Task List + Resources */}
      {isExpanded && (
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-5">
          {/* Key Milestone Callout */}
          <div className="p-3.5 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-brand-orange shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider font-mono">
                Target Deliverable
              </span>
              <p className="text-xs font-semibold text-slate-800">
                {week.keyMilestone}
              </p>
            </div>
          </div>

          {/* Tasks Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Actionable Tasks ({completedCount}/{week.tasks.length})
              </h4>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                ✓ Check off tasks to boost live readiness score
              </span>
            </div>

            <div className="space-y-2">
              {week.tasks.map(task => {
                const done = isTaskCompleted(task.id, task.completed);
                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskCheck(task.id)}
                    className={`group cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      done
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-brand-orange/30 hover:bg-slate-50/60'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-slate-400 group-hover:text-slate-700 transition-colors">
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 group-hover:text-brand-orange" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold font-sans tracking-tight transition-colors ${
                            done ? 'text-slate-400 line-through' : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {task.estimatedHours}h
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] text-slate-400">
                          Deliverable: <span className="text-slate-600 font-mono font-medium">{task.deliverable}</span>
                        </span>
                        {task.skillsAddressed.map(sk => (
                          <span
                            key={sk}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200"
                          >
                            Mapped Gap: {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          {week.resources && week.resources.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 font-mono">
                Curated High-Impact Resources
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {week.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-orange/40 hover:bg-orange-50/50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-brand-orange transition-colors line-clamp-1">
                        {res.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {res.provider} • {res.type}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-orange shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
