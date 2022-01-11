import "@logseq/libs"
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const isDevelopment = import.meta.env.DEV
const PREFIX = "milestone"
const PLUGIN_ID = "logseq-plugin-milestone"
let updateMap = new Map<string, number>()

if (isDevelopment) {
  const uuid = '61daca0c-a239-4020-9772-52ca93f6dac9'
  updateMap.set(uuid, 1)
  renderApp(uuid, updateMap.get(uuid) || 0)
} else {
  console.log('[faiz:] === logseq-plugin-milestone loaded')
  logseq.ready(() => {
    logseq.Editor.registerSlashCommand('milestone', async () => {
      const block = await logseq.Editor.getCurrentBlock()
      if (!block?.uuid) return

      logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${block.uuid}}}`)
    })

    logseq.setMainUIInlineStyle({
      position: 'fixed',
      zIndex: 11,
    })
    logseq.provideModel({
      show(e) {
        const uuid = e?.dataset?.faizUuid
        renderApp(uuid, updateMap.get(uuid) || 0)
        logseq.showMainUI()
      },
    })
    // logseq.on('ui:visible:changed', (e) => {
    //   if (!e.visible) {
    //     // ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    //   }
    // })

    // TODO: performance optimize
    logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
      const old = updateMap.get(payload.uuid)
      updateMap.set(payload.uuid, old ? old + 1 : 1)

      if (!/^milestone/.test(payload?.arguments?.[0])) return 'milestone parse error'

      // logseq.provideStyle(`#${slot}, #${PREFIX}-${slot}-${PLUGIN_ID} {display: flex;} #${PREFIX}-${slot}-${PLUGIN_ID} {flex: 1;}`)

      logseq.provideUI({
        key: 'milestone',
        slot,
        reset: true,
        template: `<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${payload?.uuid}">show calender view</a>`,
      })

    })

  })
}

function renderApp(uuid: string, forceUpdate: number) {
  ReactDOM.render(
    <React.StrictMode>
      <App uuid={uuid} forceUpdate={forceUpdate} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
