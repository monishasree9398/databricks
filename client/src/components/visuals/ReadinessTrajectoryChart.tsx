import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface TrajectoryPoint {
  week: string;
  score: number;
  benchmark: number;
}

interface ReadinessTrajectoryChartProps {
  currentScore?: number;
  data?: TrajectoryPoint[];
}

export const ReadinessTrajectoryChart: React.FC<ReadinessTrajectoryChartProps> = ({
  currentScore = 78,
  data,
}) => {
  const chartData: TrajectoryPoint[] = data || [
    { week: 'W1', score: 58, benchmark: 80 },
    { week: 'W2', score: 65, benchmark: 80 },
    { week: 'W3', score: 71, benchmark: 80 },
    { week: 'W4 (Now)', score: currentScore, benchmark: 80 },
    { week: 'W5 (Proj)', score: Math.min(100, currentScore + 8), benchmark: 80 },
    { week: 'W6 (Target)', score: 94, benchmark: 80 },
  ];

  return (
    <div className="w-full h-56 relative flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 text-xs font-mono">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
          Readiness Growth Velocity
        </span>
        <div className="flex items-center gap-3 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-brand-orange">
            <span className="w-2 h-2 rounded-full bg-brand-orange inline-block shadow-sm" /> Growth
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-0.5 bg-slate-400 inline-block border-t border-dashed" /> 80% Bar
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5500" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FF5500" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#CAD4E0" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
            axisLine={{ stroke: '#CAD4E0' }}
            tickLine={false}
          />
          <YAxis
            domain={[40, 100]}
            tick={{ fill: '#94A3B8', fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#EEF2F6',
              borderRadius: '16px',
              border: 'none',
              boxShadow: '4px 4px 10px #CAD4E0, -4px -4px 10px #FFFFFF',
              fontSize: '11px',
              fontWeight: 'bold',
            }}
            formatter={(value: number, name: string) => [
              `${value}%`,
              name === 'score' ? 'Readiness' : 'Target Threshold',
            ]}
          />
          <ReferenceLine
            y={80}
            stroke="#94A3B8"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="score"
            name="score"
            stroke="#FF5500"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#scoreGradient)"
            activeDot={{ r: 6, fill: '#FF5500', stroke: '#EEF2F6', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
