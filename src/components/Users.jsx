import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import api from '../api'
import GroupList from './GroupList'
import SearchStatus from './SearchStatus'
import UsersTable from './UsersTable'
import Pagination from './Pagination'
import paginate from '../utils/paginate'

const Users = ({ users, ...rest }) => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf(undefined)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(selectedProf) === JSON.stringify(user.profession)
      )
    : users
  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

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
          <UsersTable
            users={userCrop}
            currentSort={sortBy}
            onSort={handleSort}
            {...rest}
          />
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
