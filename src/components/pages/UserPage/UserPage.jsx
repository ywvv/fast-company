import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Qualities from '../../ui/Qualities'
import api from '../../../api'

const UserPage = () => {
  const [user, setUser] = useState()
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  })

  if (user) {
    return (
      <div className="container">
        <h1> {user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button className="btn btn-primary" onClick={() => navigate('/users')}>
          All Users
        </button>
      </div>
    )
  }
  return (
    <div className="container">
      <h2>Loading...</h2>
    </div>
  )
}

export default UserPage
