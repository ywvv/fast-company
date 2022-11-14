import { useEffect, useState } from 'react'
import _ from 'lodash'
import paginate from '../../../utils/paginate.js'
import SearchStatus from '../../ui/SearchStatus.jsx'
import UsersTable from '../../ui/UsersTable.jsx'
import GroupList from '../../common/GroupList.jsx'
import Pagination from '../../common/Pagination.jsx'
import { useUser } from '../../../hooks/useUsers.jsx'
import { useProfessions } from '../../../hooks/useProfessions.jsx'
import { useAuth } from '../../../hooks/useAuth.jsx'

const UsersListPage = () => {
  const [selectedProf, setSelectedProf] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8
  const { users } = useUser()
  const { currentUser } = useAuth()
  const { isLoading: professionsLoading, professions } = useProfessions()

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

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
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data
      return filteredUsers.filter((u) => u._id !== currentUser._id)
    }

    const filteredUsers = filterUsers(users)
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf(undefined)
    }

    return (
      <div className="d-flex container">
        {professions && !professionsLoading && (
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
