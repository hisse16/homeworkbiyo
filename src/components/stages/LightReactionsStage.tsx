import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Sun, Droplets, Zap, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { LightReactionStep } from '../../types';

interface Props {
  onGoToCalvin: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

const STEPS: LightReactionStep[] = [
  {
    id: 1,
    title: '1. Işık Klorofil Tarafından Soğrulur',
    chemicalEq: 'Foton (Işık) + Klorofil → Uyarılmış e⁻',
    description: 'Güneşten gelen fotonlar Fotosistem II’deki klorofil pigmentleri tarafından yakalanır. Pigment moleküllerindeki elektronlar yüksek enerji düzeyine fırlar (uyarılır).',
    focusTarget: 'pigments'
  },
  {
    id: 2,
    title: '2. Su Parçalanır (Fotoliz) ve O₂ Açığa Çıkar',
    chemicalEq: 'H₂O → 2H⁺ + 2e⁻ + ½O₂',
    description: 'Klorofilden ayrılan elektronların yeri suyun fotolizi ile doldurulur. Su parçalanınca açığa çıkan oksijen (O₂) atmosfere verilir; elektronlar klorofile, H⁺ iyonları ise lümene geçer.',
    focusTarget: 'water'
  },
  {
    id: 3,
    title: '3. Elektronlar ETS Boyunca Taşınır',
    chemicalEq: 'e⁻ : PS II → Sitokrom b₆f → PS I → Ferredoksin',
    description: 'Uyarılmış elektronlar tilakoit zarındaki taşıyıcı proteinler (ETS) üzerinden bir basamaktan diğerine akar. Bu akış sırasında açığa çıkan enerji ile stromadan lümene H⁺ pompalanır.',
    focusTarget: 'ets'
  },
  {
    id: 4,
    title: '4. H⁺ Gradyanı ile ATP Sentezlenir (Kemiozmoz)',
    chemicalEq: 'ADP + Pi + (H⁺ Akışı) → ATP',
    description: 'Tilakoit lümende biriken yoğun H⁺ iyonları ATP Sentaz enziminin içinden stromaya doğru fışkırır. Dönen moleküler çark sayesinde ADP’ye fosfat bağlanarak ATP üretilir.',
    focusTarget: 'atp_synthase'
  },
  {
    id: 5,
    title: '5. NADP⁺ İndirgenir ve NADPH Oluşur',
    chemicalEq: 'NADP⁺ + 2e⁻ + H⁺ → NADPH',
    description: 'Elektron taşıma zincirinin son basamağında elektronlar NADP⁺ Redüktaz enzimine ulaşır ve NADP⁺ molekülünü indirgeyerek NADPH oluşturur. ATP ve NADPH Calvin döngüsüne aktarılır!',
    focusTarget: 'nadph'
  }
];

export const LightReactionsStage: React.FC<Props> = ({
  onGoToCalvin,
  voiceEnabled,
  onSpeakText
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const activeStep = STEPS[currentStepIdx];

  // Auto-advance ticker when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const selectStep = (idx: number) => {
    setIsPlaying(false);
    setCurrentStepIdx(idx);
    if (voiceEnabled) {
      onSpeakText(`${STEPS[idx].title}. ${STEPS[idx].description}`);
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-3 px-2 sm:px-6 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>03 · IŞIĞA BAĞLI TEPKİMELER</span>
            <span>•</span>
            <span>TİLAKOİT ZARI KESİTİ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Işık Enerjisi <span className="text-[#166534]">ATP ve NADPH’ye</span> Nasıl Dönüşür?
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Tilakoit zarında gerçekleşen gerçek moleküler akış: Fotonlar elektronları uyarır, su parçalanıp oksijen açığa çıkar, protonlar lümende birikip ATP sentazı çalıştırır.
          </p>
        </div>

        {/* Live Controller Buttons for Teacher */}
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
            <span>{isPlaying ? 'AKIŞI DURDUR' : 'AKIŞI OYNAT'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            className="h-11 px-3 rounded-xl bg-white hover:bg-[#edf5eb] border border-[#dce6da] text-[#3c5e48] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Başa Al</span>
          </button>
        </div>
      </div>

      {/* Main Visual Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: The Large Scientific Thylakoid Membrane Section (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Top Zone Indicator: STROMA */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl text-xs font-extrabold text-[#166534]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
              <span>STROMA (Kloroplast İç Sıvısı · Düşük H⁺ Konsantrasyonu · pH ≈ 8)</span>
            </div>
            <span className="text-[11px] font-mono text-[#15803d]">Calvin Döngüsüne Açılan Alan</span>
          </div>

          {/* SVG Scientific Thylakoid Membrane Cross-Section */}
          <div className="w-full aspect-[16/9] relative flex items-center justify-center my-2">
            <svg viewBox="0 0 860 460" className="w-full h-full select-none">
              <defs>
                {/* Sunlight Ray Pattern */}
                <linearGradient id="sunbeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#facc15" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#eab308" stopOpacity="0.2" />
                </linearGradient>

                {/* Lipid Bilayer Membrane Gradient */}
                <linearGradient id="lipidBilayerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="15%" stopColor="#dcfce7" />
                  <stop offset="50%" stopColor="#f0fdf4" />
                  <stop offset="85%" stopColor="#dcfce7" />
                  <stop offset="100%" stopColor="#86efac" />
                </linearGradient>

                {/* Protein Complex Gradients */}
                <linearGradient id="ps2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>

                <linearGradient id="cytGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                <linearGradient id="ps1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>

                <linearGradient id="nadpReductGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>

                <linearGradient id="atpSynthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#c2410c" />
                </linearGradient>
              </defs>

              {/* 1. Sunlight Influx from Above */}
              <g className={currentStepIdx === 0 ? 'animate-pulse-subtle' : ''}>
                {/* Ray 1 hitting PS II */}
                <polygon points="120,0 155,0 160,180 115,180" fill="url(#sunbeamGrad)" />
                {/* Ray 2 hitting PS I */}
                <polygon points="450,0 485,0 490,180 445,180" fill="url(#sunbeamGrad)" />
                <circle cx="140" cy="180" r="14" fill="#facc15" opacity="0.4" className="animate-ping" />
                <circle cx="470" cy="180" r="14" fill="#facc15" opacity="0.4" className="animate-ping" />
                <text x="140" y="30" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">
                  ☀️ FOTON
                </text>
                <text x="470" y="30" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">
                  ☀️ FOTON
                </text>
              </g>

              {/* 2. THE THYLAKOID MEMBRANE (Fosfolipit Çift Katı) */}
              <rect x="20" y="180" width="820" height="120" rx="16" fill="url(#lipidBilayerGrad)" stroke="#4ade80" strokeWidth="2.5" />
              <text x="45" y="245" fill="#166534" fontSize="11" fontWeight="extrabold" transform="rotate(-90 45 245)">
                TİLAKOİT ZARI
              </text>

              {/* Membrane Phospholipid heads texture */}
              <g fill="#16a34a" opacity="0.25">
                {[...Array(38)].map((_, i) => (
                  <React.Fragment key={i}>
                    <circle cx={70 + i * 20} cy="186" r="3.5" />
                    <circle cx={70 + i * 20} cy="294" r="3.5" />
                  </React.Fragment>
                ))}
              </g>

              {/* 3. PROTEIN COMPLEX 1: Fotosistem II (PS II - P680) */}
              <g
                className="cursor-pointer"
                onClick={() => selectStep(0)}
              >
                <rect
                  x="100"
                  y="160"
                  width="85"
                  height="160"
                  rx="16"
                  fill="url(#ps2Grad)"
                  stroke={currentStepIdx === 0 || currentStepIdx === 1 ? '#facc15' : '#14532d'}
                  strokeWidth={currentStepIdx === 0 || currentStepIdx === 1 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="142" y="225" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">
                  PS II
                </text>
                <text x="142" y="242" textAnchor="middle" fill="#bbf7d0" fontSize="10" fontWeight="bold">
                  P680
                </text>
                <text x="142" y="260" textAnchor="middle" fill="#ffffff" fontSize="9">
                  (Klorofil a/b)
                </text>

                {/* Photolysis Center (Su Parçalama / OEC) at bottom of PS II */}
                <rect x="110" y="285" width="65" height="30" rx="8" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                <text x="142" y="304" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  Fotoliz
                </text>
              </g>

              {/* Electron Carrier 1: Plastokinon (Pq) */}
              <g>
                <circle cx="215" cy="225" r="16" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <text x="215" y="229" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Pq</text>
              </g>

              {/* Water Photolysis Reaction Callout (Under PS II) */}
              <g className={currentStepIdx === 1 ? 'animate-pulse-subtle' : ''}>
                <path d="M 142 320 L 142 375" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="3 3" />
                <rect x="70" y="375" width="145" height="48" rx="10" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                <text x="142" y="395" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="black">
                  H₂O → 2H⁺ + 2e⁻ + ½O₂
                </text>
                <text x="142" y="412" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">
                  O₂ Atmosfere Verilir ↑
                </text>
              </g>

              {/* 4. PROTEIN COMPLEX 2: Sitokrom b6f Kompleksi (Proton Pompası) */}
              <g
                className="cursor-pointer"
                onClick={() => selectStep(2)}
              >
                <rect
                  x="260"
                  y="170"
                  width="75"
                  height="140"
                  rx="14"
                  fill="url(#cytGrad)"
                  stroke={currentStepIdx === 2 ? '#facc15' : '#075985'}
                  strokeWidth={currentStepIdx === 2 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="297" y="235" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">
                  Sitokrom
                </text>
                <text x="297" y="252" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">
                  b₆f
                </text>

                {/* H+ Proton pumping arrow from stroma to lumen */}
                <path d="M 297 125 L 297 340" stroke="#0284c7" strokeWidth="3" strokeDasharray="4 4" markerEnd="url(#arrow)" />
                <circle cx="297" cy="130" r="11" fill="#0284c7" />
                <text x="297" y="134" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  H⁺
                </text>
                <circle cx="297" cy="345" r="11" fill="#0284c7" />
                <text x="297" y="349" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  H⁺
                </text>
              </g>

              {/* Electron Carrier 2: Plastosiyanin (Pc) */}
              <g>
                <circle cx="380" cy="245" r="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                <text x="380" y="249" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">Pc</text>
              </g>

              {/* 5. PROTEIN COMPLEX 3: Fotosistem I (PS I - P700) */}
              <g
                className="cursor-pointer"
                onClick={() => selectStep(2)}
              >
                <rect
                  x="425"
                  y="160"
                  width="85"
                  height="160"
                  rx="16"
                  fill="url(#ps1Grad)"
                  stroke={currentStepIdx === 2 ? '#facc15' : '#14532d'}
                  strokeWidth={currentStepIdx === 2 ? 4 : 2}
                  className="drop-shadow-md"
                />
                <text x="467" y="225" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">
                  PS I
                </text>
                <text x="467" y="242" textAnchor="middle" fill="#bbf7d0" fontSize="10" fontWeight="bold">
                  P700
                </text>
                <text x="467" y="260" textAnchor="middle" fill="#ffffff" fontSize="9">
                  (Klorofil a/b)
                </text>
              </g>

              {/* Electron Carrier 3: Ferredoksin (Fd) */}
              <g>
                <circle cx="535" cy="185" r="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <text x="535" y="189" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Fd</text>
              </g>

              {/* 6. PROTEIN COMPLEX 4: Ferredoksin & NADP+ Redüktaz */}
              <g
                className="cursor-pointer"
                onClick={() => selectStep(4)}
              >
                <circle cx="580" cy="170" r="32" fill="url(#nadpReductGrad)" stroke={currentStepIdx === 4 ? '#facc15' : '#5b21b6'} strokeWidth={currentStepIdx === 4 ? 4 : 2} />
                <text x="580" y="168" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black">
                  NADP⁺
                </text>
                <text x="580" y="182" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  Redüktaz
                </text>

                {/* NADPH Output bubble into Stroma */}
                <path d="M 580 135 L 610 85" stroke="#7c3aed" strokeWidth="2.5" />
                <rect x="580" y="50" width="130" height="38" rx="12" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="2" />
                <text x="645" y="67" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="black">
                  NADP⁺ + 2e⁻ + H⁺
                </text>
                <text x="645" y="82" textAnchor="middle" fill="#7c3aed" fontSize="11" fontWeight="extrabold">
                  → NADPH ★
                </text>
              </g>

              {/* 7. PROTEIN COMPLEX 5: ATP Sentaz (Kemiozmotik Çark & H+ Akışı) */}
              <g
                className="cursor-pointer"
                onClick={() => selectStep(3)}
              >
                {/* Rotor Base in Membrane (CF0 Channel) */}
                <rect x="720" y="180" width="60" height="60" rx="8" fill="url(#atpSynthGrad)" stroke="#9a3412" strokeWidth="2" />
                <text x="750" y="215" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  CF₀
                </text>

                {/* Stalk and Rotating Head in Stroma (CF1) */}
                <rect x="740" y="130" width="20" height="50" fill="#ea580c" />
                <circle
                  cx="750"
                  cy="105"
                  r="30"
                  fill="url(#atpSynthGrad)"
                  stroke={currentStepIdx === 3 ? '#facc15' : '#9a3412'}
                  strokeWidth={currentStepIdx === 3 ? 4 : 2}
                  className="animate-rotor drop-shadow-lg"
                />
                <text x="750" y="109" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black">
                  CF₁
                </text>

                {/* Dynamic H+ Streaming Funnel into ATP Synthase */}
                <path d="M 750 360 L 750 80" stroke="#f97316" strokeWidth="4" strokeDasharray="5 5" className="animate-electron-flow" />
                <circle cx="750" cy="310" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                <text x="750" y="313" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H⁺</text>
                <circle cx="750" cy="245" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                <text x="750" y="248" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H⁺</text>
                <circle cx="750" cy="155" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                <text x="750" y="158" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H⁺</text>

                <text x="750" y="380" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="black">
                  H⁺ Akışı (Kemiozmoz) ↑
                </text>

                {/* ATP Production Banner */}
                <rect x="690" y="10" width="135" height="38" rx="12" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
                <text x="757" y="27" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="black">
                  ADP + Pi
                </text>
                <text x="757" y="42" textAnchor="middle" fill="#ea580c" fontSize="11" fontWeight="extrabold">
                  → ATP ★ (Enerji)
                </text>
              </g>

              {/* 8. ELECTRON FLOW TRACK (Yellow glowing dashes connecting complexes) */}
              <path
                d="M 150 200 Q 210 180 270 200 T 430 200 T 570 170"
                fill="none"
                stroke="#eab308"
                strokeWidth="4"
                className="animate-electron-flow"
              />
              {/* Electron badges moving */}
              <circle cx="210" cy="190" r="8" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
              <text x="210" y="193" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="black">
                e⁻
              </text>
              <circle cx="360" cy="195" r="8" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
              <text x="360" y="198" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="black">
                e⁻
              </text>

              {/* 9. LUMEN PROTON ACCUMULATION (Bottom area) */}
              <g className="animate-proton-bob">
                {[
                  { x: 260, y: 390 },
                  { x: 340, y: 380 },
                  { x: 420, y: 410 },
                  { x: 500, y: 390 },
                  { x: 580, y: 420 },
                  { x: 660, y: 395 }
                ].map((pos, idx) => (
                  <g key={idx}>
                    <circle cx={pos.x} cy={pos.y} r="12" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                    <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">
                      H⁺
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* Bottom Zone Indicator: LUMEN */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#e0f2fe] border border-[#bae6fd] rounded-xl text-xs font-extrabold text-[#0369a1]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
              <span>TİLAKOİT LÜMENİ (İç Boşluk · Yüksek H⁺ Yoğunluğu · Asidik pH ≈ 4)</span>
            </div>
            <span className="text-[11px] font-mono text-[#0284c7]">Proton Rezervuarı</span>
          </div>
        </div>

        {/* Right: Step-by-Step Pedagogical Detail & Controls (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            {/* Step Pills List (Clickable by teacher) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block mb-2">
                5 ADIMDA IŞIK TEPKİMELERİ
              </span>
              {STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => selectStep(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    idx === currentStepIdx
                      ? 'bg-[#166534] text-white border-[#166534] shadow-sm'
                      : 'bg-[#f7faf5] text-[#3d5a49] border-[#dce6da] hover:bg-[#edf5eb]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                        idx === currentStepIdx ? 'bg-emerald-800 text-white' : 'bg-white text-[#166534]'
                      }`}
                    >
                      {s.id}
                    </span>
                    <span className="text-xs font-bold">{s.title.split('.')[1] || s.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${idx === currentStepIdx ? 'text-white' : 'text-[#8da897]'}`}
                  />
                </button>
              ))}
            </div>

            {/* Active Step Highlight Card */}
            <div className="bg-[#f8faf6] border border-[#dce6da] rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#166534] uppercase">
                  SEÇİLİ ADIM {activeStep.id} / 5
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  {activeStep.chemicalEq}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-extrabold text-[#143823]">
                {activeStep.title}
              </h3>

              <p className="text-xs text-[#2b4c38] font-medium leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Summary Outputs Card */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-3 space-y-1.5">
              <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wide block">
                BU BÖLÜMÜN ÜRÜNLERİ (CALVİN'E AKTARILACAK):
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
                <div className="bg-white border border-[#86efac] rounded-lg p-2 text-[#c2410c] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>ATP (Kimyasal Enerji)</span>
                </div>
                <div className="bg-white border border-[#86efac] rounded-lg p-2 text-[#5b21b6] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>NADPH (İndirgeme Gücü)</span>
                </div>
              </div>
              <p className="text-[10px] text-[#4d6b58] pt-1">
                * Oksijen (O₂) ise suyun fotolizinden oluşan bir yan ürün olarak atmosfere salınır.
              </p>
            </div>
          </div>

          {/* Navigation to Stage 04 (Calvin Cycle) */}
          <div className="pt-4 border-t border-[#edf2ea] mt-4 space-y-2">
            <button
              onClick={onGoToCalvin}
              className="w-full h-13 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>CALVİN DÖNGÜSÜNE AKTAR (04)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Üretilen ATP ve NADPH stromaya geçerek CO₂'den glikoz yapacak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
