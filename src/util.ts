import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import moment, { Moment } from 'moment'

const getDateFromText = (text: string): Moment => {
  const last = text?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0]
  return moment(last?.replaceAll(/^(\[\[)|(\]\])$/g, ''), 'YYYY-MM-DD')
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