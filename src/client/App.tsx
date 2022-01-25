import React from 'react'
import { useRoutes } from 'react-router-dom'

import { routes } from './router'

export default function App(props: { url: string }) {
  const element = useRoutes(routes)

  return (
    <>
      <h1>Server Rendering</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      {element}
    </>
  )
}
