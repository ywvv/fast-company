import { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service.js'
import { toast } from 'react-toastify'

const ProfessionContext = createContext()

export const useProfessions = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  useEffect(() => {
    getProfessionsList()
  }, [])

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const getProfession = (id) => {
    return professions.find((p) => p._id === id)
  }

  const getProfessionsList = async () => {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
