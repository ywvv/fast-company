import { createContext, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth.jsx'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service.js'

const CommentsContext = createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)
  const { userId } = useParams()
  const { currentUser } = useAuth()

  useEffect(() => {
    getComments()
  }, [userId])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const errorCatcher = (error) => {
    const { message } = error.response.data
    setError(message)
  }

  const getComments = async () => {
    try {
      const { content } = await commentService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const { content } = await commentService.createComment(comment)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }

  const removeComment = async (id) => {
    try {
      const { content } = await commentService.removeComment(id)
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        )
      }
    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
