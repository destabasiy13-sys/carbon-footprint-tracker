import {
  TRANSPORT_FACTORS_KG_PER_KM,
  ENERGY_FACTORS_KG_PER_KWH,
  DIET_FACTORS_KG_PER_DAY,
} from '../config/emissionFactors.js';

export function calculateCo2e(category, fields) {
  if (category === 'transport') {
    const factor = TRANSPORT_FACTORS_KG_PER_KM[fields.transport_mode];
    return factor * Number(fields.distance_km);
  }

  if (category === 'energy') {
    const factor = ENERGY_FACTORS_KG_PER_KWH[fields.energy_type];
    return factor * Number(fields.energy_usage_kwh);
  }

  if (category === 'food') {
    return DIET_FACTORS_KG_PER_DAY[fields.diet_pattern];
  }

  throw new Error(`Unknown activity category: ${category}`);
}
