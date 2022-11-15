import { Navigate, useParams } from 'react-router-dom'
import UserPage from '../components/pages/UserPage/index.js'
import UsersListPage from '../components/pages/UsersListPage/index.js'
import EditUserPage from '../components/pages/EditUserPage/EditUserPage.jsx'
import { UserProvider } from '../hooks/useUsers.jsx'
import { useAuth } from '../hooks/useAuth.jsx'

const Users = () => {
  const { userId, edit } = useParams()
  const { currentUser } = useAuth()

  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <EditUserPage />
            ) : (
              <Navigate to={`/users/${currentUser._id}/edit`} />
            )
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
