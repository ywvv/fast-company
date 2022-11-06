import { useParams } from 'react-router-dom'
import UserPage from '../components/pages/UserPage'
import UsersListPage from '../components/pages/UsersListPage'
import EditUserPage from '../components/pages/EditUserPage/EditUserPage'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <>
      {userId ? (
        edit ? (
          <EditUserPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

export default Users
