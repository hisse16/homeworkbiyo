import React from 'react';
import { PresentationStage, StageDefinition } from '../types';
import { Leaf, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

export const STAGES: StageDefinition[] = [
  {
    id: 'home',
    number: '01',
    shortTitle: 'Başlangıç',
    fullTitle: 'Giriş: Işıktan Maddeye Yaşam Zinciri',
    question: 'Bir bitki ışığı nasıl organik maddeye çevirir?',
    suggestedDuration: '30 sn'
  },
  {
    id: 'cell',
    number: '02',
    shortTitle: 'Hücre',
    fullTitle: 'Bitki Hücresi Anatomisi & Organeller',
    question: 'Fotosentez bitki hücresinde tam olarak nerede gerçekleşir?',
    suggestedDuration: '1 dk'
  },
  {
    id: 'chloroplast',
    number: '03',
    shortTitle: 'Kloroplast',
    fullTitle: 'Kloroplastın İki Çalışma Alanı (Stroma & Tilakoit)',
    question: 'Aynı organel fotosentezi nasıl iki ayrı alana böler?',
    suggestedDuration: '1.5 dk'
  },
  {
    id: 'light',
    number: '04',
    shortTitle: 'Işık Evresi',
    fullTitle: 'Işığa Bağlı Tepkimeler (ETS & H⁺ Gradyanı & ATP)',
    question: 'Işık enerjisi ve su nasıl ATP ve NADPH’ye dönüştürülür?',
    suggestedDuration: '3 dk'
  },
  {
    id: 'calvin',
    number: '05',
    shortTitle: 'Calvin',
    fullTitle: 'Calvin Döngüsü ve PGAL Sentezi',
    question: 'CO₂ gazı organik besine (PGAL) nasıl dönüştürülür?',
    suggestedDuration: '2.5 dk'
  },
  {
    id: 'factors',
    number: '06',
    shortTitle: 'Hız Lab',
    fullTitle: 'Hızı Etkileyen Faktörler & Minimum Kuralı',
    question: 'En düşük faktör fotosentez hızını nasıl sınırlar?',
    suggestedDuration: '1 dk'
  },
  {
    id: 'whole_system',
    number: '07',
    shortTitle: 'Tüm Sistem',
    fullTitle: 'Fotosentezin Tamamı: Büyük Entegre Devre',
    question: 'İki evre birbiriyle nasıl eş zamanlı ve kesintisiz çalışır?',
    suggestedDuration: '1.5 dk'
  },
  {
    id: 'pigments',
    number: '08',
    shortTitle: 'Pigmentler',
    fullTitle: 'Fotosentetik Pigmentler & Soğurma Spektrumu',
    question: 'Klorofil ve karotenoidler ışığın hangi dalga boylarını soğurur?',
    suggestedDuration: '1 dk'
  },
  {
    id: 'build_model',
    number: '09',
    shortTitle: 'Modelini Kur',
    fullTitle: 'Öğrencinin Kendi Fotosentez Modelini Tasarlaması',
    question: 'Girdileri, süreçleri ve çıktıları doğru eşleştirin.',
    suggestedDuration: '2 dk'
  },
  {
    id: 'scientific_model',
    number: '10',
    shortTitle: 'Bilimsel Model',
    fullTitle: 'Öğretmenin Bilimsel Referans Modeli',
    question: 'Biyoloji literatüründeki kusursuz akış şeması nedir?',
    suggestedDuration: '1.5 dk'
  },
  {
    id: 'compare',
    number: '11',
    shortTitle: 'Karşılaştır',
    fullTitle: 'Model Karşılaştırması: Eksik ve Yanlışları Bulma',
    question: 'Kendi modelimizdeki hataları kanıtlarla nasıl tespit ederiz?',
    suggestedDuration: '2 dk'
  },
  {
    id: 'revise',
    number: '12',
    shortTitle: 'Revize Et',
    fullTitle: 'Modeli Revize Etme & Öğrenci Raporu',
    question: 'Kanıtlara göre düzeltilen nihai model nedir?',
    suggestedDuration: '1.5 dk'
  },
  {
    id: 'final_presentation',
    number: '13',
    shortTitle: 'Son Sunum',
    fullTitle: 'Sunuma Hazır Son Model & Sınıfa Sor',
    question: 'Kazanımları tahtada birlikte tartışalım.',
    suggestedDuration: '2 dk'
  }
];

interface Props {
  currentStage: PresentationStage;
  onSelectStage: (stage: PresentationStage) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const NavigationHeader: React.FC<Props> = ({
  currentStage,
  onSelectStage,
  voiceEnabled,
  onToggleVoice
}) => {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
  const currentStageDef = STAGES[currentIndex] || STAGES[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStage(STAGES[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < STAGES.length - 1) {
      onSelectStage(STAGES[currentIndex + 1].id);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f7faf5]/95 backdrop-blur-md border-b border-[#e2ece0] shadow-sm select-none">
      {/* Top Bar */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-5 py-2 flex items-center justify-between gap-2.5">
        {/* Left: Brand */}
        <button
          onClick={() => onSelectStage('home')}
          className="flex items-center gap-2.5 text-left cursor-pointer group shrink-0"
          title="Giriş ekranına dön"
        >
          <div className="w-9 h-9 rounded-xl bg-[#166534] text-white flex items-center justify-center shadow-md shadow-emerald-950/10 group-hover:scale-105 transition-transform">
            <Leaf className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#143823]">
                FOTOSENTEZ
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                10. Sınıf Dersi
              </span>
            </div>
            <span className="text-[11px] text-[#52705e] font-medium hidden lg:block truncate max-w-[280px]">
              {currentStageDef.number} · {currentStageDef.fullTitle}
            </span>
          </div>
        </button>

        {/* Center: The 13 Step Tabs with smooth horizontal scroll */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none flex-1 max-w-[950px] justify-start sm:justify-center">
          {STAGES.map((s, idx) => {
            const isActive = s.id === currentStage;
            const isCompleted = idx < currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStage(s.id)}
                className={`h-9 px-2 sm:px-2.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                  isActive
                    ? 'bg-[#166534] text-white border-[#166534] shadow-md shadow-emerald-900/15 scale-[1.02]'
                    : isCompleted
                    ? 'bg-[#eaf3e7] text-[#235835] border-[#d2e4ce] hover:bg-[#e1eedd]'
                    : 'bg-white text-[#52705e] border-[#e2ebe0] hover:bg-[#f1f6ef] hover:text-[#143823]'
                }`}
                title={`${s.number} · ${s.fullTitle}`}
              >
                <span
                  className={`text-[10px] font-mono font-black ${
                    isActive ? 'text-emerald-200' : 'text-[#7e9987]'
                  }`}
                >
                  {s.number}
                </span>
                <span className="text-[11px]">{s.shortTitle}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-white border border-[#dce6da] rounded-xl p-0.5 shadow-sm">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#28573a] hover:bg-[#edf5eb] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
              title="Önceki Bölüm (Sol Ok)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="h-4 w-[1px] bg-[#e2ece0]" />
            <button
              onClick={handleNext}
              disabled={currentIndex === STAGES.length - 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#28573a] hover:bg-[#edf5eb] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
              title="Sonraki Bölüm (Sağ Ok)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onToggleVoice}
            className={`h-9 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
              voiceEnabled
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-500 border-[#dce6da] hover:bg-[#edf5eb]'
            }`}
            title={voiceEnabled ? 'Sesli anlatım açık' : 'Sesli anlatımı aç'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline">{voiceEnabled ? 'Ses Açık' : 'Ses'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl bg-white border border-[#dce6da] hover:bg-[#edf5eb] text-[#28573a] flex items-center justify-center cursor-pointer transition-colors shadow-sm"
            title="Akıllı Tahtada Tam Ekran"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1 bg-[#e4ede1]">
        <div
          className="h-full bg-[#166534] transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / STAGES.length) * 100}%` }}
        />
      </div>
    </header>
  );
};
