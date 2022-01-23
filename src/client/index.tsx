import React, { StrictMode } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

function isCompatible(item: any) : boolean {
  // In real life you most likely have more complex rules here
  return ['Chromium', 'Google Chrome', 'NewBrowser'].includes(item.brand)
}

if (navigator.userAgentData.brands.some(isCompatible)) {
  // browser reports as compatible

  hydrate(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('root'),
    function () {
      console.log('React created...')
    }
  )
}
