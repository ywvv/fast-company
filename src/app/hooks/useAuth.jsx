import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service.js'
import { toast } from 'react-toastify'
import localStorageService, {
  setTokens
} from '../services/localStorage.service.js'
import { useNavigate } from 'react-router-dom'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: import.meta.env.VITE_FIREBASE_KEY
  }
})
const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()

  const logIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getUserData()
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email or password is wrong')
          default:
            throw new Error(
              'Too many unsuccessful login attempts. Try again later'
            )
        }
      }
      console.log(code, message)
    }
  }

  const logOut = () => {
    localStorageService.removeAuthData()
    setUser(null)
    navigate('/')
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          // eslint-disable-next-line no-throw-literal
          throw {
            email: 'User already exists with this email address'
          }
        }
      }
      console.log(code, message)
    }
  }

  const updateUserData = async (data) => {
    try {
      const { content } = await userService.update(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const getUserData = async () => {
    try {
      const { content } = await userService.getCurrentUser()
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, currentUser, logOut, updateUserData }}
    >
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
