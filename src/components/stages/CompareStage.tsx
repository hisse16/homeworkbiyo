import React from 'react';
import { ArrowRight, Check, AlertTriangle, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface Props {
  studentPlacements: Record<string, string>;
  onGoToRevise: () => void;
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
  { id: 'slot_oxygen_output', name: '4. Sudan Açığa Çıkan Gaz', expectedCardId: 'oxygen', expectedCardName: '💨 Oksijen (O₂)', scientificRationale: 'Oksijen suyun fotolizinin ürünüdür; CO₂’den değil, sudan çıkar!' },
  { id: 'slot_bridge_to_calvin', name: '5. Tilakoitten Stromaya Aktarılanlar', expectedCardId: 'atp_nadph', expectedCardName: '⚡ ATP + 🧪 NADPH', scientificRationale: 'Işık enerjisi kimyasal bağ enerjisine (ATP) ve indirgeme gücüne (NADPH) dönüştürülüp Calvin’e aktarılır.' },
  { id: 'slot_co2_input', name: '6. Calvin’e Giren Karbon Gazı', expectedCardId: 'co2', expectedCardName: '🌫️ Karbondioksit (CO₂)', scientificRationale: 'Atmosferik CO₂ organik besinin karbon ve oksijen iskeletini oluşturur.' },
  { id: 'slot_stroma', name: '7. Calvin Döngüsü Reaksiyon Alanı', expectedCardId: 'stroma', expectedCardName: '🧪 Stroma Sıvısı (Calvin Döngüsü)', scientificRationale: 'Rubisko ve karbon tutulumu enzimleri stroma sıvısında serbesttir.' },
  { id: 'slot_pgal_output', name: '8. Calvin’den Çıkan Temel Ürün', expectedCardId: 'pgal', expectedCardName: '🍬 PGAL (Glikoz Öncesi)', scientificRationale: 'Fotosentez doğrudan glikoz değil, 3C’li PGAL üretir. PGAL glikoz, yağ asidi ve amino aside dönüşür.' },
  { id: 'slot_bridge_to_light', name: '9. Tilakoite Geri Dönen Taşıyıcılar', expectedCardId: 'adp_nadp', expectedCardName: '🔄 ADP + Pi ve NADP⁺', scientificRationale: 'Calvin’de harcanan ATP ve NADPH, tekrar şarj edilmek üzere yüksüz olarak tilakoite döner.' }
];

export const CompareStage: React.FC<Props> = ({
  studentPlacements,
  onGoToRevise,
  voiceEnabled,
  onSpeakText
}) => {
  // Evaluate student matches
  const evaluation = SCIENTIFIC_TRUTH.map((item) => {
    const studentChoice = studentPlacements[item.id];
    const isCorrect = studentChoice === item.expectedCardId;
    return {
      ...item,
      studentChoice,
      isCorrect
    };
  });

  const correctCount = evaluation.filter((e) => e.isCorrect).length;
  const incorrectCount = evaluation.length - correctCount;

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>11 · MODEL KARŞILAŞTIRMASI</span>
            <span>•</span>
            <span>EKSİK VE YANLIŞLARI BULMA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Öğrenci Modeli ile <span className="text-[#166534]">Bilimsel Modelin Karşılaştırılması</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Ödev rubriği: <i>"Kendi modelimizi bilimsel referans modeliyle yan yana koyarak eksik veya yanlış yönleri belirliyoruz."</i>
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onGoToRevise}
          className="h-12 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer shrink-0"
        >
          <span>EKSİKLERİ DÜZELT & REVİZE ET (12)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid: Comparison Status & Detailed Side-by-Side Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: Comparison Rows (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#edf2ea]">
            <span className="text-xs font-mono font-bold text-[#166534] uppercase">
              9 TEMEL BAĞLANTI: ÖĞRENCİ TASARIMI ↔ BİLİMSEL REFERANS
            </span>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {correctCount} Doğrulanan Bağlantı
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
                      {item.isCorrect ? item.expectedCardName : 'Eksik veya Yanlış Seçim'}
                    </span>
                    {!item.isCorrect && (
                      <span className="text-emerald-900 font-extrabold">
                        → Bilimsel Doğrusu: {item.expectedCardName}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#4d6b58] pt-0.5">
                    <b>Bilimsel Kanıt:</b> {item.scientificRationale}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  {item.isCorrect ? (
                    <span className="flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Doğru</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-extrabold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Eksik / Yanlış</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Rubric Evaluation Questions (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              RUBRİK DEĞERLENDİRME KRİTERLERİ
            </span>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#f8faf6] border border-[#dce6da] space-y-1">
                <span className="text-xs font-extrabold text-[#143823] block">
                  1. Oksijen Çıkış Noktası Doğru mu?
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  Öğrenciler sıklıkla O₂'nin CO₂'den çıktığını varsayar. Karşılaştırma ile fotoliz sonucu sudan açığa çıktığı kanıtlanır.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f8faf6] border border-[#dce6da] space-y-1">
                <span className="text-xs font-extrabold text-[#143823] block">
                  2. Enerji Akış Yönü Tutarlı mı?
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  ATP ve NADPH'nin tilakoit zarında üretilip stromaya geçtiği, ADP ve NADP⁺'nin ise tilakoite geri döndüğü kontrol edilir.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f8faf6] border border-[#dce6da] space-y-1">
                <span className="text-xs font-extrabold text-[#143823] block">
                  3. PGAL Çıkışı Net mi?
                </span>
                <p className="text-xs text-[#2b4c38] leading-relaxed">
                  Calvin döngüsünün doğrudan glikoz değil, ara organik bileşik PGAL ürettiği teyit edilir.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#edf2ea] mt-3">
            <button
              onClick={onGoToRevise}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
            >
              <span>MODELİ REVİZE ET VE DÜZELT (12)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
