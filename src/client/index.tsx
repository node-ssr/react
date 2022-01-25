import React, { StrictMode } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

function isCompatible(item: { brand: string }) : boolean {
  // In real life you most likely have more complex rules here
  return ['Chromium', 'Google Chrome', 'NewBrowser'].includes(item.brand)
}

function hydrated() {
  console.log('React hydrated...')
}

(function () {
  if (!navigator.userAgentData.brands.some(isCompatible))
    throw new Error('Navigator is not supported with app')

  // browser reports as compatible

  const rootElement = document.getElementById('root')
  if (rootElement == null)
    throw new Error(`Element id 'root' not found`)

  hydrate(
    <StrictMode>
      <BrowserRouter>
        <App url={window.location.pathname}/>
      </BrowserRouter>
    </StrictMode>,
    rootElement,
    hydrated
  )
})()
