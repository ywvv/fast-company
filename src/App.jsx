import api from './api'

const App = () => {
  console.log(api.users.fetchAll())
  return <div></div>
}

export default App
