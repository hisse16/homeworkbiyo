import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Sun, RefreshCw, Layers } from 'lucide-react';
import { ChloroplastStructureInfo } from '../../types';

interface Props {
  onGoToLightReactions: () => void;
  onGoToCalvin: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

const CHLOROPLAST_PARTS: ChloroplastStructureInfo[] = [
  {
    id: 'thylakoid',
    name: 'Tilakoit Zarlar ve Grana',
    whatIsIt: 'Üst üste yığılmış yassı kesecikler (diskler). Çok sayıda tilakoitin üst üste gelmesiyle Grana (çoğulu Granum) oluşur.',
    whereIsIt: 'Kloroplastın iç kısmında stroma sıvısı içine gömülü halde bulunur.',
    role: 'Zarında klorofil pigmentleri, elektron taşıma sistemi (ETS) ve ATP sentaz enzimleri bulunur. Işığa bağlı tepkimeler burada gerçekleşir; su parçalanarak oksijen, ATP ve NADPH üretilir.',
    reactionZone: 'light'
  },
  {
    id: 'stroma',
    name: 'Stroma (İç Sıvı)',
    whatIsIt: 'Kloroplastın içini dolduran, sitoplazmaya benzeyen ancak enzimce çok daha zengin renksiz jelimsi sıvı matriks.',
    whereIsIt: 'İç zar ile tilakoit zarlar arasındaki tüm iç boşluğu doldurur.',
    role: 'Calvin döngüsü (karbon tutulumu) enzimleri (özellikle Rubisko), kloroplastın kendi halkasal DNA’sı, RNA’sı ve 70S ribozomları burada bulunur. CO₂ kullanılarak glikoz gibi organik maddeler burada sentezlenir.',
    reactionZone: 'calvin'
  },
  {
    id: 'outer_membrane',
    name: 'Dış Zar',
    whatIsIt: 'Kloroplastı sitoplazmadan ayıran düz, pürüzsüz dış kılıf.',
    whereIsIt: 'Kloroplastın en dış yüzeyindedir.',
    role: 'Porin proteinleri içerir; küçük moleküllere ve iyonlara karşı oldukça geçirgendir. Organeli dış etkenlerden korur.',
    reactionZone: 'boundary'
  },
  {
    id: 'inner_membrane',
    name: 'İç Zar',
    whatIsIt: 'Dış zarın hemen altında bulunan ve kloroplastın iç ortamını sıkıca sınırlayan ikinci zar katmanı.',
    whereIsIt: 'Dış zar ile stroma arasında yer alır; iki zar arasında dar bir "zarlar arası alan" bulunur.',
    role: 'Seçici geçirgendir. Sitoplazma ile stroma arasındaki metabolit ve iyon taşınımını özel taşıyıcı proteinler yoluyla titizlikle kontrol eder.',
    reactionZone: 'boundary'
  },
  {
    id: 'lumen',
    name: 'Tilakoit Lümen (İç Boşluk)',
    whatIsIt: 'Tilakoit zarlarının çevrelediği dar iç sıvı kanal.',
    whereIsIt: 'Tilakoit disklerinin tam merkezindeki kapalı kompartımandır.',
    role: 'Işık reaksiyonları sırasında suyun parçalanması ve ETS proton pompalanması sonucu H⁺ (proton) birikimi burada gerçekleşir. Yüksek proton gradyanı (pH ≈ 4) ATP sentazı döndürerek ATP üretimini tetikler.',
    reactionZone: 'light'
  }
];

export const ChloroplastStage: React.FC<Props> = ({
  onGoToLightReactions,
  onGoToCalvin,
  voiceEnabled,
  onSpeakText
}) => {
  const [selectedId, setSelectedId] = useState<string>('thylakoid');
  const activePart = CHLOROPLAST_PARTS.find((p) => p.id === selectedId) || CHLOROPLAST_PARTS[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const item = CHLOROPLAST_PARTS.find((p) => p.id === id);
    if (voiceEnabled && item) {
      onSpeakText(`${item.name}. ${item.role}`);
    }
  };

  return (
    <div className="w-full max-w-[1450px] mx-auto py-4 px-2 sm:px-6 flex flex-col gap-5 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>02 · KLOROPLAST ANATOMİSİ</span>
            <span>•</span>
            <span>İKİ BÜYÜK ÇALIŞMA ALANI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Kloroplastın Yapısı ve <span className="text-[#166534]">İki Ayrı Çalışma Alanı</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-1 max-w-3xl">
            Fotosentez tek bir adımda bitmez. Kloroplast organeli görevi ikiye bölmüştür: <b>Tilakoitlerde</b> ışık enerjisi toplanır; <b>Stromada</b> ise karbondioksit bağlanarak şekere dönüştürülür.
          </p>
        </div>

        {/* Classroom Interactive Prompt */}
        <div className="bg-[#edf6eb] border border-[#cbe1c7] rounded-xl p-3 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#166534] text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-[#143823] block">Öğretmen Notu:</span>
            <span className="text-[#3b6348]">Öğrencilere stroma ile tilakoitin farkını sorup tahtada dokunun.</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Modern Textbook Illustration + Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[530px]">
        {/* Left: Scientific Cross Section Diagram (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-bold text-[#446b52]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
            <span>Kloroplast Enine Kesiti (Tahtada yapılara dokunarak inceleyin)</span>
          </div>

          {/* SVG Scientific Chloroplast Model */}
          <div className="w-full max-w-[760px] aspect-[16/10] relative flex items-center justify-center mt-5">
            <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-md">
              <defs>
                {/* Outer membrane gradient */}
                <radialGradient id="cpOuterGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="90%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </radialGradient>

                {/* Stroma liquid gradient */}
                <radialGradient id="cpStromaGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f0fdf4" />
                  <stop offset="70%" stopColor="#dcfce7" />
                  <stop offset="100%" stopColor="#bbf7d0" />
                </radialGradient>

                {/* Thylakoid Disc gradient */}
                <linearGradient id="discGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="50%" stopColor="#166534" />
                  <stop offset="100%" stopColor="#14532d" />
                </linearGradient>

                {/* Disc highlight when selected */}
                <linearGradient id="discGradActive" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#052e16" />
                </linearGradient>
              </defs>

              {/* 1. Outer Membrane (Dış Zar) */}
              <ellipse
                cx="400"
                cy="250"
                rx="370"
                ry="210"
                fill="none"
                stroke={selectedId === 'outer_membrane' ? '#166534' : '#86efac'}
                strokeWidth={selectedId === 'outer_membrane' ? 12 : 7}
                className="cursor-pointer transition-all"
                onClick={() => handleSelect('outer_membrane')}
              />

              {/* 2. Inner Membrane (İç Zar) */}
              <ellipse
                cx="400"
                cy="250"
                rx="352"
                ry="194"
                fill="none"
                stroke={selectedId === 'inner_membrane' ? '#166534' : '#4ade80'}
                strokeWidth={selectedId === 'inner_membrane' ? 10 : 5}
                className="cursor-pointer transition-all"
                onClick={() => handleSelect('inner_membrane')}
              />

              {/* 3. Stroma Interior Fluid (Stroma Sıvısı) */}
              <ellipse
                cx="400"
                cy="250"
                rx="340"
                ry="182"
                fill="url(#cpStromaGrad)"
                stroke={selectedId === 'stroma' ? '#15803d' : '#86efac'}
                strokeWidth={selectedId === 'stroma' ? 4 : 1}
                className="cursor-pointer transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('stroma');
                }}
              />

              {/* Stroma Floating Ribosomes and Chloroplast DNA */}
              <g opacity="0.6">
                {/* Circular cpDNA */}
                <ellipse cx="230" cy="160" rx="35" ry="16" fill="none" stroke="#047857" strokeWidth="2" strokeDasharray="3 3" />
                <text x="230" y="164" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">kloroplast DNA</text>

                {/* 70S Ribosomes */}
                <circle cx="580" cy="170" r="4" fill="#047857" />
                <circle cx="595" cy="180" r="3.5" fill="#047857" />
                <circle cx="210" cy="330" r="4" fill="#047857" />
                <circle cx="560" cy="320" r="4" fill="#047857" />
                <text x="590" y="160" textAnchor="middle" fill="#065f46" fontSize="9">Ribozomlar</text>
              </g>

              {/* 4. Interconnecting Lamellae (Ara Lameller) */}
              <path
                d="M 230 260 C 290 250, 340 270, 400 260 S 510 250, 570 260"
                fill="none"
                stroke="#15803d"
                strokeWidth="6"
                strokeLinecap="round"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('thylakoid');
                }}
              />
              <path
                d="M 240 310 C 310 320, 360 290, 420 300 S 500 320, 560 310"
                fill="none"
                stroke="#15803d"
                strokeWidth="5"
                strokeLinecap="round"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('thylakoid');
                }}
              />

              {/* 5. GRANA STACKS (Granum / Tilakoit Diskleri) */}

              {/* Granum 1 (Left - 5 Discs) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '230px 260px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('thylakoid');
                }}
              >
                {[220, 235, 250, 265, 280].map((y, idx) => (
                  <rect
                    key={idx}
                    x="195"
                    y={y}
                    width="70"
                    height="11"
                    rx="5"
                    fill={selectedId === 'thylakoid' ? 'url(#discGradActive)' : 'url(#discGrad)'}
                    stroke="#14532d"
                    strokeWidth="1.5"
                  />
                ))}
                <text x="230" y="210" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">
                  GRANUM 1
                </text>
              </g>

              {/* Granum 2 (Center - 6 Discs - Main Focus) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '400px 255px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('thylakoid');
                }}
              >
                {[200, 215, 230, 245, 260, 275, 290].map((y, idx) => (
                  <rect
                    key={idx}
                    x="360"
                    y={y}
                    width="80"
                    height="12"
                    rx="6"
                    fill={selectedId === 'thylakoid' ? 'url(#discGradActive)' : 'url(#discGrad)'}
                    stroke={selectedId === 'thylakoid' ? '#facc15' : '#14532d'}
                    strokeWidth={selectedId === 'thylakoid' ? 2.5 : 1.5}
                    className="drop-shadow-sm"
                  />
                ))}
                {/* Visual Label pointing to Tilakoit */}
                <ellipse cx="400" cy="245" rx="38" ry="4" fill="#86efac" opacity="0.6" />
                <text x="400" y="185" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="black">
                  TİLAKOİT DİSKLERİ ★
                </text>
              </g>

              {/* Granum 3 (Right - 5 Discs) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: '570px 260px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('thylakoid');
                }}
              >
                {[215, 230, 245, 260, 275].map((y, idx) => (
                  <rect
                    key={idx}
                    x="535"
                    y={y}
                    width="70"
                    height="11"
                    rx="5"
                    fill={selectedId === 'thylakoid' ? 'url(#discGradActive)' : 'url(#discGrad)'}
                    stroke="#14532d"
                    strokeWidth="1.5"
                  />
                ))}
                <text x="570" y="205" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">
                  GRANUM 3
                </text>
              </g>

              {/* Interactive Hotspot Buttons directly on diagram */}
              <g className="cursor-pointer" onClick={() => handleSelect('outer_membrane')}>
                <rect x="520" y="35" width="130" height="26" rx="13" fill="#ffffff" stroke="#166534" strokeWidth="1.5" />
                <text x="585" y="52" textAnchor="middle" fill="#143823" fontSize="11" fontWeight="bold">
                  Dış ve İç Zar
                </text>
              </g>

              <g className="cursor-pointer" onClick={() => handleSelect('stroma')}>
                <rect x="140" y="380" width="140" height="26" rx="13" fill="#ffffff" stroke="#166534" strokeWidth="1.5" />
                <text x="210" y="397" textAnchor="middle" fill="#143823" fontSize="11" fontWeight="bold">
                  Stroma (Sıvı Alan)
                </text>
              </g>
            </svg>
          </div>

          {/* Quick Structure Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-3 border-t border-[#edf2ea] w-full">
            {CHLOROPLAST_PARTS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={`h-9 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedId === p.id
                    ? 'bg-[#166534] text-white border-[#166534] shadow-sm'
                    : 'bg-[#f4f8f2] text-[#3d5a49] border-[#dce6da] hover:bg-[#eaf3e7]'
                }`}
              >
                {p.reactionZone === 'light' ? '☀️ ' : p.reactionZone === 'calvin' ? '♻️ ' : '🛡️ '}
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: The 3 Core Pedagogical Questions & Next Steps (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tag / Category Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider">
                YAPI İNCELEMESİ
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                  activePart.reactionZone === 'light'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : activePart.reactionZone === 'calvin'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                {activePart.reactionZone === 'light'
                  ? 'Işık Evresi Sahası'
                  : activePart.reactionZone === 'calvin'
                  ? 'Calvin Döngüsü Sahası'
                  : 'Koruyucu Sınır'}
              </span>
            </div>

            {/* Structure Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
              {activePart.name}
            </h2>

            {/* 1. Bu Yapı Nedir? */}
            <div className="bg-[#f8faf6] border border-[#e2ede0] rounded-xl p-3">
              <span className="text-[11px] font-extrabold text-[#166534] uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#166534]" />
                1. Bu Yapı Nedir?
              </span>
              <p className="text-xs text-[#2c4a37] font-medium leading-relaxed mt-1">
                {activePart.whatIsIt}
              </p>
            </div>

            {/* 2. Nerede Bulunur? */}
            <div className="bg-[#f8faf6] border border-[#e2ede0] rounded-xl p-3">
              <span className="text-[11px] font-extrabold text-[#166534] uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#166534]" />
                2. Nerede Bulunur?
              </span>
              <p className="text-xs text-[#2c4a37] font-medium leading-relaxed mt-1">
                {activePart.whereIsIt}
              </p>
            </div>

            {/* 3. Görevi Nedir? */}
            <div className="bg-[#f8faf6] border border-[#e2ede0] rounded-xl p-3">
              <span className="text-[11px] font-extrabold text-[#166534] uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#166534]" />
                3. Biyolojik Görevi Nedir?
              </span>
              <p className="text-xs text-[#1e3b29] font-semibold leading-relaxed mt-1">
                {activePart.role}
              </p>
            </div>

            {/* Two-Column Comparison Card */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div
                onClick={() => handleSelect('thylakoid')}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  activePart.id === 'thylakoid'
                    ? 'bg-amber-100/70 border-amber-400 font-bold'
                    : 'bg-[#fafcf9] border-[#e2ece0] hover:bg-[#f1f6ef]'
                }`}
              >
                <div className="flex items-center gap-1 text-xs text-amber-900 font-extrabold">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>TİLAKOİT</span>
                </div>
                <span className="text-[11px] text-[#4d6957] block mt-0.5">Işığa Bağlı Tepkimeler</span>
              </div>

              <div
                onClick={() => handleSelect('stroma')}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  activePart.id === 'stroma'
                    ? 'bg-emerald-100/70 border-emerald-400 font-bold'
                    : 'bg-[#fafcf9] border-[#e2ece0] hover:bg-[#f1f6ef]'
                }`}
              >
                <div className="flex items-center gap-1 text-xs text-emerald-900 font-extrabold">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>STROMA</span>
                </div>
                <span className="text-[11px] text-[#4d6957] block mt-0.5">Calvin Döngüsü</span>
              </div>
            </div>
          </div>

          {/* Navigation to Stage 03 */}
          <div className="pt-4 border-t border-[#edf2ea] mt-4 space-y-2">
            <button
              onClick={onGoToLightReactions}
              className="w-full h-13 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>IŞIĞA BAĞLI TEPKİMELERİ BAŞLAT (03)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Tilakoit zarına yaklaşıp elektron akışını ve ATP üretimini göreceğiz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
