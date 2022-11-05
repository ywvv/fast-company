import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookmark from '../common/Bookmark'
import Qualities from './Qualities'
import Table from '../common/Table'

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Name',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Qualities',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Profession' },
    completedMeetings: { path: 'completedMeetings', name: 'Meet, times' },
    rate: { path: 'rate', name: 'Rating' },
    bookmark: {
      path: 'bookmark',
      name: 'Favorites',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UsersTable