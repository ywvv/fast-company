import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import UserCard from '../../ui/UserCard'
import QualitiesCard from '../../ui/QualitiesCard'
import MeetingsCard from '../../ui/MeetingsCard'
import Comments from '../../ui/Comments'

const UserPage = () => {
  const [user, setUser] = useState()
  const { userId } = useParams()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
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
