import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import NavProfile from './NavProfile.jsx'

const NavBar = () => {
  const { currentUser } = useAuth()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fs-5 mb-4">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="navbar-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              Main
            </NavLink>
          </li>
          {currentUser && (
            <li className="navbar-item">
              <NavLink className="nav-link" aria-current="page" to="/users">
                Users
              </NavLink>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <NavLink
              className="nav-link text-light"
              aria-current="page"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
