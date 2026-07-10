import { Link } from 'react-router-dom';

function describeActivity(activity) {
  if (activity.category === 'transport') {
    return `${activity.transport_mode.replace('_', '/')} — ${activity.distance_km} km`;
  }
  if (activity.category === 'energy') {
    return `${activity.energy_type.replace('_', ' ')} — ${activity.energy_usage_kwh} kWh`;
  }
  return activity.diet_pattern.replace('_', ' ');
}

export default function ActivityTable({ activities, onDelete }) {
  if (activities.length === 0) {
    return <p className="text-muted">No entries yet.</p>;
  }

  return (
    <table className="table table-hover align-middle">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Details</th>
          <th>CO2e (kg)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <td>{activity.activity_date}</td>
            <td className="text-capitalize">{activity.category}</td>
            <td className="text-capitalize">{describeActivity(activity)}</td>
            <td>{Number(activity.co2e_kg).toFixed(2)}</td>
            <td className="text-end">
              <Link to={`/log/${activity.id}`} className="btn btn-outline-secondary btn-sm me-2">
                Edit
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(activity.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
