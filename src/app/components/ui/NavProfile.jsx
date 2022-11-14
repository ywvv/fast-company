import { useAuth } from '../../hooks/useAuth.jsx'
import { Link } from 'react-router-dom'

const NavProfile = () => {
  const { currentUser, logOut } = useAuth()

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle d-flex align-items-center"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="me-3 fs-5 text-light">{currentUser.name}</div>
        <div className="bg-light rounded-circle">
          <img
            className="rounded-circle"
            height="40"
            alt="avatar"
            src={currentUser.image}
          />
        </div>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" to={`users/${currentUser._id}`}>
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/" onClick={logOut}>
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavProfile
