import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container text-center py-5">
      <h1 className="display-6 mb-3">Carbon Footprint Tracker</h1>
      <p className="lead text-muted mb-4">
        Log your daily transport, energy, and food choices, see your estimated CO2e footprint
        over time, and track progress against a personal reduction goal.
      </p>
      <Link to={user ? '/dashboard' : '/register'} className="btn btn-primary btn-lg">
        {user ? 'Go to Dashboard' : 'Get Started'}
      </Link>
    </div>
  );
}
