import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number > 1) {
      return `${length} people online`
    }
    if (number === 1) {
      return `${length} person online`
    }
    return 'No people online'
  }

  const badgeClass = `badge ${length > 0 ? 'bg-primary' : 'bg-danger'}`
  return (
    <h2>
      <span className={badgeClass}>{renderPhrase(length)}</span>
    </h2>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number
}

export default SearchStatus
