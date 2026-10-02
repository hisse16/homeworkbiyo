import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Zap, HelpCircle, Check, ChevronRight } from 'lucide-react';

interface Props {
  onGoToFactors: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

interface CalvinStep {
  id: number;
  title: string;
  chemicalEq: string;
  description: string;
  visualTarget: 'co2_entry' | 'rubisco' | 'atp_use' | 'nadph_use' | 'pgal_formed' | 'glucose_exit' | 'rubp_regen';
}

const CALVIN_STEPS: CalvinStep[] = [
  {
    id: 1,
    title: '1. CO₂ Stroma Sıvısına Girer',
    chemicalEq: 'Atmosferden 3 × CO₂ (1C) girişi',
    description: 'Yaprak gözeneklerinden (stoma) giren karbondioksit gazı, kloroplastın stroma sıvısına difüze olur.',
    visualTarget: 'co2_entry'
  },
  {
    id: 2,
    title: '2. Karbon Bağlanması (Rubisko Enzimi)',
    chemicalEq: '3 CO₂ + 3 RuBP (5C) → 6 × 3-PGA (3C)',
    description: 'Rubisko enzimi, her bir CO₂ molekülünü 5 karbonlu RuBP alıcısına bağlar. Hızla parçalanarak 6 adet 3 karbonlu PGA molekülü oluşur.',
    visualTarget: 'rubisco'
  },
  {
    id: 3,
    title: '3. ATP Enerjisi Harcanır',
    chemicalEq: '6 × 3-PGA + 6 ATP → 6 × Bisfosfogliserat + 6 ADP',
    description: 'Işık reaksiyonlarından stromaya aktarılan 6 adet ATP harcanarak karbon iskeletine yüksek enerjili fosfat grupları bağlanır.',
    visualTarget: 'atp_use'
  },
  {
    id: 4,
    title: '4. NADPH Hidrojen ve Elektron Verir (İndirgenme)',
    chemicalEq: '6 Bisfosfogliserat + 6 NADPH → 6 PGAL + 6 NADP⁺',
    description: 'Işık evresinden gelen 6 adet NADPH molekülü hidrojen ve elektronlarını aktararak karbon bileşiğini indirger. 6 adet PGAL üretilir.',
    visualTarget: 'nadph_use'
  },
  {
    id: 5,
    title: '5. Temel Organik Yapı Taşı: PGAL Oluşur',
    chemicalEq: '6 × PGAL (Fosfogliseraldehit · 3C)',
    description: 'Fotosentezin en kritik ara organik maddesi olan PGAL (3 karbonlu şeker fosfat) tamamlanır. Bu molekül tüm besinlerin atasıdır.',
    visualTarget: 'pgal_formed'
  },
  {
    id: 6,
    title: '6. Bir Kısım PGAL Organik Besin İçin Döngüden Ayrılır',
    chemicalEq: '1 PGAL Döngüden Çıkar → Glikoz, Sukroz, Nişasta, Yağ, Amino Asit',
    description: 'Oluşan 6 PGAL molekülünden 1 tanesi döngüden çıkar. 2 adet PGAL birleştiğinde 6 karbonlu glikoz (C₆H₁₂O₆) sentezlenir!',
    visualTarget: 'glucose_exit'
  },
  {
    id: 7,
    title: '7. Kalan PGAL’ler ile RuBP Yenilenir (Döngü Başa Döner)',
    chemicalEq: '5 PGAL (15C) + 3 ATP → 3 RuBP (15C) + 3 ADP',
    description: 'Döngüde kalan 5 PGAL molekülü, ışık evresinden gelen 3 ATP daha harcanarak tekrar 3 adet RuBP’ye dönüştürülür ve döngü yeni CO₂’ler için baştan başlar!',
    visualTarget: 'rubp_regen'
  }
];

export const CalvinCycleStage: React.FC<Props> = ({
  onGoToFactors,
  voiceEnabled,
  onSpeakText
}) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const activeStep = CALVIN_STEPS[activeStepIdx];

  // Auto-cycle through the 7 steps
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % CALVIN_STEPS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const selectStep = (idx: number) => {
    setIsPlaying(false);
    setActiveStepIdx(idx);
    if (voiceEnabled) {
      onSpeakText(`${CALVIN_STEPS[idx].title}. ${CALVIN_STEPS[idx].description}`);
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>04 · CALVİN DÖNGÜSÜ</span>
            <span>•</span>
            <span>7 ADIMDA KARBON DÖNÜŞÜMÜ (PGAL MERKEZLİ)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Karbondioksit (CO₂) <span className="text-[#166534]">PGAL ve Glikoza</span> Nasıl Dönüşür?
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Işık evresinden gelen <b>ATP</b> ve <b>NADPH</b> stromada tüketilir. CO₂ gazı Rubisko enzimiyle tutulup temel yapı taşı olan <b>PGAL</b>’e dönüştürülür.
          </p>
        </div>

        {/* Live Controller Buttons */}
        <div className="flex items-center gap-2 shrink-0 bg-[#f7faf5] border border-[#dce6da] p-1.5 rounded-2xl">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`h-11 px-4 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-[#166534] text-white shadow-md'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-700" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? 'DÖNGÜYÜ DURDUR' : 'DÖNGÜYÜ OYNAT'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStepIdx(0);
            }}
            className="h-11 px-3 rounded-xl bg-white hover:bg-[#edf5eb] border border-[#dce6da] text-[#3c5e48] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Başa Al</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Calvin Biochemical Animated Cycle + Step Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: Scientific Cycle Diagram with Active Step Particles (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Stroma Location Indicator */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl text-xs font-extrabold text-[#166534]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
              <span>ORTAM: STROMA (Kloroplast İç Sıvısı · Enzim: Rubisko)</span>
            </div>
            <span className="text-[11px] font-mono text-[#15803d]">Temel Ürün: PGAL (Fosfogliseraldehit)</span>
          </div>

          {/* SVG Scientific Calvin Cycle Diagram */}
          <div className="w-full aspect-[16/10] relative flex items-center justify-center my-2">
            <svg viewBox="0 0 860 480" className="w-full h-full select-none">
              <defs>
                <radialGradient id="calvinCenterGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#dcfce7" />
                </radialGradient>
              </defs>

              {/* 1. INCOMING BRIDGE: ATP and NADPH arriving from Light Reactions (Left side) */}
              <g className="drop-shadow-sm">
                <rect x="20" y="140" width="185" height="190" rx="18" fill="#f8faf6" stroke="#bbf7d0" strokeWidth="2" />
                <text x="112" y="165" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="extrabold">
                  IŞIK EVRESİNDEN GELENLER
                </text>

                {/* ATP Box */}
                <g className={activeStepIdx === 2 || activeStepIdx === 6 ? 'animate-pulse-subtle' : ''}>
                  <rect x="35" y="180" width="155" height="44" rx="10" fill="#fff7ed" stroke="#fb923c" strokeWidth={activeStepIdx === 2 || activeStepIdx === 6 ? 3 : 1.5} />
                  <text x="112" y="198" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="black">
                    ⚡ 9 × ATP (Enerji)
                  </text>
                  <text x="112" y="214" textAnchor="middle" fill="#ea580c" fontSize="10">
                    6’sı İndirgenme, 3’ü RuBP için
                  </text>
                </g>

                {/* NADPH Box */}
                <g className={activeStepIdx === 3 ? 'animate-pulse-subtle' : ''}>
                  <rect x="35" y="240" width="155" height="44" rx="10" fill="#f5f3ff" stroke="#a78bfa" strokeWidth={activeStepIdx === 3 ? 3 : 1.5} />
                  <text x="112" y="258" textAnchor="middle" fill="#5b21b6" fontSize="12" fontWeight="black">
                    🧪 6 × NADPH (H⁺ & e⁻)
                  </text>
                  <text x="112" y="274" textAnchor="middle" fill="#7c3aed" fontSize="10">
                    Karbonu İndirger → PGAL Yapar
                  </text>
                </g>

                <text x="112" y="315" textAnchor="middle" fill="#64748b" fontSize="9">
                  (ADP ve NADP⁺ tilakoite döner)
                </text>

                {/* Arrows to cycle */}
                <path d="M 190 202 C 235 202, 265 210, 310 220" fill="none" stroke="#ea580c" strokeWidth="3" strokeDasharray="4 4" />
                <path d="M 190 262 C 235 262, 275 250, 315 245" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="4 4" />
              </g>

              {/* 2. INCOMING CO2 from Atmosphere (Top Center) */}
              <g className={`cursor-pointer ${activeStepIdx === 0 ? 'animate-pulse-subtle' : ''}`} onClick={() => selectStep(0)}>
                <path d="M 470 25 L 470 85" stroke="#6366f1" strokeWidth="3" strokeDasharray="3 3" />
                <rect x="395" y="10" width="150" height="44" rx="12" fill="#eef2ff" stroke={activeStepIdx === 0 ? '#4f46e5' : '#6366f1'} strokeWidth={activeStepIdx === 0 ? 3 : 2} />
                <text x="470" y="29" textAnchor="middle" fill="#3730a3" fontSize="11" fontWeight="black">
                  ATMOSFERDEN
                </text>
                <text x="470" y="45" textAnchor="middle" fill="#4338ca" fontSize="12" fontWeight="extrabold">
                  3 × CO₂ (Karbon Gazı)
                </text>
              </g>

              {/* 3. THE MAIN CIRCULAR PATHWAY */}
              <circle
                cx="470"
                cy="255"
                r="145"
                fill="url(#calvinCenterGrad)"
                stroke="#15803d"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-electron-flow"
              />

              {/* Central Core Emblem */}
              <circle cx="470" cy="255" r="65" fill="#ffffff" stroke="#86efac" strokeWidth="3" className="drop-shadow-sm" />
              <text x="470" y="242" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="black">
                CALVİN
              </text>
              <text x="470" y="259" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
                DÖNGÜSÜ
              </text>
              <text x="470" y="275" textAnchor="middle" fill="#475569" fontSize="9">
                (PGAL Üretim Merkezi)
              </text>

              {/* 4. STEP 2: Karbon Bağlanması & Rubisko (Top of circle) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '470px 110px' }}
                onClick={() => selectStep(1)}
              >
                <rect
                  x="375"
                  y="90"
                  width="190"
                  height="46"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeStepIdx === 1 ? '#16a34a' : '#94a3b8'}
                  strokeWidth={activeStepIdx === 1 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="470" y="109" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="black">
                  2. KARBON BAĞLANMASI
                </text>
                <text x="470" y="125" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">
                  Rubisko Enzimi + 3 RuBP (5C)
                </text>
              </g>

              {/* 5. STEP 3 & 4: ATP ve NADPH Kullanımı (Right of circle) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '625px 220px' }}
                onClick={() => selectStep(2)}
              >
                <rect
                  x="540"
                  y="190"
                  width="175"
                  height="46"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeStepIdx === 2 || activeStepIdx === 3 ? '#eab308' : '#94a3b8'}
                  strokeWidth={activeStepIdx === 2 || activeStepIdx === 3 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="627" y="209" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="black">
                  3 & 4. İNDİRGENME
                </text>
                <text x="627" y="225" textAnchor="middle" fill="#a16207" fontSize="10">
                  6 ATP Enerjisi + 6 NADPH (H⁺)
                </text>
              </g>

              {/* 6. STEP 5: PGAL Oluşumu (Bottom Right of circle) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '610px 300px' }}
                onClick={() => selectStep(4)}
              >
                <rect
                  x="535"
                  y="275"
                  width="180"
                  height="46"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeStepIdx === 4 ? '#22c55e' : '#94a3b8'}
                  strokeWidth={activeStepIdx === 4 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="625" y="294" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="black">
                  5. PGAL OLUŞUMU ★
                </text>
                <text x="625" y="310" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold">
                  6 × PGAL (3 Karbonlu Şeker)
                </text>
              </g>

              {/* 7. STEP 6: 1 PGAL Organik Madde İçin Çıkar */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '710px 415px' }}
                onClick={() => selectStep(5)}
              >
                <path d="M 590 320 L 630 380" stroke="#16a34a" strokeWidth="4" />
                <rect
                  x="580"
                  y="380"
                  width="260"
                  height="80"
                  rx="18"
                  fill="#f0fdf4"
                  stroke={activeStepIdx === 5 ? '#16a34a' : '#86efac'}
                  strokeWidth={activeStepIdx === 5 ? 4 : 2}
                  className="drop-shadow-lg"
                />
                <text x="710" y="405" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="black">
                  6. 1 PGAL DÖNGÜDEN AYRILIR ★
                </text>
                <text x="710" y="425" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
                  2 PGAL → Glikoz (C₆H₁₂O₆)
                </text>
                <text x="710" y="445" textAnchor="middle" fill="#047857" fontSize="10">
                  Ayrıca Sukroz, Nişasta, Yağ Asidi, Amino Asit
                </text>
              </g>

              {/* 8. STEP 7: 5 PGAL ile RuBP Yenilenmesi (Left of circle) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '325px 255px' }}
                onClick={() => selectStep(6)}
              >
                <rect
                  x="240"
                  y="230"
                  width="170"
                  height="50"
                  rx="14"
                  fill="#ffffff"
                  stroke={activeStepIdx === 6 ? '#ea580c' : '#94a3b8'}
                  strokeWidth={activeStepIdx === 6 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="325" y="249" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="black">
                  7. RuBP YENİLENMESİ
                </text>
                <text x="325" y="264" textAnchor="middle" fill="#c2410c" fontSize="10">
                  5 PGAL + 3 ATP Harcanır
                </text>
                <text x="325" y="275" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="bold">
                  → 3 × RuBP (5C) Başa Döner ↻
                </text>
              </g>

              {/* Dynamic Step Particle Badge */}
              <circle cx="470" cy="190" r="14" fill="#166534" className="animate-ping" opacity="0.4" />
              <circle cx="470" cy="190" r="12" fill="#166534" />
              <text x="470" y="194" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                {activeStep.id}
              </text>
            </svg>
          </div>

          {/* 7-Step clickable bar */}
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-1.5 pt-2 border-t border-[#edf2ea] w-full">
            {CALVIN_STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => selectStep(idx)}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left border ${
                  idx === activeStepIdx
                    ? 'bg-[#166534] text-white border-[#166534] shadow-sm'
                    : 'bg-[#f7faf5] text-[#3d5a49] border-[#dce6da] hover:bg-[#edf5eb]'
                }`}
              >
                <span className="block text-[9px] opacity-80">Adım {s.id}</span>
                <span className="truncate block text-[10px] font-extrabold">{s.title.split('. ')[1] || s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Step Details & Pedagogical Connection (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Tag / Category Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider">
                ADIM {activeStep.id} / 7
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-300">
                PGAL Biyosentezi
              </span>
            </div>

            {/* Step Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#143823] tracking-tight">
              {activeStep.title}
            </h2>

            {/* Chemical Equation Box */}
            <div className="bg-[#f5f3ff] border border-[#ddd6fe] rounded-xl p-3">
              <span className="text-[10px] font-bold text-[#6b21a8] uppercase block">
                Tepkime Eşitliği:
              </span>
              <p className="text-xs text-[#581c87] font-mono font-bold mt-0.5">
                {activeStep.chemicalEq}
              </p>
            </div>

            {/* Biological Event */}
            <div className="bg-[#f8faf6] border border-[#e2ede0] rounded-xl p-3">
              <span className="text-[10px] font-bold text-[#166534] uppercase block">
                Biyolojik Olay:
              </span>
              <p className="text-xs text-[#1e3b29] leading-relaxed mt-1">
                {activeStep.description}
              </p>
            </div>

            {/* PGAL Önemi */}
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl p-3 text-xs text-emerald-950 space-y-1">
              <span className="font-extrabold block text-emerald-900">Neden PGAL (Fosfogliseraldehit)?</span>
              <p className="leading-relaxed">
                Fotosentezde doğrudan 6 karbonlu glikoz çıkmaz; 3 karbonlu <b>PGAL</b> çıkar. Bitki bu PGAL’i kullanarak azot ekleyip amino asit, yağ asidi, vitamin veya glikoz/nişasta üretir.
              </p>
            </div>
          </div>

          {/* Navigation to Stage 06 (Factors) */}
          <div className="pt-3 border-t border-[#edf2ea] mt-3 space-y-1.5">
            <button
              onClick={onGoToFactors}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>HIZ LABORATUVARINA GEÇ (06)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Sıradaki: Işık şiddeti, sıcaklık ve CO₂ faktörlerinin hıza etkisi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
