import PropTypes from 'prop-types'
import Quality from './Quality.jsx'
import { useSelector } from 'react-redux'
import {
  getQualitiesById,
  getQualitiesLoadingStatus
} from '../../../store/qualities.js'

const QualitiesList = ({ qualities }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus())
  if (isLoading) {
    return 'Loading...'
  }
  const qualitiesList = useSelector(getQualitiesById(qualities))
  return qualitiesList.map((quality) => (
    <Quality key={quality._id} {...quality} />
  ))
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
