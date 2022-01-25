import React from 'react'
import type { RouteObject } from 'react-router-dom'

import Layout from './layouts/Layout'

import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import NoMatch from './pages/NoMatch'

type RouteProps = {
  test?: () => Promise<any>
  children?: Array<RouteProps & RouteObject>
}

export const routes: Array<RouteProps & RouteObject> = [
  {
    path: '/',
    element: <Layout />,
    test() {
      return new Promise(resolve => resolve('ok'))
    },
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '*',
        element: <NoMatch />
      }
    ]
  }
]
