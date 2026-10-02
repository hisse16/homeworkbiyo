import React, { useState } from 'react';
import { ArrowRight, Check, X, AlertTriangle, Sparkles, CheckCircle2, RotateCcw, HelpCircle } from 'lucide-react';

interface Props {
  studentPlacements: Record<string, string>;
  onGoToQuiz: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

interface ExpectedItem {
  id: string;
  name: string;
  expectedCardId: string;
  expectedCardName: string;
  scientificRationale: string;
}

const SCIENTIFIC_TRUTH: ExpectedItem[] = [
  { id: 'slot_light_input', name: '1. Işık Evresi Enerji Kaynağı', expectedCardId: 'sunlight', expectedCardName: '☀️ Güneş Işığı (Foton)', scientificRationale: 'Fotonlar klorofilin elektronlarını uyararak reaksiyonları başlatır.' },
  { id: 'slot_water_input', name: '2. Tilakoite Giren Madde', expectedCardId: 'water', expectedCardName: '💧 Su (H₂O)', scientificRationale: 'Su fotoliz ile elektron, H⁺ ve O₂ kaynağı olarak tilakoitte parçalanır.' },
  { id: 'slot_thylakoid', name: '3. Işık Evresi Reaksiyon Alanı', expectedCardId: 'thylakoid', expectedCardName: '🌿 Tilakoit Zarlar (Işık Evresi)', scientificRationale: 'Pigmentler ve ETS tilakoit zarında yer alır.' },
  { id: 'slot_oxygen_output', name: '4. Sudan Açığa Çıkan Gaz', expectedCardId: 'oxygen', expectedCardName: '💨 Oksijen (O₂)', scientificRationale: 'Oksijen atmosferin gaz dengesini sağlayan su fotolizinin yan ürünüdür.' },
  { id: 'slot_bridge_to_calvin', name: '5. Tilakoitten Stromaya Aktarılanlar', expectedCardId: 'atp_nadph', expectedCardName: '⚡ ATP + 🧪 NADPH', scientificRationale: 'Işık enerjisi kimyasal bağ enerjisine (ATP) ve indirgeme gücüne (NADPH) dönüştürülüp Calvin’e aktarılır.' },
  { id: 'slot_co2_input', name: '6. Calvin’e Giren Karbon Gazı', expectedCardId: 'co2', expectedCardName: '🌫️ Karbondioksit (CO₂)', scientificRationale: 'Atmosferik CO₂ organik besinin karbon ve oksijen iskeletini oluşturur.' },
  { id: 'slot_stroma', name: '7. Calvin Döngüsü Reaksiyon Alanı', expectedCardId: 'stroma', expectedCardName: '🧪 Stroma Sıvısı (Calvin Döngüsü)', scientificRationale: 'Rubisko ve karbon tutulumu enzimleri stroma sıvısında serbesttir.' },
  { id: 'slot_pgal_output', name: '8. Calvin’den Çıkan Temel Ürün', expectedCardId: 'pgal', expectedCardName: '🍬 PGAL (Glikoz Öncesi)', scientificRationale: 'Fotosentez doğrudan glikoz değil, 3C’li PGAL üretir. PGAL glikoz, yağ asidi ve amino aside dönüşür.' },
  { id: 'slot_bridge_to_light', name: '9. Tilakoite Geri Dönen Taşıyıcılar', expectedCardId: 'adp_nadp', expectedCardName: '🔄 ADP + Pi ve NADP⁺', scientificRationale: 'Calvin’de harcanan ATP ve NADPH, tekrar şarj edilmek üzere yüksüz olarak tilakoite döner.' }
];

export const CompareReviseStage: React.FC<Props> = ({
  studentPlacements,
  onGoToQuiz,
  voiceEnabled,
  onSpeakText
}) => {
  const [isRevised, setIsRevised] = useState<boolean>(false);

  // Evaluate student matches
  const evaluation = SCIENTIFIC_TRUTH.map((item) => {
    const studentChoice = studentPlacements[item.id];
    const isCorrect = studentChoice === item.expectedCardId;
    return {
      ...item,
      studentChoice,
      isCorrect: isRevised ? true : isCorrect
    };
  });

  const correctCount = evaluation.filter((e) => e.isCorrect).length;
  const incorrectCount = evaluation.length - correctCount;

  const handleApplyRevision = () => {
    setIsRevised(true);
    if (voiceEnabled) {
      onSpeakText('Model revize edildi. Eksik ve hatalı bağlantılar bilimsel modele uygun olarak düzeltildi.');
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>09 · MODEL KARŞILAŞTIRMA VE REVİZYON</span>
            <span>•</span>
            <span>ÖDEV RUBRİK MERKEZİ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Kendi Modelinizi <span className="text-[#166534]">Bilimsel Model ile Karşılaştırın</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Ödev rubriği: <i>"Kendi modelini öğretmenin bilimsel modeliyle karşılaştır → eksikleri ve yanlışları bul → modeli düzelt ve revize et."</i>
          </p>
        </div>

        {/* Revision Trigger Button */}
        <div className="flex items-center gap-2 shrink-0">
          {!isRevised ? (
            <button
              onClick={handleApplyRevision}
              className="h-11 px-5 rounded-xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>MODELİ BİLİMSEL OLARAK REVİZE ET</span>
            </button>
          ) : (
            <div className="h-11 px-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Model Başarıyla Revize Edildi</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Comparison Status & Detailed Side-by-Side Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: Comparison Cards & Student vs Scientific Reality (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#edf2ea]">
            <span className="text-xs font-mono font-bold text-[#166534] uppercase">
              9 TEMEL BAĞLANTI: ÖĞRENCİ TASARIMI ↔ BİLİMSEL REFERANS
            </span>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {correctCount} Doğru Bağlantı
              </span>
              {incorrectCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                  {incorrectCount} Revizyon Gereken
                </span>
              )}
            </div>
          </div>

          {/* List of 9 Comparison Rows */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {evaluation.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 transition-all ${
                  item.isCorrect
                    ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                    : 'bg-[#fff1f2] border-[#fecdd3]'
                }`}
              >
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-500">#{idx + 1}</span>
                    <span className="font-extrabold text-[#143823]">{item.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="text-slate-600">Öğrenci Seçimi:</span>
                    <span className={`font-bold ${item.isCorrect ? 'text-emerald-800' : 'text-rose-700'}`}>
                      {item.isCorrect ? item.expectedCardName : 'Eksik veya Hatalı Bağlantı'}
                    </span>
                    {!item.isCorrect && (
                      <span className="text-emerald-900 font-extrabold">
                        → Doğrusu: {item.expectedCardName}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#4d6b58] pt-0.5">
                    <b>Bilimsel Gerekçe:</b> {item.scientificRationale}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  {item.isCorrect ? (
                    <span className="flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Onaylandı</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-extrabold text-rose-700 bg-rose-100 px-2 py-1 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Düzeltilmeli</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revision Report Card (Rubric Artifact) (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              MODEL REVİZYON RAPORU
            </span>

            {/* Reflection note box */}
            <div className="p-4 rounded-2xl bg-[#f8faf6] border border-[#dce6da] space-y-2">
              <span className="text-xs font-extrabold text-[#143823] block">
                Öğrenci Öz Değerlendirmesi:
              </span>
              <p className="text-xs text-[#2b4c38] leading-relaxed">
                <i>"İlk modelimi tasarlarken O₂'nin sudan mı yoksa CO₂'den mi çıktığı konusunda kararsızdım. Bilimsel model ile karşılaştırdığımda fotoliz reaksiyonunu inceledim ve oksijenin suyun parçalanmasıyla atmosfere verildiğini doğruladım. Ayrıca Calvin döngüsünün glikozdan önce 3C'li PGAL ürettiğini revize ettim."</i>
              </p>
            </div>

            {/* Key Revision Items */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Revizyonda Düzeltilen 3 Temel İlke:
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>O₂ kaynağı CO₂ değil, kesinlikle sudur (H₂O).</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>ATP ve NADPH ışık evresinde üretilip Calvin’e taşınır.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Calvin’den doğrudan glikoz değil, PGAL ayrılır.</span>
              </div>
            </div>
          </div>

          {/* Navigation to Stage 10: Quiz & Ready to Present */}
          <div className="pt-3 border-t border-[#edf2ea] mt-3 space-y-1.5">
            <button
              onClick={onGoToQuiz}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>SUNUMA HAZIR & SINIF SORULARI (10)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Sıradaki: Revize edilmiş bilimsel modeli sınıfa sunma ve pekiştirme soruları
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
