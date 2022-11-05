import PropTypes from 'prop-types'
import User from './User'

const UsersTable = ({ users, onSort, currentSort, ...rest }) => {
  const handleSort = (item) => {
    if (currentSort.iter === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ iter: item, order: 'asc' })
    }
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => handleSort('name')}>
            Name
          </th>
          <th scope="col">Qualities</th>
          <th scope="col" onClick={() => handleSort('profession.name')}>
            Profession
          </th>
          <th scope="col" onClick={() => handleSort('completedMeetings')}>
            Meet, times
          </th>
          <th scope="col" onClick={() => handleSort('rate')}>
            Rating
          </th>
          <th scope="col" onClick={() => handleSort('bookmark')}>
            Favorites
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...rest} {...user} />
        ))}
      </tbody>
    </table>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired
}

export default UsersTable
