import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import NavBar from './components/ui/NavBar'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions'
import { QualitiesProvider } from './hooks/useQualities'

const App = () => {
  return (
    <>
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
      <ToastContainer />
    </>
  )
}

export default App
