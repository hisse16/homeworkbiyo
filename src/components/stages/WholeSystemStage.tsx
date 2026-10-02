import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Sun, Droplets, Wind, Zap, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  onGoToPigments: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

export const WholeSystemStage: React.FC<Props> = ({
  onGoToPigments,
  voiceEnabled,
  onSpeakText
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeCycleStep, setActiveCycleStep] = useState<number>(0);

  // Synchronized cycle sequence: 0 -> 1 -> 2 -> 3 -> 4 -> 0
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveCycleStep((prev) => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, [isRunning]);

  const cycleDescriptions = [
    {
      step: '1. Işık ve Su Girişi',
      desc: 'Güneş ışığı klorofilleri uyarır; köklerden gelen su (H₂O) tilakoit zarına ulaşır.',
      highlight: 'thylakoid_input'
    },
    {
      step: '2. Işık Tepkimeleri ve O₂ Çıkışı',
      desc: 'Suyun fotolizi ile O₂ atmosfere salınır. Elektronlar ETS’den akarak yüksek enerjili bağlar oluşturur.',
      highlight: 'thylakoid_action'
    },
    {
      step: '3. Enerji Taşıyıcılarının Stromaya Geçişi',
      desc: 'Üretilen ATP (enerji) ve NADPH (indirgeme gücü) tilakoitlerden ayrılarak stromaya aktarılır.',
      highlight: 'transfer_forward'
    },
    {
      step: '4. CO₂ Tutulumu ve Besin (Glikoz) Sentezi',
      desc: 'Stromada atmosferden alınan CO₂, ATP ve NADPH yardımıyla indirgenerek glikoza (şekere) dönüşür.',
      highlight: 'calvin_action'
    },
    {
      step: '5. Taşıyıcıların Geri Dönüşü (Rejenerasyon)',
      desc: 'Kullanılan ADP + Pi ve NADP⁺ tekrar şarj edilmek üzere tilakoit zarlarına geri döner.',
      highlight: 'transfer_back'
    }
  ];

  const currentDesc = cycleDescriptions[activeCycleStep];

  return (
    <div className="w-full max-w-[1500px] mx-auto py-3 px-2 sm:px-6 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>05 · BÜYÜK BİRLEŞTİRME</span>
            <span>•</span>
            <span>KLOROPLASTIN TÜM ŞEMASI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Fotosentezin <span className="text-[#166534]">Eksiksiz Biyolojik Devresi</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Işık evresi ile Calvin döngüsünü yan yana tek bir kloroplast içinde izleyin. Maddeler ve enerji taşıyıcıları nasıl sürekli bir döngü oluşturuyor?
          </p>
        </div>

        {/* Global Controller Button */}
        <div className="flex items-center gap-2 shrink-0 bg-[#f7faf5] border border-[#dce6da] p-1.5 rounded-2xl">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`h-11 px-5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-[#166534] text-white shadow-md'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 text-amber-700" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isRunning ? 'SİSTEMİ DURDUR' : 'TÜM SİSTEMİ ÇALIŞTIR'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setActiveCycleStep(0);
            }}
            className="h-11 px-3 rounded-xl bg-white hover:bg-[#edf5eb] border border-[#dce6da] text-[#3c5e48] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Master Scientific Synthesis Diagram + Live Stage Step */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: The Grand Interactive Chloroplast Schematic (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Label indicating whole chloroplast */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl text-xs font-extrabold text-[#166534]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
              <span>KLOROPLAST ORGANELİ (Sol: Tilakoit Zar Sistemi · Sağ: Stroma Sıvısı)</span>
            </div>
            <span className="text-[11px] font-mono text-[#15803d]">Campbell / MEB Müfredat Modeli</span>
          </div>

          {/* SVG Master Diagram */}
          <div className="w-full aspect-[16/10] relative flex items-center justify-center my-2">
            <svg viewBox="0 0 900 500" className="w-full h-full select-none">
              <defs>
                {/* Chloroplast background glow */}
                <radialGradient id="masterCpGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#dcfce7" />
                </radialGradient>

                {/* Granum Disc Gradient */}
                <linearGradient id="masterDiscGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>

                {/* Arrow markers */}
                <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#166534" />
                </marker>
                <marker id="arrowOrange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c" />
                </marker>
                <marker id="arrowPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
                </marker>
                <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
                </marker>
              </defs>

              {/* 1. Large Chloroplast Outer & Inner Boundary */}
              <rect x="50" y="30" width="800" height="440" rx="60" fill="url(#masterCpGrad)" stroke="#4ade80" strokeWidth="6" />
              <rect x="62" y="42" width="776" height="416" rx="48" fill="none" stroke="#86efac" strokeWidth="2.5" />
              <text x="90" y="70" fill="#14532d" fontSize="12" fontWeight="black">
                KLOROPLAST ÇİFT ZARI
              </text>

              {/* 2. LEFT REGION: TİLAKOİT / IŞIK EVRESİ */}
              <g className={activeCycleStep === 0 || activeCycleStep === 1 ? 'animate-pulse-subtle' : ''}>
                {/* Thylakoid Container Box */}
                <rect x="110" y="110" width="280" height="280" rx="30" fill="#ffffff" stroke={activeCycleStep === 1 ? '#facc15' : '#86efac'} strokeWidth="3" className="drop-shadow-sm" />
                
                {/* Grana Stacks Illustration */}
                <g>
                  {[160, 185, 210, 235, 260].map((y, i) => (
                    <ellipse key={i} cx="190" cy={y} rx="45" ry="12" fill="url(#masterDiscGrad)" stroke="#14532d" strokeWidth="1.5" />
                  ))}
                  {[175, 200, 225, 250].map((y, i) => (
                    <ellipse key={i} cx="290" cy={y} rx="40" ry="11" fill="url(#masterDiscGrad)" stroke="#14532d" strokeWidth="1.5" />
                  ))}
                  <path d="M 190 210 L 290 200" stroke="#15803d" strokeWidth="5" />
                </g>

                <text x="250" y="325" textAnchor="middle" fill="#14532d" fontSize="14" fontWeight="black">
                  IŞIĞA BAĞLI TEPKİMELER
                </text>
                <text x="250" y="345" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
                  (Tilakoit Zarlar)
                </text>
              </g>

              {/* Input 1: Güneş Işığı (into Tilakoit) */}
              <g className={activeCycleStep === 0 ? 'animate-pulse-subtle' : ''}>
                <path d="M 170 0 L 210 110" stroke="#eab308" strokeWidth="4" strokeDasharray="5 5" />
                <rect x="110" y="5" width="130" height="34" rx="10" fill="#fef9c3" stroke="#facc15" strokeWidth="2" />
                <text x="175" y="27" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="black">
                  ☀️ GÜNEŞ IŞIĞI
                </text>
              </g>

              {/* Input 2: Su / H2O (into Tilakoit) */}
              <g className={activeCycleStep === 0 ? 'animate-pulse-subtle' : ''}>
                <path d="M 290 0 L 270 110" stroke="#0284c7" strokeWidth="4" strokeDasharray="5 5" />
                <rect x="250" y="5" width="90" height="34" rx="10" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                <text x="295" y="27" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="black">
                  💧 H₂O (Su)
                </text>
              </g>

              {/* Output 1: Oksijen / O2 (released from Tilakoit out of chloroplast) */}
              <g className={activeCycleStep === 1 ? 'animate-pulse-subtle' : ''}>
                <path d="M 250 390 L 250 480" stroke="#0284c7" strokeWidth="4" strokeDasharray="5 5" />
                <rect x="180" y="455" width="140" height="38" rx="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                <text x="250" y="478" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="black">
                  💨 O₂ (Oksijen)
                </text>
              </g>

              {/* 3. RIGHT REGION: CALVİN DÖNGÜSÜ / STROMA */}
              <g className={activeCycleStep === 3 ? 'animate-pulse-subtle' : ''}>
                {/* Calvin Container Box */}
                <rect x="510" y="110" width="280" height="280" rx="30" fill="#ffffff" stroke={activeCycleStep === 3 ? '#facc15' : '#ddd6fe'} strokeWidth="3" className="drop-shadow-sm" />

                {/* Rotating Cycle Graphic */}
                <circle cx="650" cy="240" r="70" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="6 6" className="animate-electron-flow" />
                <text x="650" y="235" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="black">
                  CALVİN
                </text>
                <text x="650" y="255" textAnchor="middle" fill="#6d28d9" fontSize="12" fontWeight="bold">
                  DÖNGÜSÜ
                </text>
                <text x="650" y="345" textAnchor="middle" fill="#4c1d95" fontSize="11" fontWeight="bold">
                  (Stroma Sıvısı)
                </text>
              </g>

              {/* Input 3: Karbondioksit / CO2 (into Calvin) */}
              <g className={activeCycleStep === 3 ? 'animate-pulse-subtle' : ''}>
                <path d="M 650 0 L 650 110" stroke="#7c3aed" strokeWidth="4" strokeDasharray="5 5" />
                <rect x="585" y="5" width="130" height="34" rx="10" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="2" />
                <text x="650" y="27" textAnchor="middle" fill="#5b21b6" fontSize="12" fontWeight="black">
                  🌫️ CO₂ (Gazı)
                </text>
              </g>

              {/* Output 2: PGAL / Glikoz / Şeker (released from Calvin) */}
              <g className={activeCycleStep === 3 ? 'animate-pulse-subtle' : ''}>
                <path d="M 650 390 L 650 480" stroke="#16a34a" strokeWidth="4" strokeDasharray="5 5" />
                <rect x="535" y="455" width="230" height="40" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5" />
                <text x="650" y="479" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="black">
                  🍬 PGAL → GLİKOZ / BESİN
                </text>
              </g>

              {/* 4. THE TWO INTERMEDIATE BRIDGES (The Connection between the two) */}

              {/* Top Forward Bridge: ATP + NADPH from Tilakoit -> Calvin */}
              <g className={activeCycleStep === 2 ? 'animate-pulse-subtle' : ''}>
                <path d="M 390 170 C 430 145, 470 145, 510 170" fill="none" stroke="#ea580c" strokeWidth="4" markerEnd="url(#arrowOrange)" />
                <rect x="405" y="130" width="90" height="30" rx="8" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
                <text x="450" y="150" textAnchor="middle" fill="#c2410c" fontSize="12" fontWeight="black">
                  ⚡ ATP
                </text>

                <path d="M 390 215 C 430 190, 470 190, 510 215" fill="none" stroke="#7c3aed" strokeWidth="4" markerEnd="url(#arrowPurple)" />
                <rect x="395" y="195" width="110" height="30" rx="8" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="2" />
                <text x="450" y="215" textAnchor="middle" fill="#5b21b6" fontSize="12" fontWeight="black">
                  🧪 NADPH
                </text>
              </g>

              {/* Bottom Return Bridge: ADP + NADP+ from Calvin -> Tilakoit */}
              <g className={activeCycleStep === 4 ? 'animate-pulse-subtle' : ''}>
                <path d="M 510 285 C 470 310, 430 310, 390 285" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="4 4" markerEnd="url(#arrowGreen)" />
                <rect x="400" y="280" width="100" height="26" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="450" y="297" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
                  ADP + Pi ↺
                </text>

                <path d="M 510 330 C 470 355, 430 355, 390 330" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="4 4" markerEnd="url(#arrowGreen)" />
                <rect x="405" y="335" width="90" height="26" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="450" y="352" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
                  NADP⁺ ↺
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Live Synchronized Flow Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#f8faf6] border border-[#e2ece0] rounded-2xl w-full">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-[#166534]">
                SENKRONİZE DÖNGÜ ADIMI {activeCycleStep + 1} / 5:
              </span>
              <span className="text-xs font-extrabold text-[#143823]">
                {currentDesc.step}
              </span>
            </div>
            <span className="text-xs text-[#4e6b5a] font-medium hidden md:inline">
              {currentDesc.desc}
            </span>
          </div>
        </div>

        {/* Right: Synthesis Formula & Scientific Principles (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              BÜYÜK FOTOSENTEZ DENKLEMİ
            </span>

            {/* Master Balanced Chemical Formula */}
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-2xl p-4 text-center space-y-2">
              <span className="text-[11px] font-bold text-[#15803d] uppercase tracking-wide">
                Genel Kimyasal Eşitlik
              </span>
              <div className="text-lg sm:text-xl font-mono font-extrabold text-[#14532d] tracking-tight">
                6 CO₂ + 6 H₂O
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-700 font-bold">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Işık Enerjisi & Klorofil</span>
              </div>
              <div className="text-lg sm:text-xl font-mono font-extrabold text-[#16a34a] tracking-tight">
                ↓<br />C₆H₁₂O₆ + 6 O₂
              </div>
              <div className="text-[11px] text-[#426b52] font-medium pt-1">
                Glikoz (Besin) + Oksijen (Atmosfere)
              </div>
            </div>

            {/* Key Biological Takeaways */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-extrabold text-[#143823] block">
                Sınıfta Vurgulanacak 3 Anahtar Fikir:
              </span>

              <div className="p-3 bg-[#f8faf6] border border-[#e2ede0] rounded-xl flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  <b>Açığa çıkan O₂'nin kaynağı sudur (H₂O):</b> CO₂ değildir! Su ışık evresinde parçalanınca oksijen atmosfere verilir.
                </p>
              </div>

              <div className="p-3 bg-[#f8faf6] border border-[#e2ede0] rounded-xl flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  <b>Glikozun karbon ve oksijen kaynağı CO₂'dir:</b> Hidrojeni ise suyun parçalanmasıyla NADPH üzerinden taşınır.
                </p>
              </div>

              <div className="p-3 bg-[#f8faf6] border border-[#e2ede0] rounded-xl flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  <b>Döngü süreklidir:</b> Işık evresi olmadan Calvin ATP/NADPH bulamaz; Calvin olmadan da ADP/NADP⁺ geri dönüp ışık evresini çalıştıramaz!
                </p>
              </div>
            </div>
          </div>

          {/* Navigation to Stage 08 (Pigments) */}
          <div className="pt-4 border-t border-[#edf2ea] mt-4 space-y-2">
            <button
              onClick={onGoToPigments}
              className="w-full h-13 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>PİGMENTLER VE IŞIK TAYFI (08)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Sıradaki: Klorofil a/b, karotenoidler ve dalga boyuna göre fotosentez hızı
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
