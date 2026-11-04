import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    axios
      .get('/api/health')
      .then((res) => {
        console.log(res)
        setMessage(res.data.message)
      })
      .catch((err) => {
        console.log(err)
        setMessage('Failed to connect to backend')
      })
  })

  return (
    <div>
      <h1>Armsthetic</h1>
      <p>{message}</p>
    </div>
  )
}

export default App
