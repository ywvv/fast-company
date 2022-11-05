import PropTypes from 'prop-types'
import { useState } from 'react'
import User from './User'
import Pagination from './Pagination'
import paginate from '../utils/paginate'

const Users = ({ users, ...rest }) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = pageIndex => {
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(users, currentPage, pageSize)

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
            {userCrop.map(user => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array
}

export default Users
