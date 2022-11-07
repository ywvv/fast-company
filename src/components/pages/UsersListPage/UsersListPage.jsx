import { useEffect, useState } from 'react'
import _ from 'lodash'
import paginate from '../../../utils/paginate'
import api from '../../../api'
import SearchStatus from '../../ui/SearchStatus'
import UsersTable from '../../ui/UsersTable'
import GroupList from '../../common/GroupList'
import Pagination from '../../common/Pagination'
import { useUser } from '../../../hooks/useUsers'

const UsersListPage = () => {
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8
  const { users } = useUser()

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId))
    console.log(userId)
  }

  const handleToggleBookmark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    })
    // setUsers(newArray)
    console.log(newArray)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('')
    setSelectedProf(item)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined)
    setSearchQuery(target.value)
  }

  if (users.length > 0) {
    const filteredUsers = searchQuery
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf(undefined)
    }

    return (
      <div className="d-flex container">
        {professions && (
          <div className="d-flex flex-column me-3">
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
        <div className="d-flex flex-column w-100">
          <SearchStatus length={count} />
          <input
            className="form-control"
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UsersListPage
