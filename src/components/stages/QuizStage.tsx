import React, { useState } from 'react';
import { Check, X, HelpCircle, ArrowRight, RotateCcw, Sparkles, Eye, CheckCircle2, ChevronRight, ChevronLeft, Compass } from 'lucide-react';
import { QuizQuestion, PresentationStage } from '../../types';

interface Props {
  onRestartPresentation: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
  onNavigateToStage?: (stage: PresentationStage) => void;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Fotosentezin ışığa bağlı tepkimeleri kloroplastın hangi özel bölgesinde gerçekleşir?',
    options: [
      { key: 'A', text: 'Stroma jel sıvısında' },
      { key: 'B', text: 'Tilakoit zar sistemi ve lümende' },
      { key: 'C', text: 'Hücre sitoplazmasında' },
      { key: 'D', text: 'Kloroplastın dış zarında' }
    ],
    correctKey: 'B',
    explanation: 'Klorofil pigmentleri, elektron taşıma sistemi (ETS) ve ATP sentaz enzimleri tilakoit zarına gömülüdür. Bu yüzden ışık tepkimeleri tilakoitlerde gerçekleşir.',
    teacherNote: 'Öğrencilere stroma ile tilakoit arasındaki ayrımı hatırlatın.',
    modelTargetStage: 'light',
    modelTargetLabel: '04 · Işık Tepkimeleri ve Tilakoit Zarı'
  },
  {
    id: 2,
    question: 'Fotosentez sırasında açığa çıkarak atmosfere salınan oksijenin (O₂) asıl kaynağı nedir?',
    options: [
      { key: 'A', text: 'Karbondioksit (CO₂) gazı' },
      { key: 'B', text: 'Glikozun parçalanması' },
      { key: 'C', text: 'Suyun (H₂O) fotolizi' },
      { key: 'D', text: 'Havadaki azot gazı' }
    ],
    correctKey: 'C',
    explanation: 'Işık evresinde klorofilin kaybettiği elektronları tamamlamak için su (H₂O) parçalanır (fotoliz). Açığa çıkan O₂ atmosfere verilir. CO₂’deki oksijen ise şekerin yapısına katılır.',
    teacherNote: 'En sık yapılan hata CO₂ zannedilmesidir; su olduğunu vurgulayın.',
    modelTargetStage: 'light',
    modelTargetLabel: '04 · Fotoliz ve O₂ Salınımı'
  },
  {
    id: 3,
    question: 'Işığa bağlı tepkimelerde üretilip Calvin döngüsüne aktarılan iki hayati molekül hangisidir?',
    options: [
      { key: 'A', text: 'ATP ve NADPH' },
      { key: 'B', text: 'Glikoz ve Oksijen' },
      { key: 'C', text: 'ADP ve NADP⁺' },
      { key: 'D', text: 'Karbondioksit ve Su' }
    ],
    correctKey: 'A',
    explanation: 'Işık reaksiyonları enerjiyi ATP olarak depolar ve elektron/hidrojenleri NADPH ile taşır. Bu iki molekül stromaya geçerek CO₂’nin organik maddeye dönüşmesini sağlar.',
    teacherNote: 'Bu soru iki evre arasındaki köprüyü pekiştirir.',
    modelTargetStage: 'whole_system',
    modelTargetLabel: '07 · Tüm Sistem (ATP & NADPH Aktarımı)'
  },
  {
    id: 4,
    question: 'Calvin döngüsü doğrudan ışığa ihtiyaç duymadığı halde neden karanlıkta tek başına devam edemez?',
    options: [
      { key: 'A', text: 'Çünkü kloroplast karanlıkta parçalanır' },
      { key: 'B', text: 'Çünkü ihtiyaç duyduğu ATP ve NADPH ancak ışıklı evrede üretilebilir' },
      { key: 'C', text: 'Çünkü karanlıkta karbondioksit havada bulunmaz' },
      { key: 'D', text: 'Çünkü su karanlıkta buharlaşamaz' }
    ],
    correctKey: 'B',
    explanation: 'Işık kesildiğinde ışık evresi durur ve ATP ile NADPH hızla tükenir. Enerji kaynağı kalmadığı için Calvin döngüsü de durur. Ayrıca kilit enzim Rubisko ışıkla uyarılır.',
    teacherNote: '“Işıktan bağımsız” ifadesinin “karanlıkta gerçekleşir” anlamına gelmediğini belirtin.',
    modelTargetStage: 'calvin',
    modelTargetLabel: '05 · Calvin Döngüsü (ATP ve NADPH Tüketimi)'
  }
];

export const QuizStage: React.FC<Props> = ({
  onRestartPresentation,
  voiceEnabled,
  onSpeakText,
  onNavigateToStage
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'board_challenge'>('questions');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Fill in the blanks diagram revealed status for Board Challenge
  const [revealedBlanks, setRevealedBlanks] = useState<Record<string, boolean>>({
    light: false,
    water: false,
    thylakoid: false,
    oxygen: false,
    energyBridge: false,
    calvin: false,
    co2: false,
    glucose: false
  });

  const curQ = QUESTIONS[currentQIndex];

  const handleSelectOption = (key: string) => {
    setSelectedAnswer(key);
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    if (voiceEnabled) {
      onSpeakText(`Doğru cevap ${curQ.correctKey}. ${curQ.explanation}`);
    }
  };

  const handleNextQ = () => {
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handlePrevQ = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const toggleBlank = (id: string) => {
    setRevealedBlanks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAllBlanks = () => {
    const allTrue = Object.keys(revealedBlanks).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setRevealedBlanks(allTrue);
  };

  const resetAllBlanks = () => {
    const allFalse = Object.keys(revealedBlanks).reduce((acc, k) => ({ ...acc, [k]: false }), {});
    setRevealedBlanks(allFalse);
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-3 px-2 sm:px-6 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>10 · SUNUMA HAZIRLIK VE DEĞERLENDİRME</span>
            <span>•</span>
            <span>ÖĞRENMEYİ PEKİŞTİRME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Sınıf Tartışması & <span className="text-[#166534]">Şimdi Siz Anlatın</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Öğrendiklerimizi test edelim: İster 4 temel soruyu sınıfa yöneltin, ister boşluklu şema üzerinde öğrencilerin süreci baştan sona tahtada anlatmasını isteyin.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#f7faf5] border border-[#dce6da] p-1.5 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('questions')}
            className={`h-11 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-[#166534] text-white shadow-md'
                : 'text-slate-600 hover:bg-[#edf5eb]'
            }`}
          >
            1. Sınıf Soruları ({currentQIndex + 1}/{QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('board_challenge')}
            className={`h-11 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'board_challenge'
                ? 'bg-[#166534] text-white shadow-md'
                : 'text-slate-600 hover:bg-[#edf5eb]'
            }`}
          >
            2. Şimdi Siz Anlatın (Şema)
          </button>
        </div>
      </div>

      {/* MODE 1: Interactive Classroom Questions */}
      {activeTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[520px]">
          {/* Left: Question Box & Multi-choice Options (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-7 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              {/* Question Header & Counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#166534] uppercase tracking-wider">
                  SORU {curQ.id} / {QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Akıllı Tahta Çoktan Seçmeli
                </span>
              </div>

              {/* The Big Question Text */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#143823] tracking-tight leading-snug">
                {curQ.question}
              </h2>

              {/* 4 Large Touch Choice Buttons */}
              <div className="space-y-2.5 pt-2">
                {curQ.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.key;
                  const isCorrect = opt.key === curQ.correctKey;
                  let btnStyle = 'bg-[#f7faf5] text-[#1e3b29] border-[#dce6da] hover:bg-[#edf5eb]';

                  if (showAnswer) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-100 text-emerald-950 border-emerald-500 font-extrabold shadow-sm';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-100 text-rose-950 border-rose-400 font-bold';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-[#e3eee0] text-[#143823] border-[#166534] font-extrabold shadow-sm';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`w-full min-h-[54px] p-3.5 sm:px-5 rounded-2xl border text-left flex items-center justify-between text-sm sm:text-base transition-all cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl font-mono font-black text-sm flex items-center justify-center shrink-0 ${
                            showAnswer && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isSelected
                              ? 'bg-[#166534] text-white'
                              : 'bg-white text-[#166534] border border-[#dce6da]'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {showAnswer && isCorrect && (
                        <Check className="w-6 h-6 text-emerald-600 shrink-0" />
                      )}
                      {showAnswer && isSelected && !isCorrect && (
                        <X className="w-6 h-6 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls: Reveal Answer & Pagination */}
            <div className="pt-5 border-t border-[#edf2ea] mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevQ}
                  disabled={currentQIndex === 0}
                  className="h-11 px-4 rounded-xl border border-[#dce6da] text-[#28573a] hover:bg-[#edf5eb] disabled:opacity-30 disabled:hover:bg-transparent font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Önceki</span>
                </button>
                <button
                  onClick={handleNextQ}
                  disabled={currentQIndex === QUESTIONS.length - 1}
                  className="h-11 px-4 rounded-xl border border-[#dce6da] text-[#28573a] hover:bg-[#edf5eb] disabled:opacity-30 disabled:hover:bg-transparent font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Sonraki Soru</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {!showAnswer ? (
                <button
                  onClick={handleRevealAnswer}
                  className="h-12 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
                >
                  <Eye className="w-5 h-5" />
                  <span>CEVABI VE AÇIKLAMAYI GÖSTER</span>
                </button>
              ) : (
                <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cevap Açıklandı
                </span>
              )}
            </div>
          </div>

          {/* Right: Explanation & Teacher Note Card (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
                BİLİMSEL AÇIKLAMA VE KAZANIM
              </span>

              {showAnswer ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1.5">
                    <div className="flex items-center gap-2 font-extrabold text-emerald-900 text-sm">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Doğru Yanıt: Seçenek {curQ.correctKey}</span>
                    </div>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {curQ.explanation}
                    </p>
                  </div>

                  {curQ.teacherNote && (
                    <div className="p-3.5 rounded-xl bg-[#fffbeb] border border-[#fde68a] text-xs text-amber-900 space-y-1">
                      <span className="font-extrabold block">Öğretmen İpucu:</span>
                      <p className="leading-relaxed">{curQ.teacherNote}</p>
                    </div>
                  )}

                  {curQ.modelTargetStage && onNavigateToStage && (
                    <button
                      onClick={() => onNavigateToStage(curQ.modelTargetStage!)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Canlı Modelde Göster ({curQ.modelTargetLabel})</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f8faf6] border border-[#e2ede0] text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#166534] flex items-center justify-center mx-auto">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#143823]">
                    Cevabı Göstermeden Önce
                  </h3>
                  <p className="text-xs text-[#52705e] leading-relaxed">
                    Soruyu sınıfa yöneltin. Birkaç öğrencinin argümanlarını dinleyin, tahtada oylama yapın; ardından “Cevabı Göster” butonuna basarak doğru gerekçeyi açın.
                  </p>
                </div>
              )}
            </div>

            {/* Restart presentation button */}
            <div className="pt-4 border-t border-[#edf2ea] mt-4">
              <button
                onClick={onRestartPresentation}
                className="w-full h-12 px-4 rounded-xl bg-[#f7faf5] hover:bg-[#edf5eb] border border-[#dce6da] text-[#28573a] font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>SUNUMUN BAŞINA DÖN (01)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: "Şimdi Siz Anlatın" Diagram Challenge */}
      {activeTab === 'board_challenge' && (
        <div className="bg-white border border-[#dce6da] rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#edf2ea] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#166534] uppercase tracking-wider block">
                TAHTADA BİRLİKTE ANLATMA OYUNU
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#143823] tracking-tight">
                Şimdi Sıra Sizde: <span className="text-[#166534]">Boşlukları Tamamlayın</span>
              </h2>
              <p className="text-xs text-[#4e6b5a] mt-0.5">
                Öğrencilere kutuları sorun, sınıftan gelen cevaptan sonra kutunun üzerine dokunarak doğru cevabı ortaya çıkarın.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={revealAllBlanks}
                className="h-10 px-3.5 rounded-xl bg-[#166534] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Tümünü Aç</span>
              </button>
              <button
                onClick={resetAllBlanks}
                className="h-10 px-3.5 rounded-xl bg-[#f7faf5] hover:bg-[#edf5eb] border border-[#dce6da] text-[#3c5e48] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Kapat</span>
              </button>
            </div>
          </div>

          {/* Interactive Flow Chart with Clickable Hidden Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Box 1: Inputs */}
            <div className="p-4 rounded-2xl bg-[#fefce8] border border-[#fef08a] space-y-3">
              <span className="text-[11px] font-mono font-extrabold text-amber-900 uppercase">
                1. GİRENLER (SOL TARAF)
              </span>

              <div
                onClick={() => toggleBlank('light')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-amber-400 transition-all text-center"
              >
                {revealedBlanks.light ? (
                  <span className="text-sm font-extrabold text-amber-800">
                    ☀️ GÜNEŞ IŞIĞI (Foton)
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? 1. Giren Enerji ]
                  </span>
                )}
              </div>

              <div
                onClick={() => toggleBlank('water')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-sky-400 transition-all text-center"
              >
                {revealedBlanks.water ? (
                  <span className="text-sm font-extrabold text-sky-800">
                    💧 SU (H₂O) — Elektron Kaynağı
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? 2. Giren Madde ]
                  </span>
                )}
              </div>
            </div>

            {/* Box 2: Middle Reactions & Intermediates */}
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-3">
              <span className="text-[11px] font-mono font-extrabold text-[#166534] uppercase">
                2. TEPKİME MERKEZLERİ & TAŞIYICILAR
              </span>

              <div
                onClick={() => toggleBlank('thylakoid')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-emerald-400 transition-all text-center"
              >
                {revealedBlanks.thylakoid ? (
                  <span className="text-sm font-extrabold text-emerald-800">
                    🌿 TİLAKOİT ZARI & ETS (Işık Evresi)
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? Işığın Soğurulduğu Yer ]
                  </span>
                )}
              </div>

              <div
                onClick={() => toggleBlank('energyBridge')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-orange-400 transition-all text-center"
              >
                {revealedBlanks.energyBridge ? (
                  <span className="text-sm font-extrabold text-orange-800">
                    ⚡ ATP & 🧪 NADPH (Stromaya Aktarılır)
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? İki Evre Arasındaki Bağlantı ]
                  </span>
                )}
              </div>

              <div
                onClick={() => toggleBlank('oxygen')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-sky-400 transition-all text-center"
              >
                {revealedBlanks.oxygen ? (
                  <span className="text-sm font-extrabold text-sky-800">
                    💨 O₂ (OKSİJEN) — Havaya Salınır
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? Suyun Parçalanmasıyla Çıkan Gaz ]
                  </span>
                )}
              </div>
            </div>

            {/* Box 3: Calvin & Products */}
            <div className="p-4 rounded-2xl bg-[#f5f3ff] border border-[#ddd6fe] space-y-3">
              <span className="text-[11px] font-mono font-extrabold text-purple-900 uppercase">
                3. CALVİN DÖNGÜSÜ & BESİN
              </span>

              <div
                onClick={() => toggleBlank('co2')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-purple-400 transition-all text-center"
              >
                {revealedBlanks.co2 ? (
                  <span className="text-sm font-extrabold text-purple-800">
                    🌫️ CO₂ (Karbondioksit Gazı)
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? Karbon Kaynağı Olarak Giren ]
                  </span>
                )}
              </div>

              <div
                onClick={() => toggleBlank('calvin')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-purple-400 transition-all text-center"
              >
                {revealedBlanks.calvin ? (
                  <span className="text-sm font-extrabold text-purple-800">
                    ♻️ STROMA (Calvin Döngüsü)
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? Karbonun Şekere Döndüğü Alan ]
                  </span>
                )}
              </div>

              <div
                onClick={() => toggleBlank('glucose')}
                className="p-3.5 rounded-xl border bg-white cursor-pointer hover:border-emerald-400 transition-all text-center"
              >
                {revealedBlanks.glucose ? (
                  <span className="text-sm font-extrabold text-emerald-800">
                    🍬 PGAL (G3P) → GLİKOZ & BESİN
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [ ? Nihai Organik Ürün ]
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#edf2ea] flex justify-end">
            <button
              onClick={onRestartPresentation}
              className="h-12 px-6 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
            >
              <span>TEBRİKLER · SUNUMUN BAŞINA DÖN</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
