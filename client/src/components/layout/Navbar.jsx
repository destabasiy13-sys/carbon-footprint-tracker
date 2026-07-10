import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Carbon Footprint Tracker
        </Link>
        <div className="d-flex gap-2">
          {user ? (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/log">
                Log Activity
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/entries">
                Entries
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/goals">
                Goals
              </Link>
              <button className="btn btn-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-light btn-sm" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
