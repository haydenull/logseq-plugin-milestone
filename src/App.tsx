import { useState } from 'react'
import Calendar from 'antd/lib/calendar'
import 'antd/es/calendar/style/css.js'

const App: React.FC<{ uuid: string }> = ({ uuid }) => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full h-full absolute bg-transparent" onClick={() => logseq.hideMainUI()}></div>
      <div className="w-1/3 h-5/6 bg-white absolute top-8 right-4 shadow">
        <Calendar />
      </div>
    </>
  )
}

export default App
