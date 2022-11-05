import PropTypes from 'prop-types'
import User from './User'

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Qualities</th>
              <th scope="col">Profession</th>
              <th scope="col">Meet, times</th>
              <th scope="col">Rating</th>
              <th scope="col">Favorites</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array
}

export default Users
