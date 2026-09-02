import React from 'react';
import { useApp } from '../../context/AppContext.js';
import { useStudentRoadmap } from '../../api/client.js';
import { RoadmapWeek } from '../../components/student/RoadmapWeek.js';
import { Card } from '../../components/common/Card.js';
import { DashboardSkeleton } from '../../components/common/LoadingSkeleton.js';
import { CheckCircle2, Clock, Zap } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { activeStudentId, completedTasks, getDynamicReadinessScore } = useApp();
  const { data: roadmap, isLoading } = useStudentRoadmap(activeStudentId);

  if (isLoading || !roadmap) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  const isTaskCompleted = (taskId: string, defaultCompleted: boolean) => {
    if (completedTasks[taskId] !== undefined) return completedTasks[taskId];
    return defaultCompleted;
  };

  const allTasks = roadmap.weeks.flatMap(w => w.tasks);
  const totalTasks = allTasks.length;
  const completedTasksCount = allTasks.filter(t => isTaskCompleted(t.id, t.completed)).length;
  const overallPercentage = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;
  const dynamicScore = getDynamicReadinessScore(78);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-7 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              CAREER SPRINT
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Closing Gaps for Tier-1 Readiness
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Personalized Career Roadmap
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-800 font-mono text-xs font-bold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Readiness: {dynamicScore}%</span>
          </div>
        </div>
      </div>

      {/* Progress Overview Bar */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Overall Sprint Progress</span>
            <span className="text-xs font-mono text-brand-orange font-bold">
              {overallPercentage}%
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {completedTasksCount}/{totalTasks} Tasks Completed
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              Week 2 Active
            </span>
          </div>
        </div>

        {/* Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-emerald-500 transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </Card>

      {/* 4-Week Sprint Cards */}
      <div className="space-y-4">
        {roadmap.weeks.map(week => (
          <RoadmapWeek key={week.weekNumber} week={week} />
        ))}
      </div>
    </div>
  );
};
