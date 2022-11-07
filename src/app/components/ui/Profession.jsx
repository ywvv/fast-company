import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfessions.jsx'

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions()
  const profession = getProfession(id)

  if (!isLoading) {
    return <p>{profession.name}</p>
  } else {
    return (
      <div className="container">
        <h6>Loading...</h6>
      </div>
    )
  }
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
