import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './layouts/Main.jsx'
import Login from './layouts/Login.jsx'
import Users from './layouts/Users.jsx'
import NavBar from './components/ui/NavBar.jsx'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions.jsx'
import { QualitiesProvider } from './hooks/useQualities.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/:type" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:userId" element={<Users />} />
              <Route path="/users/:userId/:edit" element={<Users />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  )
}

export default App
