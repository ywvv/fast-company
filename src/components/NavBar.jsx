import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fs-5 mb-3">
      <div className="container">
        <ul className="navbar-nav">
          <li className="navbar-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              Main
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink className="nav-link" aria-current="page" to="/login">
              Login
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink className="nav-link" aria-current="page" to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
