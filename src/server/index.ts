import { join, resolve } from 'path'
import { readFile } from 'fs/promises'

import express from 'express'

import render from './render'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

if (isProduction) {
  app.use(require('compression')())
} else {
  // import les module webpack
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')

  // import la config client webpack
  const webpackClientConfig = require('../../scripts/webpack.client.js')(null, {
    mode: process.env.NODE_ENV
  })

  // récupère le compiler webpack pour la config définit
  const webpackClientCompiler = webpack(webpackClientConfig)

  // config le module webpack-dev-middleware
  const webpackClientMiddlewareConfig = {
    // Instructs the module to enable or disable the server-side rendering mode.
    serverSideRender: true,

    // Instructs the module to write files to the configured location on disk as specified in your webpack configuration.
    writeToDisk: true,

    // The public path that the middleware is bound to.
    publicPath: '/assets'
  }

  // Créer le middleware webpack
  const webpackMiddleware = webpackDevMiddleware(
    webpackClientCompiler,
    webpackClientMiddlewareConfig
  )

  // ajout le middleware à express
  app.use(webpackMiddleware)
}

app.use(
  '/assets',
  express.static(join(__dirname, '..', 'client/assets'))
)

app.use(
  express.static(join(__dirname, '../..', 'public'))
)

app.get('*', async function (req, res) {
  const template = await readFile(
    resolve(__dirname, '..', 'client/index.html'),
    'utf8'
  )

  const reactApp = render(req.originalUrl)

  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${reactApp}</div>`
  )
  
  return res
    .set('Content-Type', 'text/html')
    .status(200)
    .end(html)
})

app.listen(8000, function () {
  console.log('Server started...')
})
