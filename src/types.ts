export type PresentationStage =
  | 'home'               // 01 - Başlangıç
  | 'cell'               // 02 - Hücre (Sitoplazma & Mitokondri dahil)
  | 'chloroplast'        // 03 - Kloroplast
  | 'light'              // 04 - Işık Tepkimeleri (H+ birikimi, ETS, ATP Sentaz)
  | 'calvin'             // 05 - Calvin Döngüsü (CO2 -> ATP -> NADPH -> PGAL hareketli akış)
  | 'factors'            // 06 - Hız Laboratuvarı (Temel ve Diğer faktörler, Göreli Hız)
  | 'whole_system'       // 07 - Tüm Sistem (Oynatılabilir Büyük Devre)
  | 'pigments'           // 08 - Pigmentler (380-750 nm Sürgülü Spektrum)
  | 'build_model'        // 09 - Modelini Kur (Öğrenci Tasarımı)
  | 'scientific_model'   // 10 - Bilimsel Model (Öğretmen Referansı)
  | 'compare'            // 11 - Karşılaştır (Eksik ve Yanlışları Bul)
  | 'revise'             // 12 - Modelini Revize Et (Düzeltilmiş Nihai Model & Rapor)
  | 'final_presentation'; // 13 - Son Model & Sınıfa Sor (Modelde Göster özellikli)

export interface StageDefinition {
  id: PresentationStage;
  number: string;
  shortTitle: string;
  fullTitle: string;
  question: string;
  suggestedDuration: string;
}

export interface OrganelleInfo {
  id: string;
  name: string;
  location: string;
  role: string;
  isChloroplast?: boolean;
}

export interface ChloroplastStructureInfo {
  id: string;
  name: string;
  whatIsIt: string;
  whereIsIt: string;
  role: string;
  reactionZone: 'light' | 'calvin' | 'boundary';
}

export interface LightReactionStep {
  id: number;
  title: string;
  chemicalEq: string;
  description: string;
  focusTarget: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  teacherNote?: string;
  modelTargetStage?: PresentationStage; // "MODELDE GÖSTER" hedefi!
  modelTargetLabel?: string;
}

// Backwards-compatible exports
export type AppTab = 'home' | 'explore' | 'photosynthesis' | 'simulation' | 'questions';
export type ExploreStep = 'cell' | 'chloroplast_anatomy' | 'two_regions';
export type PhotosynthesisView = 'big_picture' | 'light_reactions' | 'calvin_cycle' | 'steps';

export interface CellOrganelle {
  id: string;
  name: string;
  role: string;
  isChloroplast?: boolean;
}

export interface ChloroplastPart {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  location: string;
  reactionType: 'light' | 'calvin' | 'structure';
}

export interface SimulationParams {
  light: number;
  water: number;
  co2: number;
  speed: 'slow' | 'normal' | 'fast';
  showElectrons: boolean;
  showProtons: boolean;
}

export interface QuestionItem {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export interface ExperimentScenario {
  id: string;
  name: string;
  description: string;
  light: number;
  water: number;
  co2: number;
  expectedRate: 'Düşük' | 'Orta' | 'Yüksek';
  limitingFactor: string;
  explanation: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  focusArea: 'light_source' | 'ps2' | 'photolysis' | 'ets' | 'atp_synthase' | 'ps1' | 'nadph' | 'calvin' | 'glucose';
  description: string;
}
