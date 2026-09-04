import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkillRadarChartProps {
  skills: { name: string; level: number }[];
  targetThreshold?: number;
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({
  skills,
  targetThreshold = 80,
}) => {
  const data = skills.slice(0, 6).map(s => ({
    subject: s.name.length > 14 ? s.name.slice(0, 12) + '..' : s.name,
    current: s.level,
    target: targetThreshold,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-64 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#CAD4E0" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#94A3B8', fontSize: 9 }}
          />
          <Radar
            name="Target Bar"
            dataKey="target"
            stroke="#94A3B8"
            strokeDasharray="4 4"
            fill="#CBD5E1"
            fillOpacity={0.2}
          />
          <Radar
            name="Current Proficiency"
            dataKey="current"
            stroke="#FF5500"
            strokeWidth={2.5}
            fill="#FF5500"
            fillOpacity={0.35}
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
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute bottom-1 right-2 flex items-center gap-3 text-[10px] font-mono font-bold">
        <span className="flex items-center gap-1 text-brand-orange">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-orange inline-block" /> Current
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block border border-dashed border-slate-500" /> Target (80%)
        </span>
      </div>
    </div>
  );
};
