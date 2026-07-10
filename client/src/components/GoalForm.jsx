import { useState } from 'react';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function GoalForm({ onSave, saving }) {
  const [category, setCategory] = useState('transport');
  const [targetPercent, setTargetPercent] = useState(20);
  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      category,
      target_reduction_percent: targetPercent,
      start_date: startDate,
      end_date: endDate,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="row g-3 align-items-end">
      <div className="col-md-3">
        <label className="form-label">Category</label>
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="transport">Transport</option>
          <option value="energy">Home Energy</option>
          <option value="food">Food</option>
        </select>
      </div>
      <div className="col-md-2">
        <label className="form-label">Target Reduction (%)</label>
        <input
          type="number"
          min="1"
          max="100"
          className="form-control"
          value={targetPercent}
          onChange={(e) => setTargetPercent(e.target.value)}
          required
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="col-md-1">
        <button type="submit" className="btn btn-primary w-100" disabled={saving}>
          Add
        </button>
      </div>
    </form>
  );
}
