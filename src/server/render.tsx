import React, { StrictMode } from 'react'

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from '../client/App'

export default function render(context: { url: string }) {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.

  return new Promise((resolve, reject) => {
    const html = renderToString(
      <StrictMode>
        <StaticRouter
          location={context.url}
        >
          <App {...context}/>
        </StaticRouter>
      </StrictMode>
    )

    // the Promise should resolve to the app instance so it can be rendered
    resolve(html)
  })
}
