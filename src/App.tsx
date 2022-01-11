import { useState, useMemo, useEffect } from 'react'
import Calendar from 'antd/lib/calendar'
import Tooltip from 'antd/lib/tooltip'
import Button from 'antd/lib/button'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import moment, { Moment } from 'moment'
import 'antd/es/calendar/style/css.js'
import 'antd/es/tooltip/style/css.js'
import 'antd/es/button/style/css.js'

import { getBlockContent, getMilestones } from './util'

const App: React.FC<{ uuid: string, forceUpdate: number }> = ({ uuid, forceUpdate }) => {
  const [milestones, setMilestones] = useState<{ content: string, date: Moment }[]>()
  const [isWideMode, setWideMode] = useState(false)

  useEffect(() => {
    getBlockContent(uuid, { includeChildren: true })
      .then(blockContent => {
        const milestones = getMilestones(blockContent)
        setMilestones(milestones)
      })
  }, [uuid, forceUpdate])

  const dateCellRender = (date: Moment) => {
    const curDateMilestones = milestones?.filter((m) => m.date.isSame(date, 'day'))
    return curDateMilestones?.map((m, index) => {
      const isBefore = m.date.isBefore(moment(), 'day')
      return (
        <Tooltip title={m.content} arrowPointAtCenter>
          <div className={`whitespace-nowrap bg-blue-200 rounded-sm mb-1 ${isBefore ? 'opacity-50' : ''}`} key={m.date.valueOf() + index}>
            {m.content}
          </div>
        </Tooltip>
      )
    })
  }

  const switchWideMode = (isWidMode) => {
    setWideMode(isWidMode)
  }

  return (
    <>
      <div className="w-screen h-screen absolute bg-transparent" onClick={() => logseq.hideMainUI()}></div>
      <div className={`${isWideMode ? 'w-2/3' : 'w-1/3'} h-5/6 bg-white absolute top-12 right-4 shadow-lg p-1 overflow-auto rounded transition-all`}>
        <div className="absolute left-4 top-4">
          {
            isWideMode
              ? <Button shape="circle" icon={<ShrinkOutlined />} onClick={() => switchWideMode(false)}></Button>
              : <Button shape="circle" icon={<ArrowsAltOutlined />} onClick={() => switchWideMode(true)}></Button>
          }
        </div>
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </>
  )
}

export default App
