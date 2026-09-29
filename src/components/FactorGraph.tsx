import React from 'react';

interface Props { light: number; water: number; co2: number; }

export const FactorGraph: React.FC<Props> = ({ light, water, co2 }) => {
  const data = [
    { label: 'Işık', value: light, cls: 'bg-amber-400' },
    { label: 'Su', value: water, cls: 'bg-sky-400' },
    { label: 'CO₂', value: co2, cls: 'bg-cyan-400' }
  ];
  return (
    <div className="factor-graph hidden xl:block w-[250px] bg-slate-950/90 border border-slate-800 rounded-2xl px-3 py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-black tracking-wide text-slate-300 uppercase">Koşul Göstergesi</span>
        <span className="text-[9px] text-slate-500">model</span>
      </div>
      <div className="space-y-1.5">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-7 text-[10px] font-bold text-slate-400">{item.label}</span>
            <div className="h-2 flex-1 rounded-full bg-slate-800 overflow-hidden">
              <div className={item.cls + ' h-full rounded-full transition-all duration-500'} style={{ width: item.value + '%' }} />
            </div>
            <span className="w-7 text-right text-[10px] font-mono text-slate-400">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
