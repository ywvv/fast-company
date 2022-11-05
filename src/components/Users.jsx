import api from '../api'
import { useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const renderPhrase = number => {
    if (number > 1) {
      return `${users.length} people online`
    }
    if (number === 1) {
      return `${users.length} person online`
    }
    return 'No people online'
  }

  const badgeClass = `badge ${users.length > 0 ? 'bg-primary' : 'bg-danger'}`

  return (
    <>
      <h2>
        <span className={badgeClass}>{renderPhrase(users.length)}</span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Qualities</th>
              <th scope="col">Profession</th>
              <th scope="col">Meet, times</th>
              <th scope="col">Rating</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map(item => (
                    <span
                      className={`badge me-1 bg-${item.color}`}
                      key={item._id}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} / 5</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
