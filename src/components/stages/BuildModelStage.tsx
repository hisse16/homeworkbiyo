import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Check, Sparkles, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface Props {
  onGoToCompare: (studentPlacements: Record<string, string>) => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

interface DraggableCard {
  id: string;
  name: string;
  category: 'energy' | 'matter' | 'organelle' | 'intermediate';
}

const AVAILABLE_CARDS: DraggableCard[] = [
  { id: 'sunlight', name: '☀️ Güneş Işığı (Foton)', category: 'energy' },
  { id: 'water', name: '💧 Su (H₂O)', category: 'matter' },
  { id: 'co2', name: '🌫️ Karbondioksit (CO₂)', category: 'matter' },
  { id: 'oxygen', name: '💨 Oksijen (O₂)', category: 'matter' },
  { id: 'pgal', name: '🍬 PGAL (Glikoz Öncesi)', category: 'matter' },
  { id: 'thylakoid', name: '🌿 Tilakoit Zarlar (Işık Evresi)', category: 'organelle' },
  { id: 'stroma', name: '🧪 Stroma Sıvısı (Calvin Döngüsü)', category: 'organelle' },
  { id: 'atp_nadph', name: '⚡ ATP + 🧪 NADPH', category: 'intermediate' },
  { id: 'adp_nadp', name: '🔄 ADP + Pi ve NADP⁺', category: 'intermediate' }
];

export const BuildModelStage: React.FC<Props> = ({
  onGoToCompare,
  voiceEnabled,
  onSpeakText
}) => {
  // Slots representing the parts of the model
  const [slots, setSlots] = useState<Record<string, string | null>>({
    slot_light_input: 'sunlight',
    slot_water_input: 'water',
    slot_thylakoid: 'thylakoid',
    slot_oxygen_output: 'oxygen',
    slot_bridge_to_calvin: 'atp_nadph',
    slot_co2_input: 'co2',
    slot_stroma: 'stroma',
    slot_pgal_output: 'pgal',
    slot_bridge_to_light: 'adp_nadp'
  });

  const [activeSelectedCard, setActiveSelectedCard] = useState<string | null>(null);

  const slotDefinitions = [
    { id: 'slot_light_input', label: '1. Işık Evresine Giren Enerji', defaultExpected: 'sunlight' },
    { id: 'slot_water_input', label: '2. Tilakoite Giren Madde', defaultExpected: 'water' },
    { id: 'slot_thylakoid', label: '3. Işık Tepkimelerinin Yeri', defaultExpected: 'thylakoid' },
    { id: 'slot_oxygen_output', label: '4. Sudan Açığa Çıkan Gaz', defaultExpected: 'oxygen' },
    { id: 'slot_bridge_to_calvin', label: '5. Tilakoitten Stromaya Aktarılanlar', defaultExpected: 'atp_nadph' },
    { id: 'slot_co2_input', label: '6. Calvin’e Giren Karbon Gazı', defaultExpected: 'co2' },
    { id: 'slot_stroma', label: '7. Calvin Döngüsünün Yeri', defaultExpected: 'stroma' },
    { id: 'slot_pgal_output', label: '8. Calvin’den Çıkan Organik Ürün', defaultExpected: 'pgal' },
    { id: 'slot_bridge_to_light', label: '9. Yenilenmek Üzere Geri Dönenler', defaultExpected: 'adp_nadp' }
  ];

  const handleSlotClick = (slotId: string) => {
    if (activeSelectedCard) {
      setSlots((prev) => ({ ...prev, [slotId]: activeSelectedCard }));
      setActiveSelectedCard(null);
    } else if (slots[slotId]) {
      // Remove card from slot
      setSlots((prev) => ({ ...prev, [slotId]: null }));
    }
  };

  const handleResetSlots = () => {
    const empty: Record<string, string | null> = {};
    slotDefinitions.forEach((s) => (empty[s.id] = null));
    setSlots(empty);
  };

  const handleAutoFillDefault = () => {
    const full: Record<string, string | null> = {};
    slotDefinitions.forEach((s) => (full[s.id] = s.defaultExpected));
    setSlots(full);
  };

  const handleProceed = () => {
    const sanitized: Record<string, string> = {};
    Object.entries(slots).forEach(([k, v]) => {
      if (v) sanitized[k] = v;
    });
    onGoToCompare(sanitized);
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>09 · ÖDEV BÖLÜMÜ: MODELİNİ KUR</span>
            <span>•</span>
            <span>ÖĞRENCİ TASARIMI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Kendi Fotosentez <span className="text-[#166534]">Modelinizi Oluşturun</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Aşağıdaki kartları modelin doğru yuvalarına yerleştirin. Hazırladığınız öğrenci modelini bir sonraki aşamada <b>öğretmenin bilimsel modeliyle yan yana karşılaştırıp revize edeceğiz.</b>
          </p>
        </div>

        {/* Quick Helper Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAutoFillDefault}
            className="h-11 px-3.5 rounded-xl bg-[#edf6eb] hover:bg-[#e1eedd] text-[#166534] font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-[#c8dec4]"
            title="Örnek taslağı otomatik yerleştir"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Örnek Taslağı Doldur</span>
          </button>

          <button
            onClick={handleResetSlots}
            className="h-11 px-3 rounded-xl bg-white hover:bg-[#edf5eb] border border-[#dce6da] text-[#3c5e48] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            title="Tüm yuvaları temizle"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Card Pool (Top/Left) + Interactive Model Diagram Canvas (Center) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: Card Inventory (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              KART HAVUZU (BİR KARTA DOKUN, ARDINDAN YUVAYA TIKLA)
            </span>

            <div className="space-y-2">
              {AVAILABLE_CARDS.map((card) => {
                const isSelected = activeSelectedCard === card.id;
                return (
                  <button
                    key={card.id}
                    onClick={() => setActiveSelectedCard(isSelected ? null : card.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#166534] text-white border-[#166534] shadow-md scale-[1.02]'
                        : 'bg-[#f7faf5] text-[#1e3b29] border-[#dce6da] hover:bg-[#edf5eb]'
                    }`}
                  >
                    <span>{card.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-[#e2ece0] text-slate-700'
                    }`}>
                      {card.category === 'energy' ? 'Enerji' : card.category === 'organelle' ? 'Ortam' : card.category === 'intermediate' ? 'Taşıyıcı' : 'Madde'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl text-xs text-[#14532d] space-y-1">
            <span className="font-extrabold block">Rubrik Kılavuzu:</span>
            <p className="leading-relaxed">
              Modelinizi kurarken hangi maddenin hangi tepkimeye girdiğine ve ATP/NADPH’nin hangi yöne aktığına dikkat edin.
            </p>
          </div>
        </div>

        {/* Right: The Student Interactive Model Board (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#edf2ea] mb-3">
              <span className="text-xs font-mono font-bold text-[#166534] uppercase">
                ÖĞRENCİ MODEL ÇALIŞMA TAHTASI
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Yuvalara dokunarak kartları yerleştirin veya kaldırın
              </span>
            </div>

            {/* Model Schematic Representation with Slot Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side: Thylakoid System Slots */}
              <div className="p-4 rounded-2xl bg-[#f0fdf4] border-2 border-dashed border-[#86efac] space-y-3">
                <span className="text-xs font-extrabold text-[#14532d] uppercase block">
                  1. BÖLÜM: IŞIK EVRESİ SİSTEMİ
                </span>

                {slotDefinitions.slice(0, 4).map((s) => {
                  const currentCardId = slots[s.id];
                  const currentCard = AVAILABLE_CARDS.find((c) => c.id === currentCardId);
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSlotClick(s.id)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        currentCard
                          ? 'bg-white border-[#166534] shadow-sm'
                          : 'bg-[#f7faf5] border-dashed border-[#cbd5e1] hover:border-[#166534]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-500 block">{s.label}</span>
                      {currentCard ? (
                        <span className="text-xs font-extrabold text-[#143823] block mt-0.5">
                          {currentCard.name}
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400 italic block mt-0.5">
                          [ ? Kart Seçip Dokunun ]
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Side: Stroma & Calvin Slots */}
              <div className="p-4 rounded-2xl bg-[#f5f3ff] border-2 border-dashed border-[#ddd6fe] space-y-3">
                <span className="text-xs font-extrabold text-[#5b21b6] uppercase block">
                  2. BÖLÜM: STROMA & CALVİN SİSTEMİ
                </span>

                {slotDefinitions.slice(4).map((s) => {
                  const currentCardId = slots[s.id];
                  const currentCard = AVAILABLE_CARDS.find((c) => c.id === currentCardId);
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSlotClick(s.id)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        currentCard
                          ? 'bg-white border-[#7c3aed] shadow-sm'
                          : 'bg-[#f8fafc] border-dashed border-[#cbd5e1] hover:border-[#7c3aed]'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-500 block">{s.label}</span>
                      {currentCard ? (
                        <span className="text-xs font-extrabold text-[#4c1d95] block mt-0.5">
                          {currentCard.name}
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-400 italic block mt-0.5">
                          [ ? Kart Seçip Dokunun ]
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation to Stage 09: Compare & Revise */}
          <div className="pt-3 border-t border-[#edf2ea] mt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#52705e]">
              Yerleştirilen: <b>{Object.values(slots).filter(Boolean).length} / 9 Yuva</b>
            </span>

            <button
              onClick={handleProceed}
              className="w-full sm:w-auto h-12 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 cursor-pointer"
            >
              <span>ÖĞRETMENİN BİLİMSEL MODELİNİ İNCELE (10)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
