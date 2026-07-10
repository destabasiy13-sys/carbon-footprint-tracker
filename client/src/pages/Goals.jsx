import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import GoalForm from '../components/GoalForm';
import GoalProgressCard from '../components/GoalProgressCard';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGoals();
  }, []);

  function loadGoals() {
    setLoading(true);
    axiosClient
      .get('/goals')
      .then((res) => setGoals(res.data))
      .finally(() => setLoading(false));
  }

  async function handleSave(fields) {
    setSaving(true);
    setError('');
    try {
      await axiosClient.post('/goals', fields);
      loadGoals();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create goal');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this goal?')) return;
    await axiosClient.delete(`/goals/${id}`);
    loadGoals();
  }

  return (
    <div className="container">
      <h1 className="h3 mb-4">Goals</h1>

      <div className="card p-3 mb-4">
        <h2 className="h5 mb-3">New Goal</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <GoalForm onSave={handleSave} saving={saving} />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : goals.length === 0 ? (
        <p className="text-muted">No goals yet.</p>
      ) : (
        goals.map((goal) => (
          <GoalProgressCard key={goal.id} goal={goal} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
