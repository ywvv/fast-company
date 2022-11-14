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
    return 'Loading...'
  }
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
