import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface CohortDeficitItem {
  skill: string;
  classAvg: number;
  benchmark: number;
  deficitStudents: number;
}

interface CohortDeficitChartProps {
  data?: CohortDeficitItem[];
}

export const CohortDeficitChart: React.FC<CohortDeficitChartProps> = ({ data }) => {
  const chartData: CohortDeficitItem[] = data || [
    { skill: 'CUDA Kernels', classAvg: 38, benchmark: 80, deficitStudents: 64 },
    { skill: 'Dist. Training', classAvg: 44, benchmark: 80, deficitStudents: 52 },
    { skill: 'Triton / JIT', classAvg: 49, benchmark: 80, deficitStudents: 47 },
    { skill: 'PyTorch Profiling', classAvg: 58, benchmark: 80, deficitStudents: 38 },
    { skill: 'vLLM Serving', classAvg: 64, benchmark: 80, deficitStudents: 29 },
  ];

  return (
    <div className="w-full h-64 relative flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 text-xs font-mono">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
          Class Proficiency vs Industry Benchmark (80%)
        </span>
        <div className="flex items-center gap-3 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-brand-orange">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-orange inline-block" /> Class Avg
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block border border-dashed border-slate-400" /> Target Bar
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#CAD4E0" vertical={false} />
          <XAxis
            dataKey="skill"
            tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
            axisLine={{ stroke: '#CAD4E0' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
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
              name === 'classAvg' ? 'Class Average' : 'Benchmark',
            ]}
          />
          <ReferenceLine
            y={80}
            stroke="#94A3B8"
            strokeDasharray="3 3"
            strokeWidth={1.5}
          />
          <Bar
            dataKey="classAvg"
            name="classAvg"
            fill="#FF5500"
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="benchmark"
            name="benchmark"
            fill="#CAD4E0"
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
            opacity={0.6}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
