import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service.js'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth.jsx'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users]
      const indexUser = newUsers.findIndex((u) => u._id === currentUser._id)
      newUsers[indexUser] = currentUser
      setUsers(newUsers)
    }
  }, [currentUser])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const getUsers = async () => {
    try {
      const { content } = await userService.get()
      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  const getUserById = (userId) => {
    return users.find((user) => user._id === userId)
  }

  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!isLoading ? (
        children
      ) : (
        <div className="container">
          <h6>Loading...</h6>
        </div>
      )}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
