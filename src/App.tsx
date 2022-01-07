import { useState } from 'react'
import Calendar from 'antd/lib/calendar'
import 'antd/es/calendar/style/css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="faiz" className="w-full" style={{width: import.meta.env.DEV ? '770px' : '100%', height: '379px'}}>
      <Calendar fullscreen />
    </div>
  )
}

export default App
