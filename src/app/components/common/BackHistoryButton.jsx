import { useNavigate } from 'react-router-dom'

const BackHistoryButton = () => {
  const navigate = useNavigate()

  return (
    <button
      className="btn btn-primary position-absolute"
      onClick={() => navigate(-1)}
    >
      <i className="bi bi-caret-left-fill" />
      Back
    </button>
  )
}

export default BackHistoryButton
