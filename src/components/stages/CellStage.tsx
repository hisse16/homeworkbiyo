import React, { useState } from 'react';
import { Check, ArrowRight, HelpCircle, Sparkles, Sprout, Activity } from 'lucide-react';
import { OrganelleInfo } from '../../types';

interface Props {
  onNextStage: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

const ORGANELLES: OrganelleInfo[] = [
  {
    id: 'chloroplast',
    name: 'Kloroplast (Fotosentez Merkezi)',
    location: 'Sitoplazma içinde, özellikle yaprağın mezofil (palizat ve sünger parankiması) hücrelerinde bolca bulunur.',
    role: 'İçerdiği klorofil pigmentleri sayesinde güneş ışığını soğurur. Su (H₂O) ve karbondioksiti (CO₂) kullanarak organik besin (PGAL, glikoz) ve oksijen (O₂) üretir.',
    isChloroplast: true
  },
  {
    id: 'mitochondria',
    name: 'Mitokondri (Hücresel Solunum)',
    location: 'Sitoplazma içine dağılmış halde, enerji ihtiyacı yüksek bölgelerde yer alır.',
    role: 'Oksijenli solunum merkezidir. Kloroplastın ürettiği glikoz ve O₂’yi tüketerek hücresel işler için ATP üretir; dışarıya CO₂ ve H₂O verir. Kloroplast ile mitokondri bitki hücresinde birbirini besleyen muhteşem bir metabolik döngü oluşturur!',
    isChloroplast: false
  },
  {
    id: 'cytoplasm',
    name: 'Sitoplazma (Hücre İçi Sıvı Ortam)',
    location: 'Hücre zarı ile çekirdek arasını dolduran kolloidal akışkan matriks.',
    role: 'Tüm organellerin içinde yüzdüğü akışkan sıvıdır. Fotosentez için kökten taşınan su ve mineraller kloroplata sitoplazma üzerinden ulaşır; kloroplasttan çıkan PGAL burada glikoza veya sükroza dönüştürülür.',
    isChloroplast: false
  },
  {
    id: 'wall',
    name: 'Hücre Çeperi (Selüloz Duvar)',
    location: 'Hücre zarının en dışında yer alan sert koruyucu tabaka.',
    role: 'Selüloz liflerinden oluşur. Hücreye sabit bir form, turgor desteği ve mekanik dayanıklılık kazandırır. Tam geçirgendir; fotosentez yapmaz.',
    isChloroplast: false
  },
  {
    id: 'membrane',
    name: 'Hücre Zarı (Plazma Zarı)',
    location: 'Hücre çeperinin hemen altında sitoplazmayı çevreler.',
    role: 'Seçici geçirgen çift katlı fosfolipit tabakadır. Hücreye gazların (CO₂, O₂) ve suyun kontrollü giriş çıkışını düzenler.',
    isChloroplast: false
  },
  {
    id: 'vacuole',
    name: 'Merkezi Koful',
    location: 'Olgun bitki hücresinin merkezinde hacmin %80-90’ını kaplar.',
    role: 'Hücre özsuyunu depolar. Turgor basıncı oluşturarak otsu kısımların dik durmasını sağlar ve fotosentez için gereken su dengesini tamponlar.',
    isChloroplast: false
  },
  {
    id: 'nucleus',
    name: 'Çekirdek',
    location: 'Geniş koful nedeniyle genellikle hücre çeperine yakın bir kenara itilmiştir.',
    role: 'DNA’yı barındırır, hücrenin yönetim ve kalıtım merkezidir. Kloroplastın kendi DNA’sı olsa da fotosentez enzimlerinin büyük bölümü çekirdek genleri kontrolünde üretilir.',
    isChloroplast: false
  }
];

export const CellStage: React.FC<Props> = ({ onNextStage, voiceEnabled, onSpeakText }) => {
  const [selectedId, setSelectedId] = useState<string>('chloroplast');
  const selectedOrganelle = ORGANELLES.find((o) => o.id === selectedId) || ORGANELLES[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const item = ORGANELLES.find((o) => o.id === id);
    if (voiceEnabled && item) {
      onSpeakText(`${item.name}. ${item.role}`);
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Zoom Level Breadcrumb: Bitki -> Hücre -> Kloroplast -> Moleküler Akış */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-3 px-4 shadow-sm flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#166534] font-bold">
          <span className="flex items-center gap-1 text-slate-500">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>1. Bitki (Yaprak)</span>
          </span>
          <span className="text-slate-300">→</span>
          <span className="flex items-center gap-1 text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300 font-extrabold">
            <span>2. Bitki Hücresi</span>
          </span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">3. Kloroplast</span>
          <span className="text-slate-300">→</span>
          <span className="text-slate-400">4. Moleküler Reaksiyonlar</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
          Ölçek: 10–100 µm
        </span>
      </div>

      {/* Stage Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>01 · BİTKİ HÜCRESİ</span>
            <span>•</span>
            <span>HÜCRESEL BÜTÜNLÜK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Fotosentez Yalnızca Kloroplasttan İbaret Değildir:{' '}
            <span className="text-[#166534]">Bitki Hücresi</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Fotosentezin ham maddeleri (su, CO₂, mineraller) ve ürünleri (glikoz, oksijen) hücrenin tüm organelleriyle koordineli çalışır. Kloroplast ile mitokondri arasındaki enerji döngüsüne dikkat edin.
          </p>
        </div>

        {/* Teacher / Class Prompt */}
        <div className="bg-[#edf6eb] border border-[#cbe1c7] rounded-xl p-3 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#166534] text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-[#143823] block">Sınıfa Sor:</span>
            <span className="text-[#3b6348]">Bitki hücresi geceleri fotosentez durunca nasıl canlı kalır?</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[530px]">
        {/* Left: Botanical Plant Cell Diagram with Mitochondria & Cytoplasm (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-bold text-[#446b52]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
            <span>Bitki Hücresi Tam Anatomisi (Mitokondri, Sitoplazma, Kloroplast)</span>
          </div>

          {/* SVG Plant Cell Illustration */}
          <div className="w-full max-w-[740px] aspect-[16/10] relative flex items-center justify-center mt-5">
            <svg viewBox="0 0 760 480" className="w-full h-full drop-shadow-md">
              <defs>
                {/* Cell wall texture */}
                <linearGradient id="cellWallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7fa873" />
                  <stop offset="50%" stopColor="#96be88" />
                  <stop offset="100%" stopColor="#6e9663" />
                </linearGradient>

                {/* Cytoplasm gradient */}
                <radialGradient id="cytoGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f3f9f0" />
                  <stop offset="70%" stopColor="#e3f0de" />
                  <stop offset="100%" stopColor="#d5e8ce" />
                </radialGradient>

                {/* Vacuole gradient */}
                <linearGradient id="vacuoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.95" />
                </linearGradient>

                {/* Nucleus gradient */}
                <radialGradient id="nucleusGrad" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#e0e7ff" />
                  <stop offset="70%" stopColor="#c7d2fe" />
                  <stop offset="100%" stopColor="#a5b4fc" />
                </radialGradient>

                {/* Chloroplast gradient */}
                <radialGradient id="chloroOrganelleGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="50%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>

                {/* Mitochondria gradient */}
                <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="50%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#9a3412" />
                </linearGradient>
              </defs>

              {/* 1. Outer Cell Wall (Hücre Çeperi) */}
              <polygon
                points="110,40 650,40 720,240 650,440 110,440 40,240"
                fill="url(#cellWallGrad)"
                stroke="#47693d"
                strokeWidth="10"
                strokeLinejoin="round"
                className="cursor-pointer transition-all hover:opacity-95"
                onClick={() => handleSelect('wall')}
              />

              {/* 2. Inner Cell Membrane & Cytoplasm */}
              <polygon
                points="120,54 640,54 706,240 640,426 120,426 54,240"
                fill="url(#cytoGrad)"
                stroke="#408253"
                strokeWidth="4"
                strokeLinejoin="round"
                className="cursor-pointer"
                onClick={() => handleSelect('cytoplasm')}
              />

              {/* 3. Central Vacuole (Merkezi Koful) */}
              <path
                d="M 230 130 Q 420 110 510 180 Q 560 260 470 340 Q 330 360 240 300 Q 180 230 230 130 Z"
                fill="url(#vacuoleGrad)"
                stroke="#7dd3fc"
                strokeWidth="3"
                className={`cursor-pointer transition-transform ${
                  selectedId === 'vacuole' ? 'filter drop-shadow(0 0 10px #38bdf8)' : ''
                }`}
                onClick={() => handleSelect('vacuole')}
              />
              <text x="350" y="240" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
                Merkezi Koful (Hücre Özsuyu)
              </text>

              {/* 4. Nucleus (Çekirdek) */}
              <g
                className={`cursor-pointer transition-all ${
                  selectedId === 'nucleus' ? 'filter drop-shadow(0 0 12px #6366f1)' : ''
                }`}
                onClick={() => handleSelect('nucleus')}
              >
                <circle cx="560" cy="330" r="50" fill="url(#nucleusGrad)" stroke="#6366f1" strokeWidth="3" />
                <circle cx="545" cy="318" r="16" fill="#4f46e5" opacity="0.6" />
                <text x="560" y="348" textAnchor="middle" fill="#312e81" fontSize="11" fontWeight="bold">
                  Çekirdek
                </text>
              </g>

              {/* 5. MITOCHONDRIA (Mitokondriler - Eklenen Kritik Biyolojik Unsur) */}
              {/* Mitochondria 1 (Top Center-Right) */}
              <g
                className={`cursor-pointer transition-transform ${
                  selectedId === 'mitochondria' ? 'scale-110 filter drop-shadow(0 0 14px #ea580c)' : 'hover:scale-105'
                }`}
                style={{ transformOrigin: '400px 90px' }}
                onClick={() => handleSelect('mitochondria')}
              >
                <ellipse cx="400" cy="90" rx="36" ry="18" fill="url(#mitoGrad)" stroke="#c2410c" strokeWidth="2" transform="rotate(-15 400 90)" />
                {/* Cristae folds */}
                <path d="M 378 90 Q 388 84 398 90 T 418 90" fill="none" stroke="#fed7aa" strokeWidth="2" />
                <text x="400" y="122" textAnchor="middle" fill="#9a3412" fontSize="10" fontWeight="bold">
                  Mitokondri
                </text>
              </g>

              {/* Mitochondria 2 (Bottom Right) */}
              <g
                className={`cursor-pointer transition-transform ${
                  selectedId === 'mitochondria' ? 'scale-110 filter drop-shadow(0 0 14px #ea580c)' : 'hover:scale-105'
                }`}
                style={{ transformOrigin: '630px 220px' }}
                onClick={() => handleSelect('mitochondria')}
              >
                <ellipse cx="630" cy="220" rx="34" ry="17" fill="url(#mitoGrad)" stroke="#c2410c" strokeWidth="2" transform="rotate(35 630 220)" />
                <path d="M 612 220 Q 622 215 632 220 T 648 220" fill="none" stroke="#fed7aa" strokeWidth="2" />
                <text x="630" y="252" textAnchor="middle" fill="#9a3412" fontSize="9" fontWeight="bold">
                  Mitokondri
                </text>
              </g>

              {/* 6. MULTIPLE CHLOROPLASTS */}
              {/* Chloroplast 1 (Top Left) */}
              <g
                className={`cursor-pointer transition-transform ${
                  selectedId === 'chloroplast' ? 'scale-105 filter drop-shadow(0 0 16px #22c55e)' : 'hover:scale-105'
                }`}
                style={{ transformOrigin: '190px 100px' }}
                onClick={() => handleSelect('chloroplast')}
              >
                <ellipse cx="190" cy="100" rx="46" ry="26" fill="url(#chloroOrganelleGrad)" stroke="#15803d" strokeWidth="3" transform="rotate(-15 190 100)" />
                <ellipse cx="175" cy="100" rx="9" ry="4" fill="#86efac" />
                <ellipse cx="190" cy="98" rx="10" ry="4" fill="#86efac" />
                <ellipse cx="205" cy="96" rx="9" ry="4" fill="#86efac" />
                <text x="190" y="142" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">
                  Kloroplast 1
                </text>
              </g>

              {/* Chloroplast 2 (Bottom Left - Main Focus Organelle) */}
              <g
                className={`cursor-pointer transition-transform ${
                  selectedId === 'chloroplast' ? 'scale-110 filter drop-shadow(0 0 20px #16a34a)' : 'hover:scale-105'
                }`}
                style={{ transformOrigin: '150px 340px' }}
                onClick={() => handleSelect('chloroplast')}
              >
                <ellipse cx="150" cy="340" rx="55" ry="32" fill="url(#chloroOrganelleGrad)" stroke="#22c55e" strokeWidth="4" transform="rotate(20 150 340)" />
                {/* Grana stacks */}
                <g fill="#bbf7d0" stroke="#166534" strokeWidth="0.8">
                  <rect x="125" y="325" width="10" height="4" rx="2" />
                  <rect x="125" y="331" width="10" height="4" rx="2" />
                  <rect x="125" y="337" width="10" height="4" rx="2" />

                  <rect x="144" y="328" width="12" height="4" rx="2" />
                  <rect x="144" y="334" width="12" height="4" rx="2" />
                  <rect x="144" y="340" width="12" height="4" rx="2" />

                  <rect x="165" y="332" width="10" height="4" rx="2" />
                  <rect x="165" y="338" width="10" height="4" rx="2" />
                </g>
                <circle cx="150" cy="340" r="4" fill="#facc15" className="animate-ping" />
                <text x="150" y="390" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="extrabold">
                  KLOROPLAST ★
                </text>
              </g>

              {/* Chloroplast 3 (Top Right) */}
              <g
                className={`cursor-pointer transition-transform ${
                  selectedId === 'chloroplast' ? 'scale-105 filter drop-shadow(0 0 16px #22c55e)' : 'hover:scale-105'
                }`}
                style={{ transformOrigin: '590px 110px' }}
                onClick={() => handleSelect('chloroplast')}
              >
                <ellipse cx="590" cy="110" rx="48" ry="26" fill="url(#chloroOrganelleGrad)" stroke="#15803d" strokeWidth="3" transform="rotate(10 590 110)" />
                <ellipse cx="575" cy="110" rx="9" ry="4" fill="#86efac" />
                <ellipse cx="590" cy="110" rx="10" ry="4" fill="#86efac" />
                <ellipse cx="605" cy="110" rx="9" ry="4" fill="#86efac" />
                <text x="590" y="152" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">
                  Kloroplast 3
                </text>
              </g>

              {/* Sitoplazma Label on canvas */}
              <g className="cursor-pointer" onClick={() => handleSelect('cytoplasm')}>
                <rect x="230" y="375" width="115" height="24" rx="12" fill="#ffffff" stroke="#94a3b8" />
                <text x="287" y="391" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
                  Sitoplazma
                </text>
              </g>
            </svg>
          </div>

          {/* Quick organelle selector pills underneath */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-2.5 border-t border-[#edf2ea] w-full">
            {ORGANELLES.map((o) => (
              <button
                key={o.id}
                onClick={() => handleSelect(o.id)}
                className={`h-9 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedId === o.id
                    ? o.isChloroplast
                      ? 'bg-[#166534] text-white border-[#166534] shadow-sm'
                      : o.id === 'mitochondria'
                      ? 'bg-[#c2410c] text-white border-[#c2410c] shadow-sm'
                      : 'bg-[#1e293b] text-white border-[#1e293b]'
                    : 'bg-[#f4f8f2] text-[#3d5a49] border-[#dce6da] hover:bg-[#eaf3e7]'
                }`}
              >
                {o.isChloroplast ? '🌿 ' : o.id === 'mitochondria' ? '⚡ ' : ''}{o.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Structure Detail & Classroom Next Step (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Tag / Category */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider">
                YAPI VE GÖREV DETAYI
              </span>
              {selectedOrganelle.isChloroplast ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Fotosentez Organeli
                </span>
              ) : selectedOrganelle.id === 'mitochondria' ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-orange-100 text-orange-800 border border-orange-300 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-orange-600" />
                  Hücresel Solunum
                </span>
              ) : null}
            </div>

            {/* Organelle Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#143823] tracking-tight">
              {selectedOrganelle.name}
            </h2>

            {/* Location info */}
            <div className="bg-[#f7faf5] border border-[#e2ece0] rounded-xl p-3">
              <span className="text-[10px] font-bold text-[#627d6d] uppercase block">Konumu:</span>
              <p className="text-xs text-[#2b4c38] font-medium mt-0.5">{selectedOrganelle.location}</p>
            </div>

            {/* Role / Function info */}
            <div className="bg-[#f7faf5] border border-[#e2ece0] rounded-xl p-3">
              <span className="text-[10px] font-bold text-[#627d6d] uppercase block">Biyolojik Görevi:</span>
              <p className="text-xs text-[#1e3b29] leading-relaxed mt-0.5">{selectedOrganelle.role}</p>
            </div>

            {/* Highlight card depending on selection */}
            {selectedOrganelle.isChloroplast ? (
              <div className="bg-[#eaf6e8] border border-[#b2ddaf] rounded-2xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>İşte Aradığımız Organel!</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Fotosentezin ışık ve karbon reaksiyonları kloroplastın içinde gerçekleşir. Şimdi kloroplastın çift zarını, stromasını ve tilakoit disklerini yakından görelim.
                </p>
              </div>
            ) : selectedOrganelle.id === 'mitochondria' ? (
              <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-2xl p-3.5 space-y-1 text-xs text-orange-950">
                <span className="font-extrabold block text-orange-900">Kloroplast ↔ Mitokondri İş Birliği:</span>
                <p className="leading-relaxed">
                  Kloroplast gündüz besin ve O₂ üretir. Mitokondri ise gece-gündüz aralıksız solunum yaparak bu besinden ATP sentezler ve açığa çıkan CO₂ kloroplast tarafından tekrar tutulur.
                </p>
              </div>
            ) : (
              <div className="bg-[#f8faf6] border border-[#e2ece0] rounded-xl p-3 text-xs text-slate-700">
                <span className="font-bold">Hücresel Bütünlük:</span> Bu yapı kloroplastın işlevini sürdürmesi için ortam ve mekanik destek sağlar.
              </div>
            )}
          </div>

          {/* Bottom Action: Proceed into Chloroplast */}
          <div className="pt-3 border-t border-[#edf2ea] mt-3">
            <button
              onClick={onNextStage}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>KLOROPLASTIN İÇİNE GİR (02)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] mt-1.5 font-medium">
              Sıradaki: Kloroplastın iç mimarisi (Stroma vs. Tilakoit)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
