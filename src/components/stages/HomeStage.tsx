import React from 'react';
import { ArrowRight, Sun, Droplets, Wind, Zap, Sparkles, Volume2, Sprout } from 'lucide-react';

interface Props {
  onStartCourse: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

export const HomeStage: React.FC<Props> = ({ onStartCourse, voiceEnabled, onSpeakText }) => {
  const handleNarrate = () => {
    onSpeakText(
      'Fotosentez: Bir bitki ışığı nasıl maddeye çevirir? Fotosentez tek bir adım değil, bitki hücresinden başlayıp kloroplastın içine uzanan muhteşem bir biyolojik enerji dönüşüm zinciridir. Işık tepkimelerinde su parçalanır ve ATP ile NADPH üretilir; Calvin döngüsünde ise karbondioksit tutularak organik besin sentezlenir.'
    );
  };

  return (
    <div className="w-full max-w-[1450px] mx-auto py-4 px-2 sm:px-6 flex flex-col justify-center min-h-[580px] select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Pedagogical Narrative & Start */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#166534] text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>10. Sınıf Biyoloji · Akıllı Tahta Etkileşimli Dersi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#143823] tracking-tight leading-[1.08]">
            Bir bitki <br />
            <span className="text-[#166534]">ışığı nasıl</span> <br />
            organik besine çevirir?
          </h1>

          <p className="text-base sm:text-lg text-[#3d5a49] leading-relaxed max-w-xl font-medium">
            Fotosentezi kopuk parçalar halinde değil, tek bir eksiksiz zincir olarak keşfedin:
            <br />
            <b className="text-[#143823]">Bitki hücresi → Kloroplast → Işık tepkimeleri → Calvin döngüsü → PGAL → Glikoz.</b>
          </p>

          {/* Key Biological Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-3 bg-white border border-[#dce6da] rounded-xl flex items-center gap-2 text-xs font-bold text-[#143823] shadow-sm">
              <Sun className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Güneş Işığı</span>
            </div>
            <div className="p-3 bg-white border border-[#dce6da] rounded-xl flex items-center gap-2 text-xs font-bold text-[#143823] shadow-sm">
              <Droplets className="w-4 h-4 text-sky-500 shrink-0" />
              <span>H₂O → O₂</span>
            </div>
            <div className="p-3 bg-white border border-[#dce6da] rounded-xl flex items-center gap-2 text-xs font-bold text-[#143823] shadow-sm">
              <Zap className="w-4 h-4 text-orange-500 shrink-0" />
              <span>ATP + NADPH</span>
            </div>
            <div className="p-3 bg-white border border-[#dce6da] rounded-xl flex items-center gap-2 text-xs font-bold text-[#143823] shadow-sm">
              <Wind className="w-4 h-4 text-purple-500 shrink-0" />
              <span>CO₂ → PGAL</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onStartCourse}
              className="h-14 px-8 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center gap-3 shadow-lg shadow-emerald-950/20 cursor-pointer transition-all group"
            >
              <span>DERSİ BAŞLAT (02 · BİTKİ HÜCRESİ)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleNarrate}
              className="h-14 px-5 rounded-2xl bg-white hover:bg-[#edf5eb] border border-[#dce6da] text-[#166534] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
              title="Ders özetini sesli dinle"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Dersi Sesli Dinle</span>
            </button>
          </div>
        </div>

        {/* Right Column: Scientific Living Plant Illustration */}
        <div className="lg:col-span-6 bg-white border border-[#dce6da] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
          {/* Scientific Botanical SVG Diagram */}
          <div className="w-full max-w-[460px] aspect-square relative flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full select-none">
              <defs>
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#eab308" />
                </radialGradient>

                <radialGradient id="leafGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </radialGradient>
              </defs>

              {/* Sun (Top Right) */}
              <circle cx="410" cy="90" r="45" fill="url(#sunGlow)" className="animate-pulse-subtle" />
              <text x="410" y="95" textAnchor="middle" fill="#713f12" fontSize="12" fontWeight="black">
                GÜNEŞ
              </text>
              {/* Sunrays */}
              <path d="M 370 120 L 290 200" stroke="#facc15" strokeWidth="3" strokeDasharray="4 4" />
              <path d="M 350 90 L 260 140" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4 4" />

              {/* Plant Pot / Soil Base */}
              <ellipse cx="250" cy="440" rx="140" ry="24" fill="#e2ede0" stroke="#96be88" strokeWidth="2" />
              <path d="M 210 440 L 290 440" stroke="#713f12" strokeWidth="6" strokeLinecap="round" />

              {/* Plant Stem */}
              <path d="M 250 440 Q 248 300 250 160" fill="none" stroke="#16a34a" strokeWidth="12" strokeLinecap="round" />

              {/* Leaves */}
              {/* Leaf 1 (Left Low) */}
              <path d="M 248 360 C 170 350, 120 310, 130 270 C 180 270, 220 320, 248 350 Z" fill="url(#leafGrad)" stroke="#166534" strokeWidth="2" />
              {/* Leaf 2 (Right Mid) */}
              <path d="M 250 300 C 330 290, 380 250, 370 210 C 320 210, 280 260, 250 290 Z" fill="url(#leafGrad)" stroke="#166534" strokeWidth="2" />
              {/* Leaf 3 (Left High) */}
              <path d="M 250 220 C 180 210, 140 170, 150 130 C 195 130, 230 180, 250 210 Z" fill="url(#leafGrad)" stroke="#166534" strokeWidth="2" />
              {/* Leaf 4 (Top Shoot) */}
              <path d="M 250 160 C 230 110, 250 80, 260 70 C 270 80, 290 110, 250 160 Z" fill="url(#leafGrad)" stroke="#166534" strokeWidth="2" />

              {/* Input: H2O entering roots */}
              <rect x="70" y="420" width="105" height="30" rx="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="122" y="439" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
                💧 H₂O (Köklerden)
              </text>

              {/* Input: CO2 entering leaf */}
              <rect x="50" y="220" width="95" height="30" rx="8" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="97" y="239" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">
                🌫️ CO₂ (Havadan)
              </text>
              <path d="M 145 235 L 180 235" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />

              {/* Output: O2 leaving leaf */}
              <rect x="340" y="310" width="105" height="30" rx="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="392" y="329" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
                💨 O₂ (Atmosfere)
              </text>
              <path d="M 310 325 L 340 325" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />

              {/* Output: Organic Matter / Glucose */}
              <rect x="290" y="400" width="155" height="32" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
              <text x="367" y="420" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="extrabold">
                🍬 PGAL → Besin & Büyüme
              </text>
            </svg>
          </div>

          {/* Bottom Guiding Philosophy */}
          <div className="w-full bg-[#f8faf6] border border-[#dce6da] rounded-2xl p-3 text-center text-xs text-[#143823]">
            <span className="font-extrabold text-[#166534]">FOTOSENTEZİN ANA İLKESİ:</span>{' '}
            <span className="text-[#3d5a49]">
              Güneşin ışık enerjisi soğurulur; su ve karbondioksit kullanılarak kimyasal bağ enerjisine (şekere) dönüştürülür.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
