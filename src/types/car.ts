export interface CarDetail {
  id: string;
  brand: 'VinFast';
  modelName: string;
  modelYear?: number;
  shortDescription: string;
  heroMedia: MediaAsset;
  trims: Trim[];
  colors: {
    exterior: ColorOption[];
    interior: ColorOption[];
  };
  media: MediaAsset[];
  specifications: SpecSection[];
  keyFeatures: FeatureItem[];
  promotions?: Promotion[];
  accessories?: Accessory[];
  onRoadCostSchema?: OnRoadCostSchema;
  comparisons?: ComparisonSpec;
  brochure?: { pdfUrl: string; sizeMB?: number; label?: string };
  seo?: { title?: string; description?: string; ogImage?: string };
}

export type MediaAsset = {
  type: 'image' | 'video';
  url: string;
  caption?: string;
  poster?: string;
};

export interface Trim {
  code: string;
  name: string;
  price: { currency: 'VND'; value: number; note?: string };
  powertrain?: string;
  transmission?: string;
  rangeWLTPKm?: number;
  zeroTo100?: number;
  images?: string[];
  highlightFeatures?: string[];
}

export interface ColorOption {
  code: string;
  name: string;
  hex?: string;
  image?: string;
  isPremium?: boolean;
  price?: { currency: 'VND'; value: number; note?: string };
}

export interface SpecSection {
  title: string;
  items: Array<{ label: string; value: string; tooltip?: string }>;
}

export interface FeatureItem {
  icon?: string;
  title: string;
  summary: string;
  tooltip?: string;
  mediaUrl?: string;
}

export interface Promotion {
  title: string;
  description: string;
  validUntil?: string;
  badge?: string;
}

export interface Accessory {
  name: string;
  price?: number;
  image?: string;
  note?: string;
}

export interface OnRoadCostSchema {
  basePriceSource: 'selectedTrim';
  fees: Array<{ label: string; formula: 'fixed' | 'percentOfBase'; value: number; tooltip?: string }>;
}

export interface ComparisonSpec {
  columns: Array<{ trimCode: string; label: string }>;
  rows: Array<{ label: string; values: Record<string, string> }>;
}

export type LeadIntent = 'test-drive' | 'pre-order';

export interface LeadPayload {
  intent: LeadIntent;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  preferredDealer?: string;
  preferredDate?: string;
  preferredTime?: string;
  selectedTrimCode: string;
  exteriorColorCode?: string;
  interiorColorCode?: string;
  notes?: string;
}
