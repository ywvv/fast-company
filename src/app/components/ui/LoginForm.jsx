import { useEffect, useState } from 'react'
import TextField from '../common/Form/TextField.jsx'
import validator from '../../utils/validator.js'
import CheckboxField from '../common/Form/CheckboxField.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)
  const { logIn } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
    setEnterError(null)
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email is required'
      }
    },
    password: {
      isRequired: {
        message: 'Password is required'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await logIn(data)
      navigate(state ? state.pathname : '/')
    } catch (error) {
      setEnterError(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckboxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Stay logged in
      </CheckboxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto mb-2"
        type="submit"
        disabled={!isValid || enterError}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
