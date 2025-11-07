import type { CarDetail, LeadPayload, Promotion } from '../types/car';

// Small helper to simulate latency for skeleton states.
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCarDetail(modelSlug: string): Promise<CarDetail> {
  // TODO: replace dynamic import with real fetch once APIs are available.
  const result = await import('../data/car-detail.mock.json');
  await delay();
  const detail = result.default as CarDetail;

  if (detail.id === modelSlug || detail.modelName.toLowerCase().replace(/\s+/g, '-') === modelSlug) {
    return detail;
  }

  // For now return the only mock we have.
  return detail;
}

export async function fetchPromotions(modelSlug: string): Promise<Promotion[]> {
  const detail = await fetchCarDetail(modelSlug);
  return detail.promotions ?? [];
}

export async function submitLead(payload: LeadPayload): Promise<{ status: 'ok' }> {
  // TODO: POST payload to VinFast CRM once endpoint is provided.
  console.info('[submitLead] mock payload', payload);
  await delay(500);
  return { status: 'ok' };
}

