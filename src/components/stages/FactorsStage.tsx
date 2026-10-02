import React, { useState, useMemo } from 'react';
import { ArrowRight, RotateCcw, Sun, Thermometer, Wind, AlertCircle, Droplets, FlaskConical, Gauge, Info } from 'lucide-react';

interface Props {
  onGoToWholeSystem: () => void;
  voiceEnabled: boolean;
  onSpeakText: (text: string) => void;
}

export const FactorsStage: React.FC<Props> = ({
  onGoToWholeSystem,
  voiceEnabled,
  onSpeakText
}) => {
  const [light, setLight] = useState<number>(75);
  const [temp, setTemp] = useState<number>(28);
  const [co2, setCo2] = useState<number>(70);
  const [water, setWater] = useState<number>(70);
  const [minerals, setMinerals] = useState<number>(65);
  const [ph, setPh] = useState<number>(7.4);

  const [selectedGraphTab, setSelectedGraphTab] = useState<'light' | 'temp' | 'co2' | 'ph'>('light');

  // Compute temperature biological efficiency (optimum 25-35°C, denaturation > 40°C)
  const tempEfficiency = useMemo(() => {
    if (temp <= 0) return 0;
    if (temp < 10) return Math.round(temp * 3);
    if (temp >= 10 && temp <= 25) return Math.round(30 + ((temp - 10) / 15) * 65);
    if (temp > 25 && temp <= 35) return 100; // Optimum zone
    if (temp > 35 && temp <= 45) return Math.max(0, Math.round(100 - ((temp - 35) / 10) * 85));
    return 0; // Denaturation
  }, [temp]);

  // Compute pH biological efficiency (optimum around 7-8 for stroma enzymes)
  const phEfficiency = useMemo(() => {
    const diff = Math.abs(ph - 7.5);
    if (diff > 3.5) return 5;
    return Math.round(Math.max(5, 100 - diff * 28));
  }, [ph]);

  // Water efficiency (below 15% stomata close completely, stopping photosynthesis)
  const waterEfficiency = useMemo(() => {
    if (water < 15) return 0; // Plasmolysis / stomata shut
    return water;
  }, [water]);

  // Overall Rate determined by Liebig's Law of the Minimum (Minimum Kuralı)
  const factorScores = useMemo(() => [
    { name: 'Işık Şiddeti', score: light, id: 'light' },
    { name: 'Sıcaklık', score: tempEfficiency, id: 'temp' },
    { name: 'CO₂ Düzeyi', score: co2, id: 'co2' },
    { name: 'Su Miktarı', score: waterEfficiency, id: 'water' },
    { name: 'Mineral Düzeyi', score: minerals, id: 'minerals' },
    { name: 'pH Değeri', score: phEfficiency, id: 'ph' }
  ], [light, tempEfficiency, co2, waterEfficiency, minerals, phEfficiency]);

  const effectiveRate = Math.min(...factorScores.map((f) => f.score));

  // Determine ALL limiting factors (handling equality correctly!)
  const limitingFactors = useMemo(() => {
    return factorScores.filter((f) => f.score === effectiveRate);
  }, [factorScores, effectiveRate]);

  const handleReset = () => {
    setLight(75);
    setTemp(28);
    setCo2(70);
    setWater(70);
    setMinerals(65);
    setPh(7.4);
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-2 px-2 sm:px-5 flex flex-col gap-4 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-[#dce6da] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#166534] uppercase tracking-wider mb-1">
            <span>07 · FOTOSENTEZ HIZI</span>
            <span>•</span>
            <span>MİNUMUM KURALI (LIEBIG KANUNU)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143823] tracking-tight">
            Fotosentez Hızını <span className="text-[#166534]">Etkileyen Çevresel Faktörler</span>
          </h1>
          <p className="text-sm text-[#4e6b5a] mt-0.5 max-w-3xl">
            Işık, sıcaklık, CO₂, su, mineraller ve pH değerlerini değiştirin. Birden çok faktör aynı anda düşük olduğunda sistem her birini sınırlayıcı faktör olarak gösterir.
          </p>
        </div>

        {/* Reset Conditions Button */}
        <button
          onClick={handleReset}
          className="h-11 px-4 rounded-xl bg-white hover:bg-[#edf5eb] border border-[#dce6da] text-[#3c5e48] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Optimum Değerlere Sıfırla</span>
        </button>
      </div>

      {/* Mandatory Pedagogical Disclaimer Notice */}
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl px-4 py-2.5 flex items-center gap-2.5 text-xs text-[#14532d]">
        <Info className="w-4 h-4 text-[#166534] shrink-0" />
        <span className="font-semibold">
          Eğitimsel Model Notu: Bu ekran gerçek fotosentez hızını mikromol cinsinden hesaplayan mutlak bir ölçüm aracı değil; <b>sınırlayıcı faktörleri ve minimum kuralını</b> somutlaştıran pedagojik bir modeldir.
        </span>
      </div>

      {/* Main Grid: Controls on Left, Rate & Graph on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[550px]">
        {/* Left: All 6 Sliders in clean 2-column card layout (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#dce6da] rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold text-[#166534] uppercase tracking-wider block">
              6 ÇEVRESEL DEĞİŞKEN (SLIDERLARI TEST EDİN)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* 1. Işık Şiddeti */}
              <div className="p-3 rounded-xl bg-[#fefce8] border border-[#fef08a] space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-900">
                  <span className="flex items-center gap-1.5"><Sun className="w-4 h-4 text-amber-600" /> Işık Şiddeti</span>
                  <span className="font-mono text-amber-700">%{light}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={light}
                  onChange={(e) => setLight(Number(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* 2. Sıcaklık */}
              <div className="p-3 rounded-xl bg-[#fff7ed] border border-[#fed7aa] space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-orange-900">
                  <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-orange-600" /> Sıcaklık</span>
                  <span className="font-mono text-orange-700">{temp}°C</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>

              {/* 3. CO2 Düzeyi */}
              <div className="p-3 rounded-xl bg-[#f5f3ff] border border-[#ddd6fe] space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-purple-900">
                  <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 text-purple-600" /> CO₂ Miktarı</span>
                  <span className="font-mono text-purple-700">%{co2}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={co2}
                  onChange={(e) => setCo2(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* 4. Su Miktarı */}
              <div className="p-3 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-sky-900">
                  <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-sky-600" /> Su (Nem)</span>
                  <span className="font-mono text-sky-700">%{water}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={water}
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>

              {/* 5. Mineraller */}
              <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-emerald-900">
                  <span className="flex items-center gap-1.5"><FlaskConical className="w-4 h-4 text-emerald-600" /> Mineraller (Fe, Mg)</span>
                  <span className="font-mono text-emerald-700">%{minerals}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minerals}
                  onChange={(e) => setMinerals(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* 6. pH Değeri */}
              <div className="p-3 rounded-xl bg-[#faf5ff] border border-[#e9d5ff] space-y-1">
                <div className="flex items-center justify-between text-xs font-extrabold text-violet-900">
                  <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4 text-violet-600" /> pH Düzeyi</span>
                  <span className="font-mono text-violet-700">{ph}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="0.2"
                  value={ph}
                  onChange={(e) => setPh(Number(e.target.value))}
                  className="w-full h-2 bg-violet-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>
            </div>
          </div>

          {/* Individual Factor Status Bars */}
          <div className="bg-[#f8faf6] border border-[#dce6da] rounded-2xl p-3 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-[#166534] uppercase block">
              FAKTÖR DEĞERLERİNİN KARŞILAŞTIRMASI:
            </span>
            <div className="space-y-1">
              {factorScores.map((f) => {
                const isLimiting = f.score === effectiveRate;
                return (
                  <div key={f.id} className="flex items-center gap-2 text-xs">
                    <span className="w-24 text-[11px] font-bold text-slate-700 truncate">{f.name}</span>
                    <div className="flex-1 h-3 bg-[#e2ede0] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isLimiting ? 'bg-rose-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${Math.min(100, f.score)}%` }}
                      />
                    </div>
                    <span className={`w-10 text-right font-mono text-[11px] font-extrabold ${isLimiting ? 'text-rose-600' : 'text-slate-600'}`}>
                      %{Math.round(f.score)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Rate Meter + Correct Multi-Limiting Banner + Graph (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#dce6da] rounded-3xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            {/* Rate Gauge */}
            <div className="p-3.5 bg-[#f8faf6] border border-[#dce6da] rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#627d6d] uppercase block">
                  TAHMİNİ BAĞIL FOTOSENTEZ HIZI
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-4xl font-black text-[#143823] tracking-tight">
                    %{effectiveRate}
                  </span>
                  <span className="text-xs font-bold text-[#426b52]">
                    (En düşük faktör hızı kilitler)
                  </span>
                </div>
              </div>

              <div className="w-48 space-y-1">
                <div className="h-4 bg-[#e2ede0] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${effectiveRate}%`,
                      backgroundColor:
                        effectiveRate > 70
                          ? '#16a34a'
                          : effectiveRate > 35
                          ? '#eab308'
                          : '#e11d48'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sınırlayıcı Faktör Banner (Eşitlik Durumunu Tam Destekler!) */}
            <div className="p-3.5 rounded-2xl border bg-amber-50/80 border-amber-300 space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-extrabold text-amber-900 uppercase">
                  {limitingFactors.length > 1 ? 'ORTAK SINIRLAYICI FAKTÖRLER:' : 'SINIRLAYICI FAKTÖR:'}
                </span>
                {limitingFactors.map((lf) => (
                  <span key={lf.id} className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-extrabold text-xs">
                    {lf.name} (%{Math.round(lf.score)})
                  </span>
                ))}
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {limitingFactors.length > 1 ? (
                  <><b>{limitingFactors.map((f) => f.name).join(' ve ')}</b> şu an eşit düzeyde en düşüktür. Hızı artırmak için bu faktörlerin tamamı birlikte yükseltilmelidir!</>
                ) : (
                  <>Fotosentez hızını şu an yalnızca <b>{limitingFactors[0]?.name}</b> sınırlamaktadır. Diğer faktörleri ne kadar artırırsanız artırın, bu faktör iyileştirilmedikçe hız artmaz!</>
                )}
              </p>
            </div>

            {/* Scientific Graph Selector Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#166534] uppercase">
                  BİLİMSEL EĞRİ
                </span>
                <div className="flex gap-1 text-xs">
                  <button
                    onClick={() => setSelectedGraphTab('light')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${
                      selectedGraphTab === 'light' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'text-slate-500'
                    }`}
                  >
                    Işık
                  </button>
                  <button
                    onClick={() => setSelectedGraphTab('temp')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${
                      selectedGraphTab === 'temp' ? 'bg-orange-100 text-orange-900 border border-orange-300' : 'text-slate-500'
                    }`}
                  >
                    Sıcaklık
                  </button>
                  <button
                    onClick={() => setSelectedGraphTab('co2')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${
                      selectedGraphTab === 'co2' ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'text-slate-500'
                    }`}
                  >
                    CO₂
                  </button>
                  <button
                    onClick={() => setSelectedGraphTab('ph')}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${
                      selectedGraphTab === 'ph' ? 'bg-violet-100 text-violet-900 border border-violet-300' : 'text-slate-500'
                    }`}
                  >
                    pH
                  </button>
                </div>
              </div>

              {/* SVG Scientific Graph Canvas */}
              <div className="w-full h-40 bg-[#fafcf9] border border-[#dce6da] rounded-2xl p-2.5 relative">
                <svg viewBox="0 0 500 150" className="w-full h-full">
                  <line x1="50" y1="20" x2="480" y2="20" stroke="#e5ede2" strokeDasharray="3 3" />
                  <line x1="50" y1="70" x2="480" y2="70" stroke="#e5ede2" strokeDasharray="3 3" />
                  <line x1="50" y1="120" x2="480" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="50" y1="15" x2="50" y2="120" stroke="#94a3b8" strokeWidth="1.5" />

                  <text x="42" y="24" textAnchor="end" fill="#64748b" fontSize="9" fontWeight="bold">Max</text>
                  <text x="42" y="123" textAnchor="end" fill="#64748b" fontSize="9">0</text>

                  {selectedGraphTab === 'light' && (
                    <>
                      <path d="M 50 120 Q 150 35 480 30" fill="none" stroke="#eab308" strokeWidth="3" />
                      <circle cx={50 + (light / 100) * 430} cy={120 - (effectiveRate / 100) * 95} r="6" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
                      <text x="265" y="142" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">
                        Işık Şiddeti → (Doygunluktan sonra sabitlenir)
                      </text>
                    </>
                  )}

                  {selectedGraphTab === 'temp' && (
                    <>
                      <path d="M 50 120 C 180 110, 250 25, 340 25 C 380 25, 420 70, 450 120" fill="none" stroke="#ea580c" strokeWidth="3" />
                      <circle cx={50 + (temp / 50) * 400} cy={120 - (effectiveRate / 100) * 95} r="6" fill="#ea580c" stroke="#ffffff" strokeWidth="2" />
                      <text x="265" y="142" textAnchor="middle" fill="#9a3412" fontSize="9" fontWeight="bold">
                        Sıcaklık (°C) → (Çan Eğrisi: 30°C Optimum, 40°C sonrası Denatürasyon)
                      </text>
                    </>
                  )}

                  {selectedGraphTab === 'co2' && (
                    <>
                      <path d="M 50 120 Q 140 40 480 35" fill="none" stroke="#8b5cf6" strokeWidth="3" />
                      <circle cx={50 + (co2 / 100) * 430} cy={120 - (effectiveRate / 100) * 95} r="6" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
                      <text x="265" y="142" textAnchor="middle" fill="#5b21b6" fontSize="9" fontWeight="bold">
                        CO₂ Miktarı → (Doygunluk noktasına kadar artar)
                      </text>
                    </>
                  )}

                  {selectedGraphTab === 'ph' && (
                    <>
                      <path d="M 120 120 C 200 110, 260 25, 300 25 C 340 25, 400 110, 480 120" fill="none" stroke="#7c3aed" strokeWidth="3" />
                      <circle cx={50 + (ph / 14) * 430} cy={120 - (effectiveRate / 100) * 95} r="6" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
                      <text x="265" y="142" textAnchor="middle" fill="#5b21b6" fontSize="9" fontWeight="bold">
                        pH Seviyesi → (Enzimler dar bir optimum pH aralığında çalışır)
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation to Stage 07 (Tüm Sistem) */}
          <div className="pt-3 border-t border-[#edf2ea] mt-2 space-y-1">
            <button
              onClick={onGoToWholeSystem}
              className="w-full h-12 px-5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer group"
            >
              <span>TÜM SİSTEM BÜYÜK ŞEMAYA GEÇ (07)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-[#748c7e] font-medium">
              Sıradaki: Işık reaksiyonları ile Calvin döngüsünün tam entegrasyonu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
