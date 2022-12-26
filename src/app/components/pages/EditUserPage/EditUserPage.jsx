import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from '../../../utils/validator.js'
import TextField from '../../common/Form/TextField.jsx'
import SelectField from '../../common/Form/SelectField.jsx'
import RadioField from '../../common/Form/RadioField.jsx'
import MultiSelectField from '../../common/Form/MultiSelectField.jsx'
import BackHistoryButton from '../../common/BackHistoryButton.jsx'
import { useAuth } from '../../../hooks/useAuth.jsx'
import { useProfessions } from '../../../hooks/useProfessions.jsx'
import { useSelector } from 'react-redux'
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities.js'

const EditUserPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const [errors, setErrors] = useState({})
  const { currentUser, updateUserData } = useAuth()
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const { professions, isLoading: professionsLoading } = useProfessions()
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    await updateUserData({
      ...data,
      qualities: data.qualities.map((quality) => quality.value)
    })

    navigate(-1)
  }

  const getQualitiesListByIds = (qualitiesIds) => {
    const qualitiesArray = []
    for (const qualityId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualityId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }

  const transformData = (data) => {
    return getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }))
  }

  useEffect(() => {
    if (!qualitiesLoading && !professionsLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      })
    }
  }, [qualitiesLoading, professionsLoading, currentUser, data])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email is required'
      },
      isEmail: {
        message: 'Email entered incorrectly'
      }
    },
    name: {
      isRequired: {
        message: 'Enter your name'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  return (
    <div className="container">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <>
              <h3 className="mb-4">Edit</h3>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Choose your profession"
                  defaultOption="Choose..."
                  options={professionsList}
                  name="profession"
                  onChange={handleChange}
                  value={data.profession}
                  error={errors.profession}
                />
                <RadioField
                  options={[
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' },
                    { name: 'Other', value: 'other' }
                  ]}
                  value={data.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Choose your gender"
                />
                <MultiSelectField
                  defaultValue={data.qualities}
                  options={qualitiesList}
                  onChange={handleChange}
                  name="qualities"
                  label="Choose your qualities"
                />
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto"
                >
                  Save
                </button>
              </form>
            </>
          ) : (
            <div className="container">
              <h2>Loading...</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
