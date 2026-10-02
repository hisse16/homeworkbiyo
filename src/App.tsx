import React, { useState, useEffect, useCallback } from 'react';
import { PresentationStage } from './types';
import { NavigationHeader, STAGES } from './components/NavigationHeader';
import { HomeStage } from './components/stages/HomeStage';
import { CellStage } from './components/stages/CellStage';
import { ChloroplastStage } from './components/stages/ChloroplastStage';
import { LightReactionsStage } from './components/stages/LightReactionsStage';
import { CalvinCycleStage } from './components/stages/CalvinCycleStage';
import { FactorsStage } from './components/stages/FactorsStage';
import { WholeSystemStage } from './components/stages/WholeSystemStage';
import { PigmentsStage } from './components/stages/PigmentsStage';
import { BuildModelStage } from './components/stages/BuildModelStage';
import { ScientificModelStage } from './components/stages/ScientificModelStage';
import { CompareStage } from './components/stages/CompareStage';
import { ReviseStage } from './components/stages/ReviseStage';
import { QuizStage } from './components/stages/QuizStage';
import { speechService } from './utils/speechService';
import { soundEngine } from './utils/soundEngine';

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<PresentationStage>('home');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [studentPlacements, setStudentPlacements] = useState<Record<string, string>>({
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

  // Play narration text if voiceEnabled
  const handleSpeakText = useCallback((text: string) => {
    if (!voiceEnabled) return;
    speechService.speak(text);
  }, [voiceEnabled]);

  const handleToggleVoice = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    if (!nextState) {
      speechService.stop();
    } else {
      soundEngine.play('photon');
      speechService.speak('Sesli anlatım açıldı.');
    }
  };

  // Keyboard navigation for smartboard / teacher clicker (Left Arrow: Prev, Right Arrow: Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeIdx = STAGES.findIndex((s) => s.id === currentStage);
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (activeIdx < STAGES.length - 1) {
          setCurrentStage(STAGES[activeIdx + 1].id);
          soundEngine.play('photon');
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (activeIdx > 0) {
          setCurrentStage(STAGES[activeIdx - 1].id);
          soundEngine.play('photon');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage]);

  // Stop speech when switching stages
  const handleSelectStage = (stage: PresentationStage) => {
    speechService.stop();
    soundEngine.play('photon');
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModelSaved = (placements: Record<string, string>) => {
    setStudentPlacements(placements);
    handleSelectStage('scientific_model');
  };

  const currentStageDef = STAGES.find((s) => s.id === currentStage) || STAGES[0];

  return (
    <div className="min-h-screen bg-[#f7faf5] text-[#143823] flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. TOP HEADER WITH THE 13 SMARTBOARD STAGES */}
      <NavigationHeader
        currentStage={currentStage}
        onSelectStage={handleSelectStage}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
      />

      {/* 2. MAIN ACTIVE STAGE (13 COMPLETE CLASSROOM STAGES) */}
      <main className="flex-1 flex flex-col justify-center items-center w-full px-2 sm:px-4 py-2">
        {/* 01 - Giriş / Başlangıç */}
        {currentStage === 'home' && (
          <HomeStage
            onStartCourse={() => handleSelectStage('cell')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 02 - Bitki Hücresi (Mitokondri & Sitoplazma Dahil) */}
        {currentStage === 'cell' && (
          <CellStage
            onNextStage={() => handleSelectStage('chloroplast')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 03 - Kloroplast Anatomisi (Stroma & Tilakoit Zarlar) */}
        {currentStage === 'chloroplast' && (
          <ChloroplastStage
            onGoToLightReactions={() => handleSelectStage('light')}
            onGoToCalvin={() => handleSelectStage('calvin')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 04 - Işığa Bağlı Tepkimeler (Fotoliz, ETS, Proton Gradyanı & ATP Sentaz) */}
        {currentStage === 'light' && (
          <LightReactionsStage
            onGoToCalvin={() => handleSelectStage('calvin')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 05 - Calvin Döngüsü (Stroma, CO₂, Rubisko, ATP/NADPH & PGAL) */}
        {currentStage === 'calvin' && (
          <CalvinCycleStage
            onGoToFactors={() => handleSelectStage('factors')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 06 - Hız Laboratuvarı (Işık, CO₂, Sıcaklık & Minimum Kuralı) */}
        {currentStage === 'factors' && (
          <FactorsStage
            onGoToWholeSystem={() => handleSelectStage('whole_system')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 07 - Tüm Sistem (Işık Tepkimeleri ve Calvin Döngüsünün Tam Entegre Devresi) */}
        {currentStage === 'whole_system' && (
          <WholeSystemStage
            onGoToPigments={() => handleSelectStage('pigments')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 08 - Pigmentler & Soğurma Spektrumu (Klorofil a/b, Karotenoidler, 380-750nm) */}
        {currentStage === 'pigments' && (
          <PigmentsStage
            onGoToBuildModel={() => handleSelectStage('build_model')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 09 - Modelini Kur (Öğrencinin Kendi Fotosentez Modelini Tasarlaması) */}
        {currentStage === 'build_model' && (
          <BuildModelStage
            onGoToCompare={handleModelSaved}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 10 - Bilimsel Model (Öğretmenin Bilimsel Referans Modeli) */}
        {currentStage === 'scientific_model' && (
          <ScientificModelStage
            onGoToCompare={() => handleSelectStage('compare')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 11 - Karşılaştır (Öğrenci Modeli vs Bilimsel Model - Eksik & Yanlış Analizi) */}
        {currentStage === 'compare' && (
          <CompareStage
            studentPlacements={studentPlacements}
            onGoToRevise={() => handleSelectStage('revise')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 12 - Modelini Revize Et (Kanıtlara Göre Düzeltilmiş Model & Revizyon Raporu) */}
        {currentStage === 'revise' && (
          <ReviseStage
            onGoToFinalPresentation={() => handleSelectStage('final_presentation')}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}

        {/* 13 - Sunuma Hazır Son Model & Sınıfa Sor (Pekiştirme Soruları & Şema Doldurma) */}
        {currentStage === 'final_presentation' && (
          <QuizStage
            onRestartPresentation={() => handleSelectStage('home')}
            onNavigateToStage={(stage) => handleSelectStage(stage)}
            voiceEnabled={voiceEnabled}
            onSpeakText={handleSpeakText}
          />
        )}
      </main>

      {/* 3. MINIMAL CLASSROOM SMARTBOARD FOOTER */}
      <footer className="border-t border-[#e2ece0] bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2.5 text-xs text-[#52705e] select-none">
        <div className="max-w-[1550px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#166534]">
              Bölüm {currentStageDef.number} / 13:
            </span>
            <span className="font-medium text-[#143823]">
              {currentStageDef.fullTitle}
            </span>
            <span className="text-[#86a190] hidden md:inline">
              · Önerilen Süre: {currentStageDef.suggestedDuration}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#6d8a78]">
            <span className="hidden sm:inline">
              Akıllı Tahta İpucu: Klavye veya sunum kumandasında <b>←</b> ve <b>→</b> tuşları ile bölümler arasında geçiş yapabilirsiniz.
            </span>
            <span className="font-bold text-[#166534]">10. Sınıf Biyoloji</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
