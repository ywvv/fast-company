import { useParams } from 'react-router-dom'
import UserPage from '../components/pages/UserPage'
import UsersListPage from '../components/pages/UsersListPage'
import EditUserPage from '../components/pages/EditUserPage/EditUserPage'
import { UserProvider } from '../hooks/useUsers'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  )
}

export default Users
