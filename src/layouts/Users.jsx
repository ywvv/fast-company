import { useParams } from 'react-router-dom'
import UsersList from '../components/UsersList'
import UserPage from '../components/UserPage'

const Users = () => {
  const { userId } = useParams()

  return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>
}

export default Users
