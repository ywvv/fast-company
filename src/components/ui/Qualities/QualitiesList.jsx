import PropTypes from 'prop-types'
import Quality from './Quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities()

  if (!isLoading) {
    return qualities.map((quality) => (
      <Quality key={quality._id} id={quality} />
    ))
  } else {
    return (
      <div className="container">
        <h6>Loading...</h6>
      </div>
    )
  }
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
