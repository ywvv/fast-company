import { useParams } from 'react-router-dom'
import UserPage from '../components/pages/UserPage/index.js'
import UsersListPage from '../components/pages/UsersListPage/index.js'
import EditUserPage from '../components/pages/EditUserPage/EditUserPage.jsx'
import { UserProvider } from '../hooks/useUsers.jsx'

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
