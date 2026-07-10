import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ActivityTable from '../components/ActivityTable';

export default function Entries() {
  const [activities, setActivities] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, [category]);

  function loadActivities() {
    setLoading(true);
    const params = category ? { category } : {};
    axiosClient
      .get('/activities', { params })
      .then((res) => setActivities(res.data))
      .finally(() => setLoading(false));
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this entry?')) return;
    await axiosClient.delete(`/activities/${id}`);
    loadActivities();
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Entries</h1>
        <Link to="/log" className="btn btn-primary btn-sm">
          Log Activity
        </Link>
      </div>

      <div className="mb-3" style={{ maxWidth: 220 }}>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="transport">Transport</option>
          <option value="energy">Home Energy</option>
          <option value="food">Food</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <ActivityTable activities={activities} onDelete={handleDelete} />
      )}
    </div>
  );
}
