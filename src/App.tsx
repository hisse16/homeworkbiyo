import React, { useState } from 'react';
import { AppTab, SimulationParams } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomeHero } from './components/HomeHero';
import { ExploreSection } from './components/ExploreSection';
import { PhotosynthesisSection } from './components/PhotosynthesisSection';
import { MainChloroplastSimulation } from './components/MainChloroplastSimulation';
import { ClassQuestions } from './components/ClassQuestions';
import { SoundControl } from './components/SoundControl';
import { Maximize2, Minimize2, Tv, Home, Compass, Sun, Sliders, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(Boolean(document.fullscreenElement));

  // Global shared simulation parameters
  const [params, setParams] = useState<SimulationParams>({
    light: 75,
    water: 70,
    co2: 70,
    speed: 'normal',
    showElectrons: true,
    showProtons: true
  });

  React.useEffect(() => { const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement)); document.addEventListener('fullscreenchange', onFs); return () => document.removeEventListener('fullscreenchange', onFs); }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="smartboard-app bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* 1. TOP HEADER & THE CLEAN 4 MAIN SMARTBOARD TABS */}
        <header className="smartboard-header bg-slate-950/95 border-b border-slate-800 px-3 sm:px-5 py-2 z-40">
          <div className="smartboard-header-inner max-w-[1600px] mx-auto flex items-center justify-between gap-3">
            {/* Title / Brand (Clickable to return Home) */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center border border-emerald-400/40 shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform">
                <Tv className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h1 className="font-black text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                  <span>FOTOSENTEZ</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                    10. Sınıf Modeli
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Akıllı Tahta Etkileşimli Biyoloji Sunumu
                </p>
              </div>
            </button>

            {/* The 4 Main Navigation Tabs + Home (>= 48px touch targets for Smartboard) */}
            <nav className="smartboard-nav flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('home')}
                className={`h-11 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'home'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Ana Sayfa"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Giriş</span>
              </button>

              <button
                onClick={() => setActiveTab('explore')}
                className={`h-11 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'explore'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>KEŞFET</span>
              </button>

              <button
                onClick={() => setActiveTab('photosynthesis')}
                className={`h-11 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'photosynthesis'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>FOTOSENTEZ</span>
              </button>

              <button
                onClick={() => setActiveTab('simulation')}
                className={`h-11 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'simulation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>SİMÜLASYON</span>
              </button>

              <button
                onClick={() => setActiveTab('questions')}
                className={`h-11 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'questions'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>SORULAR</span>
              </button>
            </nav>

            {/* Sound Control & Fullscreen for Smartboard */}
            <div className="flex items-center gap-2 shrink-0">
              <SoundControl variant="header" />

              <button
                onClick={toggleFullscreen}
                className="smartboard-action h-12 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold shrink-0"
                title="Akıllı Tahtada Tam Ekran"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden lg:inline">Tam Ekran</span>
              </button>
            </div>
          </div>
        </header>

        {/* 2. DYNAMIC MAIN STAGE */}
        <main className="presentation-main flex flex-col justify-center items-center w-full">
          {activeTab === 'home' && (
            <HomeHero
              onStartExplore={() => setActiveTab('explore')}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreSection
              onGoToPhotosynthesis={() => setActiveTab('photosynthesis')}
            />
          )}

          {activeTab === 'photosynthesis' && (
            <PhotosynthesisSection
              onGoToSimulation={() => setActiveTab('simulation')}
            />
          )}

          {activeTab === 'simulation' && (
            <MainChloroplastSimulation params={params} setParams={setParams} />
          )}

          {activeTab === 'questions' && (
            <ClassQuestions />
          )}
        </main>


      </div>
    </ErrorBoundary>
  );
};

export default App;
