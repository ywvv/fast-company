import PropTypes from 'prop-types'
import Comment from './Comment'

const CommentsList = ({ comments, onRemove }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} onRemove={onRemove} {...comment} />
  ))
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func
}

export default CommentsList
