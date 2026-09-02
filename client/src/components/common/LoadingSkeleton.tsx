import React from 'react';

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = 'h-6 w-full' }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`}
    />
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-80 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
        <div className="lg:col-span-2 h-80 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
      </div>
    </div>
  );
};
