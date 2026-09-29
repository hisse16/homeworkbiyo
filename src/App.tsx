import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Atom, Check, ChevronDown, ChevronUp, Droplets,
  Leaf, Maximize2, Minimize2, Pause, Play, RotateCcw, Sparkles, Sun,
  Volume2, VolumeX, Wind, X, Zap
} from 'lucide-react';

type Screen = 'model' | 'light' | 'calvin' | 'present';

const chapters = [
  { id: 'model' as Screen, no: '01', title: 'Bütün Model' },
  { id: 'light' as Screen, no: '02', title: 'Işığa Bağlı' },
  { id: 'calvin' as Screen, no: '03', title: 'Calvin Döngüsü' },
  { id: 'present' as Screen, no: '04', title: 'Sunum' },
];

const narration: Record<Screen, string> = {
  model: 'Fotosentez iki ana bölümde incelenir. Işığa bağlı tepkimelerde pigmentler ışığı soğurur; suyun parçalanması, elektronların taşınması ve ATP ile NADPH oluşumu gerçekleşir. Calvin döngüsünde ise karbondioksit, ATP ve NADPH kullanılarak organik madde sentezlenir.',
  light: 'Işığa bağlı tepkimelerde pigmentler ışığı soğurur. Suyun parçalanmasıyla elektronlar sisteme katılır ve oksijen açığa çıkar. Elektron taşıma sistemi boyunca elektronların taşınması proton gradyanının oluşmasına katkı sağlar. ATP sentaz ile ATP, elektronların son aşamada NADP artıya aktarılmasıyla NADPH oluşur.',
  calvin: 'Calvin döngüsünde ışık doğrudan kullanılmaz. Karbondioksit döngüye katılır; ışığa bağlı tepkimelerde oluşan ATP ve NADPH kullanılır. Karbon, organik madde sentezine giden ürünlere dönüştürülür. Döngünün bir kısmı başlangıç maddelerinin yenilenmesini sağlar.',
  present: 'Bu model fotosentezin işleyişini madde ve enerji akışı üzerinden açıklar: ışık ve su ışığa bağlı tepkimelere, ATP ve NADPH ise Calvin döngüsüne bağlanır. Karbondioksit Calvin döngüsünde kullanılır; oksijen dışarı verilir ve organik madde sentezlenir.',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('model');
  const [sound, setSound] = useState(true);
  const [full, setFull] = useState(Boolean(document.fullscreenElement));
  const [lightStep, setLightStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState(false);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  useEffect(() => {
    if (!playing || screen !== 'light') return;
    const timer = window.setInterval(() => {
      setLightStep(s => (s + 1) % 5);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [playing, screen]);

  useEffect(() => {
    if (playing && screen !== 'light') setPlaying(false);
  }, [screen, playing]);

  const speak = (text: string) => {
    if (!sound || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'tr-TR';
    u.rate = 0.86;
    u.pitch = 1.02;
    window.speechSynthesis.speak(u);
  };

  const toggleSound = () => {
    setSound(s => {
      const next = !s;
      if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
      return next;
    });
  };

  const toggleFull = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen().catch(() => {});
    else await document.exitFullscreen().catch(() => {});
  };

  const go = (next: Screen) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setScreen(next);
  };

  const current = chapters.findIndex(c => c.id === screen);

  return (
    <div className="classroom-app">
      <header className="classroom-header">
        <button className="classroom-brand" onClick={() => go('model')} aria-label="Ana model">
          <span className="brand-leaf"><Leaf /></span>
          <span><b>FOTOSENTEZ</b><small>10. SINIF · BİLİMSEL MODEL</small></span>
        </button>
        <nav className="chapter-nav">
          {chapters.map((c, i) => (
            <button key={c.id} className={screen === c.id ? 'selected' : ''} onClick={() => go(c.id)}>
              <small>{c.no}</small><span>{c.title}</span>
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="round-action" onClick={toggleSound} title={sound ? 'Sesi kapat' : 'Sesi aç'}>
            {sound ? <Volume2 /> : <VolumeX />}
          </button>
          <button className="round-action" onClick={toggleFull} title="Tam ekran">
            {full ? <Minimize2 /> : <Maximize2 />}
          </button>
        </div>
      </header>

      <main className="classroom-main">
        {screen === 'model' && <ModelScreen onNext={() => go('light')} speak={speak} />}
        {screen === 'light' && (
          <LightScreen step={lightStep} setStep={setLightStep} playing={playing}
            setPlaying={setPlaying} onNext={() => go('calvin')} speak={speak} />
        )}
        {screen === 'calvin' && <CalvinScreen onNext={() => go('present')} speak={speak} />}
        {screen === 'present' && (
          <PresentationScreen index={Math.max(0, current)} notes={teacherNotes}
            setNotes={setTeacherNotes} sound={sound} speak={speak} />
        )}
      </main>

      {screen !== 'present' && (
        <footer className="classroom-footer">
          <button onClick={() => go(current <= 0 ? 'model' : chapters[current - 1].id)} disabled={current <= 0}>
            <ArrowLeft /> GERİ
          </button>
          <div><span className="live-dot" /> TAHTA SUNUMU · BİY.10.1.2</div>
          <button className="footer-speak" onClick={() => speak(narration[screen])} disabled={!sound}>
            <Volume2 /> ANLAT
          </button>
        </footer>
      )}
    </div>
  );
}

function Heading({ no, title, text, onSpeak }: { no: string; title: React.ReactNode; text: string; onSpeak: () => void }) {
  return (
    <div className="lesson-heading">
      <div><span>{no}</span><h1>{title}</h1><p>{text}</p></div>
      <button className="narrate" onClick={onSpeak}><Volume2 /> ANLAT</button>
    </div>
  );
}

function ModelScreen({ onNext, speak }: { onNext: () => void; speak: (x: string) => void }) {
  return (
    <section className="lesson-screen">
      <Heading no="01 · BÜTÜN MODEL" title={<>Fotosentezin <em>tamamını</em> tek bakışta gör.</>}
        text="Modeli madde ve enerji akışı olarak oku. Soldan girenler, ortadaki iki süreç ve sağdaki ürünler birbirine bağlıdır."
        onSpeak={() => speak(narration.model)} />
      <div className="model-stage">
        <div className="input-stack">
          <FlowCard icon={<Sun />} title="IŞIK" text="Enerji kaynağı" accent />
          <FlowCard icon={<Droplets />} title="H₂O" text="Elektron kaynağı" />
          <FlowCard icon={<Wind />} title="CO₂" text="Karbon kaynağı" />
        </div>
        <div className="main-model">
          <div className="model-label">KLOROPLAST · BİLİMSEL MODEL</div>
          <div className="phase-card light">
            <div className="phase-title"><Sun /><div><b>IŞIĞA BAĞLI TEPKİMELER</b><small>TİLAKOİT ZARI</small></div></div>
            <div className="mini-flow">
              <span>Pigment</span><i>→</i><span>ETS</span><i>→</i><strong>ATP</strong><strong>NADPH</strong>
            </div>
            <div className="phase-foot">H₂O <i>→</i> O₂ + e⁻</div>
          </div>
          <div className="transfer-line"><span>ATP + NADPH</span><ArrowRight /></div>
          <div className="phase-card calvin">
            <div className="phase-title"><Leaf /><div><b>CALVIN DÖNGÜSÜ</b><small>STROMA</small></div></div>
            <div className="calvin-equation"><span>CO₂</span><i>+</i><span>ATP</span><i>+</i><span>NADPH</span><i>→</i><strong>ORGANİK MADDE</strong></div>
            <div className="cycle-small"><span>karbonun işlenmesi</span><span>başlangıç maddeleri yenilenir</span></div>
          </div>
        </div>
        <div className="output-stack">
          <FlowCard title="O₂" text="ortama bırakılır" />
          <FlowCard title="ORGANİK MADDE" text="sentezlenir" green />
        </div>
      </div>
      <div className="lesson-bottom">
        <span><Atom /> <b>OKUMA KURALI:</b> “Ne giriyor → ne oluyor → ne çıkıyor?”</span>
        <button onClick={onNext}>SÜRECİ ÇALIŞTIR <ArrowRight /></button>
      </div>
    </section>
  );
}

function FlowCard({ icon, title, text, accent, green }: { icon?: React.ReactNode; title: string; text: string; accent?: boolean; green?: boolean }) {
  return <div className={'flow-card ' + (accent ? 'accent ' : '') + (green ? 'green' : '')}>
    {icon && <span className="flow-icon">{icon}</span>}<b>{title}</b><small>{text}</small>
  </div>;
}

const lightStages = [
  { title: 'Pigment ışığı soğurur', detail: 'Işık enerjisi pigmentler tarafından soğurulur.', event: 'FOTON', color: 'gold' },
  { title: 'Su parçalanır', detail: 'Suyun parçalanmasıyla elektronlar sürece katılır; O₂ açığa çıkar.', event: 'H₂O → O₂ + e⁻', color: 'water' },
  { title: 'Elektronlar ETS boyunca taşınır', detail: 'Elektronların taşınması proton gradyanının oluşmasına katkı sağlar.', event: 'e⁻  →  →  →', color: 'electron' },
  { title: 'ATP ve NADPH oluşur', detail: 'ATP ve NADPH, Calvin döngüsünde kullanılmak üzere oluşan enerji taşıyıcılarıdır.', event: 'ATP + NADPH', color: 'energy' },
  { title: 'Enerji Calvin döngüsüne aktarılır', detail: 'ATP ve NADPH ışığa bağlı tepkimelerden Calvin döngüsüne bağlanır.', event: '→ CALVİN', color: 'energy' },
];

function LightScreen({ step, setStep, playing, setPlaying, onNext, speak }: {
  step: number; setStep: (n: number) => void; playing: boolean; setPlaying: (b: boolean) => void;
  onNext: () => void; speak: (x: string) => void;
}) {
  const s = lightStages[step];
  return (
    <section className="lesson-screen">
      <Heading no="02 · IŞIĞA BAĞLI TEPKİMELER" title={<>Enerjinin <em>yolculuğunu</em> izle.</>}
        text="Aşağıdaki model gerçek zamanlı olarak molekül ve enerji akışını canlandırır. Tahtada adım adım ilerletebilir veya otomatik çalıştırabilirsin."
        onSpeak={() => speak(narration.light)} />
      <div className="cinema">
        <div className="cinema-left">
          <div className="sun-orb"><Sun /><span>FOTON</span></div>
          <div className="water-source"><Droplets /><b>H₂O</b><small>su</small></div>
        </div>
        <div className="chloroplast-cinema">
          <div className="cinema-caption">TİLAKOİT ZARI · IŞIĞA BAĞLI TEPKİMELER</div>
          <div className="membrane">
            {[0,1,2].map(i => <div className="membrane-line" key={i} />)}
            <div className={'protein pigment ' + (step >= 0 ? 'active' : '')}><span>PIGMENT</span></div>
            <div className={'protein water-split ' + (step >= 1 ? 'active' : '')}><span>H₂O</span></div>
            <div className={'protein ets ' + (step >= 2 ? 'active' : '')}><span>ETS</span></div>
            <div className={'protein atp ' + (step >= 3 ? 'active' : '')}><span>ATP<br/>SENTAZ</span></div>
            <div className="electron-path">
              {[0,1,2,3,4,5,6].map(i => <i key={i} className={step >= 2 ? 'moving' : ''}>e⁻</i>)}
            </div>
            <div className="proton-cloud">{[0,1,2,3,4,5,6,7].map(i => <i key={i} className={step >= 2 ? 'proton' : ''}>H⁺</i>)}</div>
          </div>
          <div className="products-flow">
            <span className={step >= 1 ? 'visible water-product' : ''}>O₂</span>
            <span className={step >= 3 ? 'visible energy-product' : ''}>ATP</span>
            <span className={step >= 3 ? 'visible energy-product' : ''}>NADPH</span>
          </div>
          <div className="to-calvin">{step >= 4 ? <><span>ATP + NADPH</span><ArrowRight /></> : <span>enerji taşıyıcıları burada oluşur</span>}</div>
        </div>
        <div className="step-panel">
          <span className="step-count">ADIM {step + 1} / 5</span>
          <h2>{s.title}</h2>
          <p>{s.detail}</p>
          <div className={'event-chip ' + s.color}>{s.event}</div>
          <div className="step-dots">{lightStages.map((_, i) => <button key={i} className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => setStep(i)} />)}</div>
        </div>
      </div>
      <div className="cinema-controls">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft /></button>
        <button className="play-cinema" onClick={() => setPlaying(!playing)}>{playing ? <><Pause /> DURDUR</> : <><Play /> OTOMATİK OYNAT</>}</button>
        <button onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4}><ArrowRight /></button>
        <button onClick={() => { setStep(0); setPlaying(false); }}><RotateCcw /></button>
        <button className="next-chapter" onClick={onNext}>CALVIN DÖNGÜSÜ <ArrowRight /></button>
      </div>
    </section>
  );
}

function CalvinScreen({ onNext, speak }: { onNext: () => void; speak: (x: string) => void }) {
  const [phase, setPhase] = useState(0);
  const phases = [
    ['CO₂ döngüye katılır', 'Karbon kaynağı Calvin döngüsüne girer.'],
    ['ATP enerji sağlar', 'Işığa bağlı tepkimelerde oluşan ATP kullanılır.'],
    ['NADPH indirgenme gücü sağlar', 'NADPH, karbon bileşiklerinin indirgenmesinde kullanılır.'],
    ['Organik madde sentezine giden ürünler oluşur', 'Karbon, organik madde sentezine giden ürünlere aktarılır.'],
    ['Döngü yeniden başlar', 'Başlangıç maddelerinin bir bölümü yenilenir ve döngü devam eder.'],
  ];
  useEffect(() => { const t = window.setInterval(() => setPhase(p => (p + 1) % phases.length), 3000); return () => clearInterval(t); }, []);
  return (
    <section className="lesson-screen">
      <Heading no="03 · CALVİN DÖNGÜSÜ" title={<>Işıktan gelen <em>enerjiyi</em> karbonla buluştur.</>}
        text="Işık doğrudan burada kullanılmaz. ATP ve NADPH, ışığa bağlı tepkimelerden gelir; CO₂ ise karbon kaynağı olarak döngüye katılır."
        onSpeak={() => speak(narration.calvin)} />
      <div className="calvin-scene">
        <div className="calvin-inputs">
          <FlowCard title="CO₂" text="karbon kaynağı" accent />
          <div className="energy-in"><Zap /><b>ATP + NADPH</b><small>ışığa bağlı tepkimelerden</small></div>
        </div>
        <div className="calvin-orbit">
          <div className="orbit-ring"><i/><i/><i/><i/><i/><i/></div>
          <div className="orbit-core"><Leaf /><b>CALVİN<br/>DÖNGÜSÜ</b><small>STROMA</small></div>
          <div className="orbit-particle co2">CO₂</div>
          <div className="orbit-particle atp">ATP</div>
          <div className="orbit-particle nadph">NADPH</div>
        </div>
        <div className="calvin-output"><FlowCard title="ORGANİK MADDE" text="sentez için ürünler" green /><div className="recycle">↻ Döngü devam eder</div></div>
      </div>
      <div className="calvin-step"><span>ADIM {phase + 1} / 5</span><div><b>{phases[phase][0]}</b><small>{phases[phase][1]}</small></div><div className="calvin-progress">{phases.map((_, i) => <button key={i} onClick={() => setPhase(i)} className={i === phase ? 'on' : ''} />)}</div></div>
      <div className="lesson-bottom"><span><Check /> <b>KRİTİK:</b> Calvin döngüsü ışığı doğrudan kullanmaz; ATP ve NADPH kullanır.</span><button onClick={onNext}>SUNUMA GEÇ <ArrowRight /></button></div>
    </section>
  );
}

function PresentationScreen({ index, notes, setNotes, sound, speak }: {
  index: number; notes: boolean; setNotes: (b: boolean) => void; sound: boolean; speak: (x: string) => void;
}) {
  const [page, setPage] = useState(0);
  const texts = [
    ['FOTOSENTEZ', 'Işık enerjisinin organik madde sentezine bağlanması'],
    ['IŞIĞA BAĞLI TEPKİMELER', 'Pigment → H₂O → ETS → ATP + NADPH'],
    ['CALVİN DÖNGÜSÜ', 'CO₂ + ATP + NADPH → organik madde sentezine giden ürünler'],
    ['SONUÇ', 'Madde ve enerji akışları iki ana bölümü birbirine bağlar.'],
  ];
  const notesText = [
    'Önce bütün modeli göster. Fotosentezi iki ana bölüme ayıracağını söyle.',
    'Pigmentlerin ışığı soğurduğunu, suyun parçalanmasıyla O₂ çıktığını ve elektronların ETS boyunca taşındığını anlat.',
    'ATP ve NADPH’nin ışığa bağlı tepkimelerden geldiğini, CO₂’nin Calvin döngüsünde kullanıldığını vurgula.',
    'Modeli özetle: ışık ve su → ışığa bağlı tepkimeler; ATP/NADPH → Calvin; CO₂ → organik madde; O₂ → ortam.',
  ];
  const p = texts[page];
  useEffect(() => { setPage(0); }, [index]);
  return (
    <section className="presentation-screen">
      <div className="presentation-main-card">
        <div className="presentation-top"><span>FOTOSENTEZ · SINIF SUNUMU</span><small>{page + 1} / 4</small></div>
        <div className="presentation-hero">
          <span className="presentation-kicker">BİLİMSEL MODEL</span>
          <h1>{p[0]}</h1>
          <p>{p[1]}</p>
          <div className="presentation-visual">
            {page === 0 && <><Sun/><ArrowRight/><Leaf/><ArrowRight/><span>ORGANİK MADDE</span></>}
            {page === 1 && <><Sun/><span>→</span><b>PIGMENT</b><span>→</span><b>ETS</b><span>→</span><b>ATP + NADPH</b></>}
            {page === 2 && <><b>CO₂</b><span>+</span><b>ATP</b><span>+</span><b>NADPH</b><span>→</span><Leaf/></>}
            {page === 3 && <><Droplets/><span>+</span><Sun/><span>→</span><Atom/><span>→</span><Leaf/></>}
          </div>
          <button className="presentation-speak" onClick={() => speak([narration.model, narration.light, narration.calvin, narration.present][page])} disabled={!sound}>
            <Volume2 /> BU SAYFAYI ANLAT
          </button>
        </div>
        {notes && <div className="teacher-notes"><b>🎤 ÖĞRETMEN NOTU</b><span>{notesText[page]}</span></div>}
      </div>
      <div className="presentation-bar">
        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}><ArrowLeft /> ÖNCEKİ</button>
        <button onClick={() => setNotes(!notes)}>{notes ? 'NOTU GİZLE' : 'ANLATIM NOTU'}</button>
        <button className="presentation-next" onClick={() => setPage(Math.min(3, page + 1))} disabled={page === 3}>SONRAKİ <ArrowRight /></button>
      </div>
    </section>
  );
}
