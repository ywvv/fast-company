import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import api from '../api'
import User from './User'
import GroupList from './GroupList'
import SearchStatus from './SearchStatus'
import Pagination from './Pagination'
import paginate from '../utils/paginate'

const Users = ({ users, ...rest }) => {
  const pageSize = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = pageIndex => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = item => {
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf(undefined)
  }

  const filteredUsers = selectedProf
    ? users.filter(
        user => JSON.stringify(selectedProf) === JSON.stringify(user.profession)
      )
    : users
  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Clear
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array
}

export default Users
