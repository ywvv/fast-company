import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth.jsx'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const { currentUser } = useAuth()

  return currentUser ? <Outlet /> : <Navigate to="/login" state={location} />
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProtectedRoute
