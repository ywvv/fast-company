import api from './api'
import Users from './components/Users'

const App = () => {
  console.log(api.users.fetchAll())
  return <Users />
}

export default App
