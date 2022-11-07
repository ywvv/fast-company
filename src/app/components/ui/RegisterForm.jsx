import { useEffect, useState } from 'react'
import validator from '../../utils/validator.js'
import TextField from '../common/Form/TextField.jsx'
import SelectField from '../common/Form/SelectField.jsx'
import RadioField from '../common/Form/RadioField.jsx'
import MultiSelectField from '../common/Form/MultiSelectField.jsx'
import CheckboxField from '../common/Form/CheckboxField.jsx'
import { useQualities } from '../../hooks/useQualities.jsx'
import { useProfessions } from '../../hooks/useProfessions.jsx'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })

  const { qualities } = useQualities()
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const { professions } = useProfessions()
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))

  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email is required'
      },
      isEmail: {
        message: 'Email entered incorrectly'
      }
    },
    password: {
      isRequired: {
        message: 'Password is required'
      },
      isCapitalSymbol: {
        message: 'Password must contain at least one capital letter'
      },
      isContainDigit: {
        message: 'Password must contain at least one number'
      },
      min: {
        message: 'Password must contain at least 8 characters',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'Choose your profession'
      }
    },
    license: {
      isRequired: {
        message:
          'You may not use our service without confirming the license agreement'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return null

    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    }

    console.log(newData)
    // const { profession, qualities } = data
    // console.log({
    //   ...data,
    //   profession: getProfessionById(profession),
    //   qualities: getQualities(qualities)
    // })
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
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Choose your qualities"
      />
      <CheckboxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Confirm <a>license agreement</a>
      </CheckboxField>
      <button
        className="btn btn-primary w-100 mx-auto mb-2"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
