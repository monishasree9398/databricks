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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-[#EEF2F6] text-brand-orange shadow-neu-sm font-mono">
              CAREER SPRINT
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              Tier-1 Readiness Sprint
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            Career Roadmap
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#EEF2F6] px-3.5 py-2 rounded-2xl shadow-neu-sm text-emerald-800 font-mono text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live Readiness: {dynamicScore}%</span>
          </div>
        </div>
      </div>

      {/* Progress Overview Bar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-slate-900">Overall Sprint Progress</span>
            <span className="text-xs font-mono text-brand-orange font-bold">
              {overallPercentage}%
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {completedTasksCount}/{totalTasks} Tasks Completed
            </span>
            <span className="flex items-center gap-1.5 font-bold text-brand-orange">
              <Clock className="w-3.5 h-3.5" />
              Week 2 Active
            </span>
          </div>
        </div>

        {/* Sunken Neumorphic Progress Bar */}
        <div className="w-full h-3 rounded-full bg-[#EEF2F6] shadow-neu-pressed p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-orange to-emerald-500 transition-all duration-500 shadow-sm"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </Card>

      {/* 4-Week Sprint Cards */}
      <div className="space-y-5">
        {roadmap.weeks.map(week => (
          <RoadmapWeek key={week.weekNumber} week={week} />
        ))}
      </div>
    </div>
  );
};
