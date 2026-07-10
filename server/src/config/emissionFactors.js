// Approximate, publicly-published average emission factors.
// Not tied to a specific live data source - order-of-magnitude consistent
// with commonly cited transport/energy averages and dietary footprint
// studies. Intended for illustrative personal tracking, not certified
// carbon accounting.

export const TRANSPORT_FACTORS_KG_PER_KM = {
  car: 0.192,
  bus: 0.105,
  train: 0.041,
  bike_walk: 0,
  flight_short_haul: 0.255,
};

export const ENERGY_FACTORS_KG_PER_KWH = {
  electricity: 0.42,
  natural_gas: 0.18,
};

export const DIET_FACTORS_KG_PER_DAY = {
  meat_heavy: 7.19,
  average: 5.63,
  vegetarian: 3.81,
  vegan: 2.89,
};
