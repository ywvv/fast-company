import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userSercice from '../services/user.service.js'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service.js'

const httpAuth = axios.create()
const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  const signUp = async ({ email, password, ...rest }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      import.meta.env.VITE_FIREBASE_KEY
    }`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
      console.log(data)
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
      // throw new Error()
    }
  }

  const createUser = async (data) => {
    try {
      const { content } = userSercice.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
