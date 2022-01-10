import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import moment, { Moment } from 'moment'

const getDateFromText = (text: string): Moment => {
  // return /\[\[(.+?)\]\]/g.exec(text)
}

export const getMilestones = (content: BlockEntity) => {
  const milestones = content?.children
          ?.find(item => (item as BlockEntity )?.content === 'milestones')
  return (milestones as BlockEntity)?.children?.map(milestone => {
    const content = (milestone as BlockEntity)?.content
    return {
      content,
      date: getDateFromText(content),
    }
  })
}