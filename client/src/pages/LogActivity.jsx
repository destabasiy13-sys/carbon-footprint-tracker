import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ActivityForm from '../components/ActivityForm';

export default function LogActivity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    axiosClient
      .get(`/activities/${id}`)
      .then((res) => setActivity(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave(fields) {
    setSaving(true);
    setError('');
    try {
      if (id) {
        await axiosClient.put(`/activities/${id}`, fields);
      } else {
        await axiosClient.post('/activities', fields);
      }
      navigate('/entries');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save entry');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-4">{id ? 'Edit Entry' : 'Log Activity'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ActivityForm initialActivity={activity} onSave={handleSave} saving={saving} />
    </div>
  );
}
