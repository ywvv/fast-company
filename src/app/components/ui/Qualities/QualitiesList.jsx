import PropTypes from 'prop-types'
import Quality from './Quality.jsx'
import { useQualities } from '../../../hooks/useQualities.jsx'

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQualities()

  if (!isLoading) {
    if (qualities) {
      return qualities.map((quality) => <Quality key={quality} id={quality} />)
    }
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
