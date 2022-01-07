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
  renderApp()
} else {
  console.log('[faiz:] === logseq-plugin-milestone loaded')
  logseq.ready(() => {
    console.log('[faiz:] === logseq-plugin-milestone ready')
    logseq.Editor.registerSlashCommand('milestone', async () => {
      const block = await logseq.Editor.getCurrentBlock()
      if (!block?.uuid) return

      logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${block.uuid}}}`)
    })

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
        template: ReactDOMServer.renderToStaticMarkup(<App />),
      })

    })

  })
}

function renderApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
