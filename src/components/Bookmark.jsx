import PropTypes from 'prop-types'

const Bookmark = ({ status, ...rest }) => {
  return (
    <button className="btn btn-sm" {...rest}>
      <i className={`bi bi-heart${status ? '-fill' : ''}`}></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool
}

export default Bookmark
