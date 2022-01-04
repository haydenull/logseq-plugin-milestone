import { useState } from 'react'
import { Calendar } from 'antd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Calendar />
    </div>
  )
}

export default App
