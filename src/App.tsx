import { useState } from 'react'
import Calendar from 'antd/lib/calendar'
import 'antd/es/calendar/style/css.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="faiz" style={{width: import.meta.env.DEV ? '770px' : '100%'}}>
      <Calendar fullscreen />
    </div>
  )
}

export default App
