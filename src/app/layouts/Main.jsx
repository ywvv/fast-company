import useMockData from '../utils/mockData.js'

const Main = () => {
  const { error, initialize, progress, status } = useMockData()

  const handleClick = () => {
    initialize()
  }
  return (
    <div className="container">
      <h1>Main</h1>
      <h3>Init data in FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        Init
      </button>
    </div>
  )
}

export default Main
