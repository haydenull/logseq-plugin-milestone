import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user'
import moment from 'moment'

export const getMilestones = (content: BlockEntity) => {
  const milestones = content?.children
          ?.find(item => (item as BlockEntity )?.content === 'milestones')
  return (milestones as BlockEntity)?.children?.map(milestone => {
    return {
      content: (milestone as BlockEntity)?.content,
      // date: (milestone as BlockEntity)?.date,
    }
  })
}