import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUser._id === user._id && (
          <button
            className="btn btn-light btn-sm position-absolute top-0 end-0"
            onClick={() => navigate(`/users/${user._id}/edit`)}
            style={{ zIndex: 1 }}
          >
            <i className="bi bi-gear-fill fs-5" />
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="150"
            height="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserCard
