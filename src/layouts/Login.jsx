import { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/LoginForm'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register' ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have account?&nbsp;
                <a role="button" onClick={toggleFormType}>
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Don&apos;t have account?&nbsp;
                <a role="button" onClick={toggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
