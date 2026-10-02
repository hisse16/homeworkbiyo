import React from 'react';
import { ArrowRight, CheckCircle2, BookOpen, Sun, Droplets, Wind, Zap, RefreshCw, HelpCircle } from 'lucide-react';

interface Props {
  onGoToCompare: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

export const ScientificModelStage: React.FC<Props> = ({
  onGoToCompare,
  voiceEnabled,
  onSpeakText
}) => {
  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>10 · ÖĞRETMENİN BİLİMSEL MODELİ</span>
            <span>•</span>
            <span>REFERANS BİYOLOJİK AKIŞ ŞEMASI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Akademik ve Müfredat Düzeyinde <span className="text-[#166534]">Bilimsel Model</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Ödev rubriğine göre: Kendi kurduğunuz modeli değerlendirmeden önce, MEB ve biyoloji bilim dünyasında kabul gören <b>resmî fotosentez devre modelini</b> inceleyelim.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onGoToCompare}
          className="h-12 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer shrink-0"
        >
          <span>KENDİ MODELİNLE KARŞILAŞTIR (11)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid: Canonical Scientific Diagram + Scientific Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: The Master Reference Chloroplast Circuit Diagram (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#edf2ea]">
            <span className="text-xs font-mono font-bold text-[#166534] uppercase">
              BİLİMSEL REFERANS DİYAGRAMI (CAMPBELL & MEB BİYOLOJİ)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Doğrulanmış Bilimsel Model
            </span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="w-full aspect-[16/10] relative flex items-center justify-center">
            <svg viewBox="0 0 860 480" className="w-full h-full select-none">
              <defs>
                <radialGradient id="sciCpGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f0fdf4" />
                  <stop offset="100%" stopColor="#dcfce7" />
                </radialGradient>
              </defs>

              {/* Chloroplast Double Membrane Envelope */}
              <rect x="30" y="30" width="800" height="420" rx="50" fill="url(#sciCpGrad)" stroke="#4ade80" strokeWidth="5" />
              <rect x="42" y="42" width="776" height="396" rx="40" fill="none" stroke="#86efac" strokeWidth="2" />
              <text x="70" y="70" fill="#14532d" fontSize="12" fontWeight="black">
                KLOROPLAST ORGANELİ
              </text>

              {/* Section 1: Thylakoid Membrane System */}
              <rect x="90" y="100" width="280" height="280" rx="24" fill="#ffffff" stroke="#16a34a" strokeWidth="2.5" className="drop-shadow-sm" />
              <text x="230" y="130" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="black">
                IŞIĞA BAĞLI TEPKİMELER
              </text>
              <text x="230" y="148" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
                (Tilakoit Zarlar & Grana)
              </text>

              {/* Thylakoid Disc representation */}
              <g>
                {[180, 205, 230, 255].map((y, i) => (
                  <ellipse key={i} cx="180" cy={y} rx="40" ry="11" fill="#166534" stroke="#14532d" />
                ))}
                {[195, 220, 245, 270].map((y, i) => (
                  <ellipse key={i} cx="270" cy={y} rx="38" ry="10" fill="#166534" stroke="#14532d" />
                ))}
              </g>

              {/* Input: Sunlight */}
              <path d="M 160 5 L 180 100" stroke="#eab308" strokeWidth="4" strokeDasharray="4 4" />
              <rect x="95" y="10" width="130" height="32" rx="8" fill="#fef9c3" stroke="#facc15" strokeWidth="2" />
              <text x="160" y="31" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="black">
                ☀️ Güneş Işığı
              </text>

              {/* Input: Water */}
              <path d="M 270 5 L 250 100" stroke="#0284c7" strokeWidth="4" strokeDasharray="4 4" />
              <rect x="235" y="10" width="85" height="32" rx="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
              <text x="277" y="31" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="black">
                💧 H₂O (Su)
              </text>

              {/* Output: Oxygen */}
              <path d="M 230 380 L 230 460" stroke="#0284c7" strokeWidth="4" strokeDasharray="4 4" />
              <rect x="160" y="440" width="140" height="34" rx="10" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
              <text x="230" y="462" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="black">
                💨 O₂ (Atmosfere)
              </text>

              {/* Section 2: Calvin Cycle in Stroma */}
              <rect x="490" y="100" width="280" height="280" rx="24" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" className="drop-shadow-sm" />
              <text x="630" y="130" textAnchor="middle" fill="#5b21b6" fontSize="13" fontWeight="black">
                CALVİN DÖNGÜSÜ
              </text>
              <text x="630" y="148" textAnchor="middle" fill="#6d28d9" fontSize="11" fontWeight="bold">
                (Stroma Sıvısı · Rubisko)
              </text>

              {/* Rotating Cycle Graphic */}
              <circle cx="630" cy="240" r="60" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="6 6" />
              <text x="630" y="244" textAnchor="middle" fill="#4c1d95" fontSize="11" fontWeight="black">
                Karbon Tutulumu
              </text>

              {/* Input: CO2 */}
              <path d="M 630 5 L 630 100" stroke="#7c3aed" strokeWidth="4" strokeDasharray="4 4" />
              <rect x="565" y="10" width="130" height="32" rx="8" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="2" />
              <text x="630" y="31" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="black">
                🌫️ CO₂ (Gazı)
              </text>

              {/* Output: PGAL / Organic Food */}
              <path d="M 630 380 L 630 460" stroke="#16a34a" strokeWidth="4" strokeDasharray="4 4" />
              <rect x="525" y="440" width="210" height="36" rx="10" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5" />
              <text x="630" y="463" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="black">
                🍬 PGAL → Glikoz & Besin
              </text>

              {/* Bridges */}
              {/* ATP + NADPH from Thylakoid -> Calvin */}
              <path d="M 370 180 C 410 155, 450 155, 490 180" fill="none" stroke="#ea580c" strokeWidth="4" />
              <rect x="385" y="145" width="90" height="26" rx="6" fill="#fff7ed" stroke="#fb923c" strokeWidth="1.5" />
              <text x="430" y="162" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="black">
                ⚡ ATP
              </text>

              <path d="M 370 220 C 410 195, 450 195, 490 220" fill="none" stroke="#7c3aed" strokeWidth="4" />
              <rect x="375" y="200" width="110" height="26" rx="6" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="430" y="217" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="black">
                🧪 NADPH
              </text>

              {/* Return: ADP + NADP+ from Calvin -> Thylakoid */}
              <path d="M 490 280 C 450 305, 410 305, 370 280" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="4 4" />
              <rect x="380" y="280" width="100" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <text x="430" y="296" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
                ADP + Pi ↺
              </text>

              <path d="M 490 320 C 450 345, 410 345, 370 320" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="4 4" />
              <rect x="385" y="325" width="90" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <text x="430" y="341" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
                NADP⁺ ↺
              </text>
            </svg>
          </div>
        </div>

        {/* Right: Scientific Principles & Rubric Checklist (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              BİLİMSEL MODELİN 4 ANA SÜTUNU
            </span>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1">
                <span className="text-xs font-extrabold text-[#14532d] block">
                  1. Oksijenin (O₂) Kaynağı Sudur:
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  Fotosentezde atmosfere verilen oksijen CO₂’den değil; tilakoitte suyun fotolizinden (parçalanmasından) açığa çıkar.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1">
                <span className="text-xs font-extrabold text-[#14532d] block">
                  2. ATP ve NADPH Köprüsü:
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  Işık evresi bir enerji jeneratörüdür. Ürettiği ATP ve NADPH’yi stroma sıvısına aktararak Calvin döngüsünü besler.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1">
                <span className="text-xs font-extrabold text-[#14532d] block">
                  3. Organik Ürün PGAL’dir:
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  Calvin döngüsünden doğrudan 6 karbonlu glikoz çıkmaz; 3 karbonlu PGAL çıkar. PGAL daha sonra tüm besinlere dönüştürülür.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1">
                <span className="text-xs font-extrabold text-[#14532d] block">
                  4. Taşıyıcıların Sürekli Rejenerasyonu:
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  ADP ve NADP⁺ tekrar şarj edilmek üzere tilakoite döner. Biri durursa diğeri de durur.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#edf2ea] mt-3">
            <button
              onClick={onGoToCompare}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
            >
              <span>ŞİMDİ MODELLERİ KARŞILAŞTIR (11)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
