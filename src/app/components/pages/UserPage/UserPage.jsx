import { useParams } from 'react-router-dom'
import UserCard from '../../ui/UserCard.jsx'
import QualitiesCard from '../../ui/QualitiesCard.jsx'
import MeetingsCard from '../../ui/MeetingsCard.jsx'
import Comments from '../../ui/Comments.jsx'
import { useUser } from '../../../hooks/useUsers.jsx'
import { CommentsProvider } from '../../../hooks/useComments.jsx'

const UserPage = () => {
  const { userId } = useParams()
  const { getUserById } = useUser()
  const user = getUserById(userId)

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
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
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
