import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, FileText, Check, Award, BookCheck } from 'lucide-react';

interface Props {
  onGoToFinalPresentation: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

export const ReviseStage: React.FC<Props> = ({
  onGoToFinalPresentation,
  voiceEnabled,
  onSpeakText
}) => {
  const [isRevisionApplied, setIsRevisionApplied] = useState<boolean>(true);

  const handleApply = () => {
    setIsRevisionApplied(true);
    if (voiceEnabled) {
      onSpeakText('Model kanıtlara göre yeniden düzenlendi ve revize edildi.');
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>12 · MODELİNİ REVİZE ET</span>
            <span>•</span>
            <span>KANITLARA GÖRE DÜZENLEME VE RAPORLAMA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Eksikleri Düzeltilmiş <span className="text-[#166534]">Nihai Model & Revizyon Raporu</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Ödev rubriği: <i>"Modelimizi bilimsel kanıtlara göre yeniden düzenliyoruz ve yaptığımız değişiklikleri gerekçeleriyle raporluyoruz."</i>
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onGoToFinalPresentation}
          className="h-12 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer shrink-0"
        >
          <span>SUNUMA HAZIR SON MODELLİ DERS (13)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Grid: Visual Revised Model (Left) + Student Formal Revision Report (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: The Perfected Revised Student Model (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#edf2ea] mb-3">
              <span className="text-xs font-mono font-bold text-[#166534] uppercase">
                DÜZELTİLMİŞ VE DOĞRULANMIŞ MODEL ŞEMASI
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Revize Edildi (%100 Bilimsel Doğruluk)
              </span>
            </div>

            {/* Revised 9 Connectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#f0fdf4] border border-[#86efac] space-y-1">
                <span className="text-[10px] font-mono text-emerald-800 font-bold block">1. IŞIK EVRESİ GİRDİLERİ</span>
                <span className="text-xs font-extrabold text-[#14532d] block">☀️ Güneş Işığı + 💧 Su (H₂O)</span>
                <p className="text-[11px] text-[#2b4c38]">Fotonlar klorofili uyarır, su fotoliz ile e⁻ ve H⁺ sağlar.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f0fdf4] border border-[#86efac] space-y-1">
                <span className="text-[10px] font-mono text-emerald-800 font-bold block">2. ÇIKAN YAN ÜRÜN</span>
                <span className="text-xs font-extrabold text-[#14532d] block">💨 O₂ (Oksijen Gazı)</span>
                <p className="text-[11px] text-[#2b4c38]">Suyun parçalanmasıyla açığa çıkar ve atmosfere salınır.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fff7ed] border border-[#fed7aa] space-y-1">
                <span className="text-[10px] font-mono text-orange-800 font-bold block">3. STROMAYA GEÇENLER</span>
                <span className="text-xs font-extrabold text-[#c2410c] block">⚡ ATP + 🧪 NADPH</span>
                <p className="text-[11px] text-[#9a3412]">Işık enerjisini ve indirgeme gücünü Calvin döngüsüne aktarır.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f5f3ff] border border-[#ddd6fe] space-y-1">
                <span className="text-[10px] font-mono text-purple-800 font-bold block">4. CALVİN GİRDİSİ</span>
                <span className="text-xs font-extrabold text-[#5b21b6] block">🌫️ Karbondioksit (CO₂)</span>
                <p className="text-[11px] text-[#6d28d9]">Rubisko enzimi tarafından yakalanıp 5C’li RuBP’ye bağlanır.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#dcfce7] border border-[#4ade80] space-y-1 sm:col-span-2">
                <span className="text-[10px] font-mono text-emerald-900 font-bold block">5. NİHAİ TEMEL BESİN ÇIKTISI</span>
                <span className="text-sm font-extrabold text-[#14532d] block">🍬 PGAL (Fosfogliseraldehit) → Glikoz, Nişasta, Yağ, Protein</span>
                <p className="text-xs text-[#1e3b29]">3 karbonlu PGAL döngüden ayrılır; bitkinin tüm organik madde sentezini başlatır.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1] space-y-1 sm:col-span-2">
                <span className="text-[10px] font-mono text-slate-600 font-bold block">6. ŞARJ İÇİN TİLAKOİTE DÖNENLER</span>
                <span className="text-xs font-extrabold text-slate-800 block">🔄 ADP + Pi ve NADP⁺</span>
                <p className="text-[11px] text-slate-600">Calvin’de enerjisini bırakan taşıyıcılar tilakoit zarına dönerek devreyi tamamlar.</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#f8faf6] border border-[#dce6da] rounded-2xl flex items-center justify-between text-xs text-[#143823]">
            <span className="font-bold">Öğretmen Değerlendirmesi:</span>
            <span className="font-extrabold text-emerald-800 flex items-center gap-1">
              <Award className="w-4 h-4 text-emerald-600" />
              Tüm Kavram Yanılgıları Başarıyla Giderildi
            </span>
          </div>
        </div>

        {/* Right: Formal Student Revision Text Report (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#166534] uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>ÖĞRENCİ MODEL REVİZYON RAPORU</span>
            </div>

            {/* Official Report Card */}
            <div className="p-4 rounded-2xl bg-[#fafcf9] border border-[#dce6da] space-y-3 text-xs">
              <div>
                <span className="font-bold text-[#166534] block">1. İlk Modelimdeki Hatalar:</span>
                <p className="text-[#3b5747] leading-relaxed mt-0.5">
                  İlk taslağımda oksijenin (O₂) karbondioksit gazından ayrıldığını düşünmüştüm. Ayrıca Calvin döngüsünden doğrudan 6 karbonlu glikozun çıktığını varsaymıştım.
                </p>
              </div>

              <div className="pt-2 border-t border-[#edf2ea]">
                <span className="font-bold text-[#166534] block">2. İncelediğim Bilimsel Kanıtlar:</span>
                <p className="text-[#3b5747] leading-relaxed mt-0.5">
                  Öğretmenin bilimsel modelinde ve Campbell biyoloji kaynaklarında suyun fotoliz tepkimesini (<code className="bg-emerald-50 px-1 py-0.5 rounded text-emerald-900 font-mono">H₂O → 2H⁺ + 2e⁻ + ½O₂</code>) inceledim. Ağır oksijen izotopu (O-18) deneylerinin kanıtladığı gibi, havaya salınan oksijenin tek kaynağının su olduğunu gördüm.
                </p>
              </div>

              <div className="pt-2 border-t border-[#edf2ea]">
                <span className="font-bold text-[#166534] block">3. Yaptığım Düzeltmeler:</span>
                <p className="text-[#3b5747] leading-relaxed mt-0.5">
                  • O₂ çıkışını Tilakoit zarı ve suyun fotolizine bağladım.
                  <br />• Calvin döngüsünün asıl ürününü 3C’li <b>PGAL</b> olarak revize ettim.
                  <br />• ATP ve NADPH’nin stromaya, yüksüz ADP ve NADP⁺’nin tilakoite döndüğünü netleştirdim.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#edf2ea] mt-2">
            <button
              onClick={onGoToFinalPresentation}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
            >
              <span>SON MODELLİ DERSE VE SORULARA GEÇ (13)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
