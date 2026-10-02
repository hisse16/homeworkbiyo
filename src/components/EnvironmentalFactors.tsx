import React,{useMemo,useState} from "react";
import {Gauge,Lightbulb,Droplets,Cloud,FlaskConical,RotateCcw} from "lucide-react";

export default function EnvironmentalFactors({sound}:{sound:boolean}){
 const [light,setLight]=useState(70),[co2,setCo2]=useState(55),[water,setWater]=useState(70),[temp,setTemp]=useState(25);
 const rates=useMemo(()=>{
   const tempFactor=temp<5?10:temp<15?45:temp<=30?100:temp<=40?Math.max(20,100-(temp-30)*7):0;
   const limiting=Math.min(light,co2,water,tempFactor);
   return {tempFactor,rate:Math.round(limiting)};
 },[light,co2,water,temp]);
 const reset=()=>{setLight(70);setCo2(55);setWater(70);setTemp(25)};
 return <section className="page factor-page">
  <div className="section-title"><div><span>08 · FOTOSENTEZ HIZI LABORATUVARI</span><h1>Koşulları değiştir. <em>Sınırın nerede olduğunu gör.</em></h1><p>Işık şiddeti, CO₂, su ve sıcaklığı değiştirerek fotosentez hızını modelle. Bu ekran özellikle minimum kuralını görünür hâle getirir.</p></div>
   <button className="narrate" onClick={()=>sound&&window.speechSynthesis?.speak(Object.assign(new SpeechSynthesisUtterance("Fotosentez hızı çevresel koşullara bağlıdır. Miktarı en az olan faktör hızı sınırlar. Buna minimum kuralı denir."),{lang:"tr-TR",rate:.9}))}><span>◉</span> ANLAT</button>
  </div>
  <div className="factor-lab">
   <div className="factor-controls">
    <div className="factor-intro"><Gauge/><div><b>CANLI MODEL</b><small>Değerleri değiştir ve grafiğin nasıl tepki verdiğini gözle.</small></div></div>
    <Factor label="Işık şiddeti" value={light} setValue={setLight} icon={<Lightbulb/>} unit="%"/>
    <Factor label="CO₂ miktarı" value={co2} setValue={setCo2} icon={<Cloud/>} unit="%"/>
    <Factor label="Su miktarı" value={water} setValue={setWater} icon={<Droplets/>} unit="%"/>
    <div className="factor-slider"><div className="factor-row"><span><FlaskConical/> Sıcaklık</span><b>{temp}°C</b></div><input type="range" min="0" max="50" value={temp} onChange={e=>setTemp(+e.target.value)}/><div className="factor-scale"><span>0°</span><span>25°</span><span>50°</span></div></div>
    <button className="reset-factor" onClick={reset}><RotateCcw/> DENEMEYİ SIFIRLA</button>
   </div>
   <div className="factor-visual">
    <div className="rate-card"><span>MODELİLEN FOTOSENTEZ HIZI</span><strong>{rates.rate}%</strong><small>{rates.rate===Math.min(light,co2,water,rates.tempFactor)?"En düşük değer hızı sınırlandırıyor.":"Koşullar dengeli."}</small></div>
    <div className="factor-chart">
      <div className="chart-grid"><i/><i/><i/><i/></div>
      <div className="axis-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
      <div className="curve-main" style={{height:Math.max(5,rates.rate)+"%"}}><b>{rates.rate}</b></div>
      <div className="chart-caption"><span>Düşük</span><b>Fotosentez hızı</b><span>Yüksek</span></div>
    </div>
    <div className="limiting-grid">
      <div className={rates.rate===light?"limiting":""}><span>Işık</span><b>{light}%</b></div>
      <div className={rates.rate===co2?"limiting":""}><span>CO₂</span><b>{co2}%</b></div>
      <div className={rates.rate===water?"limiting":""}><span>Su</span><b>{water}%</b></div>
      <div className={rates.rate===rates.tempFactor?"limiting":""}><span>Sıcaklık etkisi</span><b>{rates.tempFactor}%</b></div>
    </div>
    <div className="minimum-rule"><b>MINIMUM KURALI</b><p>Birden fazla koşul aynı anda değiştirildiğinde model, en düşük sınırlayıcı değeri fotosentez hızına yansıtır.</p></div>
   </div>
  </div>
 </section>
}
function Factor({label,value,setValue,icon,unit}:{label:string;value:number;setValue:(n:number)=>void;icon:React.ReactNode;unit:string}){
 return <div className="factor-slider"><div className="factor-row"><span>{icon} {label}</span><b>{value}{unit}</b></div><input type="range" min="0" max="100" value={value} onChange={e=>setValue(+e.target.value)}/><div className="factor-scale"><span>Yetersiz</span><span>Orta</span><span>Yüksek</span></div></div>
}