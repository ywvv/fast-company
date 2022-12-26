import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './layouts/Main.jsx'
import Login from './layouts/Login.jsx'
import Users from './layouts/Users.jsx'
import NavBar from './components/ui/NavBar.jsx'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities.js'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<Users />} />
              <Route path="/users/:userId/:edit" element={<Users />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/login/:type" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ProfessionProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  )
}

export default App
