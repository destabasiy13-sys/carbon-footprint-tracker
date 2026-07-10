import { useState } from 'react';

const TRANSPORT_MODES = ['car', 'bus', 'train', 'bike_walk', 'flight_short_haul'];
const ENERGY_TYPES = ['electricity', 'natural_gas'];
const DIET_PATTERNS = ['meat_heavy', 'average', 'vegetarian', 'vegan'];

function labelFor(value) {
  return value
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function ActivityForm({ initialActivity, onSave, saving }) {
  const [category, setCategory] = useState(initialActivity?.category || 'transport');
  const [activityDate, setActivityDate] = useState(initialActivity?.activity_date || todayIso());
  const [transportMode, setTransportMode] = useState(initialActivity?.transport_mode || 'car');
  const [distanceKm, setDistanceKm] = useState(initialActivity?.distance_km || '');
  const [energyType, setEnergyType] = useState(initialActivity?.energy_type || 'electricity');
  const [energyUsageKwh, setEnergyUsageKwh] = useState(initialActivity?.energy_usage_kwh || '');
  const [dietPattern, setDietPattern] = useState(initialActivity?.diet_pattern || 'average');
  const [notes, setNotes] = useState(initialActivity?.notes || '');

  function handleSubmit(e) {
    e.preventDefault();
    const fields = {
      category,
      activity_date: activityDate,
      notes: notes || null,
    };
    if (category === 'transport') {
      fields.transport_mode = transportMode;
      fields.distance_km = distanceKm;
    } else if (category === 'energy') {
      fields.energy_type = energyType;
      fields.energy_usage_kwh = energyUsageKwh;
    } else if (category === 'food') {
      fields.diet_pattern = dietPattern;
    }
    onSave(fields);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="transport">Transport</option>
            <option value="energy">Home Energy</option>
            <option value="food">Food</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            required
          />
        </div>
      </div>

      {category === 'transport' && (
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Mode</label>
            <select
              className="form-select"
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
            >
              {TRANSPORT_MODES.map((m) => (
                <option key={m} value={m}>
                  {labelFor(m)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Distance (km)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-control"
              value={distanceKm}
              onChange={(e) => setDistanceKm(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      {category === 'energy' && (
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Energy Type</label>
            <select
              className="form-select"
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
            >
              {ENERGY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {labelFor(t)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Usage (kWh)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-control"
              value={energyUsageKwh}
              onChange={(e) => setEnergyUsageKwh(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      {category === 'food' && (
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Diet Pattern for the Day</label>
            <select
              className="form-select"
              value={dietPattern}
              onChange={(e) => setDietPattern(e.target.value)}
            >
              {DIET_PATTERNS.map((d) => (
                <option key={d} value={d}>
                  {labelFor(d)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="form-label">Notes (optional)</label>
        <input
          type="text"
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving}>
        {saving ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  );
}
