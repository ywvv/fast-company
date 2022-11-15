import PropTypes from 'prop-types'
import { useState } from 'react'
import validator from '../../../utils/validator.js'
import TextAreaField from '../Form/TextAreaField.jsx'

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({ content: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Message cannot be empty'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const clearForm = () => {
    setData({ content: '' })
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      setData({ content: '' })
      return
    }
    onSubmit(data)
    clearForm()
  }

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          label="Message"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Publish</button>
        </div>
      </form>
    </div>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm
