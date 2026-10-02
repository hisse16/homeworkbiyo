import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Sun, Palette, Sparkles, Check } from 'lucide-react';

interface Props {
  onGoToBuildModel: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

export const PigmentsStage: React.FC<Props> = ({
  onGoToBuildModel,
  voiceEnabled,
  onSpeakText
}) => {
  const [wavelength, setWavelength] = useState<number>(430); // 380 to 750 nm
  const [selectedPigment, setSelectedPigment] = useState<'all' | 'chla' | 'chlb' | 'carot'>('all');

  // Compute color in visible spectrum based on wavelength
  const getSpectrumColor = (wl: number) => {
    if (wl < 440) return { name: 'Mor Işık', hex: '#7c3aed', bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' };
    if (wl < 490) return { name: 'Mavi Işık', hex: '#0284c7', bg: 'bg-sky-100', text: 'text-sky-900', border: 'border-sky-300' };
    if (wl < 560) return { name: 'Yeşil Işık', hex: '#16a34a', bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' };
    if (wl < 590) return { name: 'Sarı Işık', hex: '#ca8a04', bg: 'bg-yellow-100', text: 'text-yellow-900', border: 'border-yellow-300' };
    if (wl < 640) return { name: 'Turuncu Işık', hex: '#ea580c', bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300' };
    return { name: 'Kırmızı Işık', hex: '#dc2626', bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300' };
  };

  const spectrum = getSpectrumColor(wavelength);

  // Absorption values calculated for Chlorophyll a, Chlorophyll b, Carotenoids
  // Klorofil a has peaks at ~430nm (blue) and ~660nm (red), valley at 520-550nm (green)
  const absChlA = Math.round(
    Math.max(12, 95 * Math.exp(-Math.pow((wavelength - 430) / 32, 2)) + 82 * Math.exp(-Math.pow((wavelength - 662) / 38, 2)) + 8)
  );

  // Klorofil b has peaks at ~450nm and ~640nm
  const absChlB = Math.round(
    Math.max(10, 92 * Math.exp(-Math.pow((wavelength - 455) / 34, 2)) + 65 * Math.exp(-Math.pow((wavelength - 642) / 35, 2)) + 7)
  );

  // Karotenoidler peak at ~450-490nm (blue-cyan), drops to near 0 above 520nm
  const absCarot = Math.round(
    Math.max(4, 88 * Math.exp(-Math.pow((wavelength - 475) / 45, 2)))
  );

  // Total Relative Photosynthesis Rate at this wavelength
  const relRate = Math.min(100, Math.round((absChlA * 0.45 + absChlB * 0.35 + absCarot * 0.20)));

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>05 · PİGMENTLER VE IŞIK TAYFI</span>
            <span>•</span>
            <span>FOTOSENTETİK SOĞURMA (ABSORPSİYON)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Işığın Dalga Boyu ve <span className="text-[#166534]">Fotosentez Pigmentleri</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Bitkiler görünür ışığın tamamını aynı oranda soğuramaz. Klorofil <b>mor/mavi</b> ve <b>kırmızı</b> ışığı en yüksek oranda soğururken, <b>yeşil ışığı</b> büyük oranda yansıtır.
          </p>
        </div>

        {/* Teacher / Class Prompt */}
        <div className="bg-[#edf6eb] border border-[#cbe1c7] rounded-xl p-3 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#166534] text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-[#143823] block">Sınıfa Sor:</span>
            <span className="text-[#3b6348]">Bitkiler yeşil ışıkta hiç mi fotosentez yapamaz?</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Spectrum Slider & Curve + Pigment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: 380 - 750 nm Interactive Spectrum & Absorption Curve (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Live Interactive Wavelength Slider */}
            <div className="p-4 bg-[#f8faf6] border border-[#dce6da] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#166534] uppercase tracking-wider">
                    GÖRÜNÜR IŞIK TAYFI (SPEKTRUM):
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${spectrum.bg} ${spectrum.text} ${spectrum.border}`}>
                    {spectrum.name} ({wavelength} nm)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#143823]">
                  Tahmini Bağıl Fotosentez Hızı: <b>%{relRate}</b>
                </span>
              </div>

              {/* Spectrum Gradient Track */}
              <div
                className="w-full h-7 rounded-xl border border-[#cbd5e1] shadow-inner relative"
                style={{
                  background: 'linear-gradient(to right, #581c87 0%, #3b82f6 20%, #10b981 40%, #eab308 60%, #f97316 75%, #ef4444 100%)'
                }}
              >
                {/* Pointer marker */}
                <div
                  className="absolute top-0 bottom-0 w-3 bg-white border-2 border-slate-900 rounded-full shadow-lg transform -translate-x-1/2"
                  style={{ left: `${((wavelength - 380) / (750 - 380)) * 100}%` }}
                />
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="380"
                max="750"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full h-2 bg-transparent appearance-none cursor-pointer accent-[#166534]"
              />

              <div className="flex justify-between text-[11px] font-mono font-bold text-slate-500">
                <span>380 nm (Mor)</span>
                <span>450 nm (Mavi)</span>
                <span>550 nm (Yeşil)</span>
                <span>600 nm (Sarı/Turuncu)</span>
                <span>750 nm (Kırmızı)</span>
              </div>
            </div>

            {/* Scientific Absorption Chart Canvas */}
            <div className="p-4 bg-[#fafcf9] border border-[#dce6da] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#166534] uppercase">
                  PİGMENTLERİN IŞIĞI SOĞURMA (ABSORPSİYON) EĞRİLERİ
                </span>
                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="flex items-center gap-1 text-[#15803d]">
                    <span className="w-3 h-1 bg-[#15803d] rounded" /> Klorofil a
                  </span>
                  <span className="flex items-center gap-1 text-[#22c55e]">
                    <span className="w-3 h-1 bg-[#22c55e] rounded" /> Klorofil b
                  </span>
                  <span className="flex items-center gap-1 text-[#ea580c]">
                    <span className="w-3 h-1 bg-[#ea580c] rounded" /> Karotenoid
                  </span>
                </div>
              </div>

              {/* SVG Absorption Spectrum Plot */}
              <div className="w-full h-52 relative">
                <svg viewBox="0 0 700 200" className="w-full h-full select-none">
                  {/* Grid Lines */}
                  <line x1="50" y1="20" x2="680" y2="20" stroke="#e5ede2" strokeDasharray="3 3" />
                  <line x1="50" y1="90" x2="680" y2="90" stroke="#e5ede2" strokeDasharray="3 3" />
                  <line x1="50" y1="160" x2="680" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="50" y1="15" x2="50" y2="160" stroke="#94a3b8" strokeWidth="1.5" />

                  {/* Y Axis Labels */}
                  <text x="42" y="24" textAnchor="end" fill="#64748b" fontSize="9" fontWeight="bold">%100</text>
                  <text x="42" y="94" textAnchor="end" fill="#64748b" fontSize="9">%50</text>
                  <text x="42" y="164" textAnchor="end" fill="#64748b" fontSize="9">%0</text>
                  <text x="15" y="90" fill="#15803d" fontSize="9" fontWeight="bold" transform="rotate(-90 15 90)">
                    Işığı Soğurma
                  </text>

                  {/* Shaded green light low-absorption zone (500nm - 580nm) */}
                  <rect x="254" y="20" width="136" height="140" fill="#dcfce7" opacity="0.35" />
                  <text x="322" y="35" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="bold">
                    Yeşil Işık Vadisi (Büyük kısmı yansıtılır)
                  </text>

                  {/* Plot 1: Klorofil a (Dark Green Curve) */}
                  <path
                    d="M 50 145 C 80 140, 110 30, 135 30 C 170 30, 210 135, 320 145 C 430 150, 480 140, 528 45 C 560 45, 610 145, 680 155"
                    fill="none"
                    stroke="#15803d"
                    strokeWidth="3"
                  />

                  {/* Plot 2: Klorofil b (Lime Green Curve) */}
                  <path
                    d="M 50 150 C 90 145, 150 40, 178 35 C 220 35, 270 140, 340 148 C 420 150, 460 145, 495 65 C 530 65, 590 148, 680 158"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />

                  {/* Plot 3: Karotenoidler (Orange Curve) */}
                  <path
                    d="M 50 155 C 100 150, 180 45, 212 40 C 250 40, 280 150, 310 155 L 680 158"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                  />

                  {/* Active Wavelength Indicator Vertical Line */}
                  <line
                    x1={50 + ((wavelength - 380) / (750 - 380)) * 630}
                    y1="20"
                    x2={50 + ((wavelength - 380) / (750 - 380)) * 630}
                    y2="160"
                    stroke="#0f172a"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />

                  {/* Current Active Dot on Chlorophyll a */}
                  <circle
                    cx={50 + ((wavelength - 380) / (750 - 380)) * 630}
                    cy={160 - (absChlA / 100) * 140}
                    r="5"
                    fill="#15803d"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />

                  {/* X Axis Wavelength Labels */}
                  <text x="50" y="175" textAnchor="middle" fill="#64748b" fontSize="9">380 nm</text>
                  <text x="135" y="175" textAnchor="middle" fill="#64748b" fontSize="9">430 nm</text>
                  <text x="322" y="175" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="bold">550 nm (Yeşil)</text>
                  <text x="528" y="175" textAnchor="middle" fill="#64748b" fontSize="9">660 nm</text>
                  <text x="680" y="175" textAnchor="middle" fill="#64748b" fontSize="9">750 nm</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Critical Scientific Note about Green Light */}
          <div className="p-3.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <span className="font-extrabold text-[#143823] block">
                Önemli Sınıf Kavram Yanılgısı: "Yeşil Işıkta Fotosentez Sıfır mıdır?"
              </span>
              <p className="text-[#2b4c38] leading-relaxed">
                <b>Hayır!</b> Klorofiller yeşil ışığın çoğunu yansıtsa da yapraktaki yardımcı pigmentler (karotenoidler) ve klorofiller yeşil ışığın bir kısmını soğurur. Bu nedenle <b>yeşil ışıkta fotosentez en yavaştır ama ASLA SIFIR DEĞİLDİR!</b>
              </p>
            </div>
          </div>
        </div>

        {/* Right: The 3 Core Pigment Families (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3.5">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              FOTOSENTEZ PİGMENT AİLELERİ
            </span>

            {/* 1. Klorofil a */}
            <div className="p-3.5 rounded-2xl bg-[#f0fdf4] border border-[#86efac] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#14532d]">1. Klorofil a</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  Reaksiyon Merkezi
                </span>
              </div>
              <p className="text-xs text-[#2b4c38] leading-relaxed">
                Mavi-yeşil renklidir. Fotosentezin doğrudan kimyasal tepkime merkezini (P680 ve P700) oluşturur. Uyarılmış elektronu ilk fırlatan pigmenttir.
              </p>
            </div>

            {/* 2. Klorofil b */}
            <div className="p-3.5 rounded-2xl bg-[#f7fee7] border border-[#d9f99d] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#365314]">2. Klorofil b</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-200 text-lime-900">
                  Anten Kompleksi
                </span>
              </div>
              <p className="text-xs text-[#3f6212] leading-relaxed">
                Sarı-yeşil renklidir. Klorofil a’nın iyi soğuramadığı dalga boylarını yakalar ve topladığı foton enerjisini reaksiyon merkezindeki klorofil a’ya aktarır.
              </p>
            </div>

            {/* 3. Karotenoidler (Karoten, Ksantofil, Likopen) */}
            <div className="p-3.5 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#7c2d12]">3. Karotenoidler</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-200 text-orange-900">
                  Koruyucu & Yardımcı
                </span>
              </div>
              <p className="text-xs text-[#9a3412] leading-relaxed">
                Turuncu (karoten), sarı (ksantofil) ve kırmızı (likopen) renk verirler. İki temel rolleri vardır:
                <br />• Klorofili aşırı ışık zararından korurlar (fotooksidasyonu önlerler).
                <br />• Soğurdukları ışık enerjisini klorofile iletirler.
              </p>
            </div>
          </div>

          {/* Navigation to Stage 09 (Build Model) */}
          <div className="pt-3 border-t border-[#edf2ea] mt-3 space-y-1.5">
            <button
              onClick={onGoToBuildModel}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>MODELİNİ KUR BÖLÜMÜNE GEÇ (09)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Sıradaki: Ödev gereksinimi olan öğrencinin kendi fotosentez modelini tasarlaması
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
