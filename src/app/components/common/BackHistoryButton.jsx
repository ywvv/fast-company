import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const BackHistoryButton = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  return (
    <button
      className="btn btn-primary position-absolute"
      onClick={() => navigate(`/users/${currentUser._id}`)}
    >
      <i className="bi bi-caret-left-fill" />
      Back
    </button>
  )
}

export default BackHistoryButton
