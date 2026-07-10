import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import TrendChart from '../components/charts/TrendChart';
import CategoryBreakdownChart from '../components/charts/CategoryBreakdownChart';
import InsightCard from '../components/InsightCard';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axiosClient.get('/dashboard/summary').then((res) => setSummary(res.data));
  }, []);

  if (!summary) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  const hasData = summary.trend.length > 0;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Dashboard</h1>
        <Link to="/log" className="btn btn-primary btn-sm">
          Log Activity
        </Link>
      </div>

      {!hasData && (
        <div className="alert alert-secondary">
          No entries in the last 30 days yet. <Link to="/log">Log your first activity</Link> to
          see your footprint here.
        </div>
      )}

      <div className="mb-4">
        <InsightCard insight={summary.insight} />
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card p-3">
            <h2 className="h5 mb-3">Footprint Trend (Last 30 Days)</h2>
            <TrendChart data={summary.trend} />
          </div>
        </div>
        <div className="col-md-5">
          <div className="card p-3">
            <h2 className="h5 mb-3">Breakdown by Category</h2>
            <CategoryBreakdownChart data={summary.breakdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
