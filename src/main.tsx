import "@logseq/libs"
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import './index.css'
import App from './App'

const isDevelopment = import.meta.env.DEV
const PREFIX = "milestone"
const PLUGIN_ID = "logseq-plugin-milestone"

if (isDevelopment) {
  renderApp('61daca0c-a239-4020-9772-52ca93f6dac9')
} else {
  console.log('[faiz:] === logseq-plugin-milestone loaded')
  logseq.ready(() => {
    console.log('[faiz:] === logseq-plugin-milestone ready')
    logseq.Editor.registerSlashCommand('milestone', async () => {
      const block = await logseq.Editor.getCurrentBlock()
      if (!block?.uuid) return

      logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${block.uuid}}}`)
    })
    // logseq.provideStyle(`@import url("https://cdn.jsdelivr.net/npm/antd@4.18.2/dist/antd.min.css");`)

    logseq.setMainUIInlineStyle({
      position: 'fixed',
      zIndex: 11,
    })
    logseq.provideModel({
      show(e) {
        console.log(console.log('[faiz:] === uuid', e))
        renderApp(e?.dataset?.faizUuid)
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
      console.log('[faiz:] === onMacroRendererSlotted', slot, payload)
      if (!/^milestone/.test(payload?.arguments?.[0])) return 'parse error'

      logseq.provideStyle(`#${slot}, #${PREFIX}-${slot}-${PLUGIN_ID} {display: flex;} #${PREFIX}-${slot}-${PLUGIN_ID} {flex: 1;}`)

      const blockContent = await logseq.Editor.getBlock(payload.uuid, { includeChildren: true })
      console.log('[faiz:] === blockContent', blockContent)

      logseq.provideUI({
        key: 'milestone',
        slot,
        reset: true,
        // template: ReactDOMServer.renderToStaticMarkup(<App />),
        template: `<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${payload?.uuid}">show calender view1</a>`,
      })

    })

  })
}

function renderApp(uuid: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App uuid={uuid} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
