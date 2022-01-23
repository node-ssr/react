import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ThemeContext, TThemeContext, themes } from './contexts/ThemeContext'
import ThemeTogglerButton from './components/ThemeTogglerButton'

import LazyComponent from './components/LazyComponent'
import ThemedButton from './components/ThemedButton'

const Layout = LazyComponent(() => import(
  /* webpackChunkName: "layouts/Layout" */
  './layouts/Layout'
))

const Home = LazyComponent(() => import(
  /* webpackChunkName: "pages/Home" */
  './pages/Home'
))

const About = LazyComponent(() => import(
  /* webpackChunkName: "pages/About" */
  './pages/About'
))

const Dashboard = LazyComponent(() => import(
  /* webpackChunkName: "pages/Dashboard" */
  './pages/Dashboard'
))

const NoMatch = LazyComponent(() => import(
  /* webpackChunkName: "pages/NoMatch" */
  './pages/NoMatch'
))

type Props = {

}

export default class App extends Component<Props, TThemeContext> {

  constructor(props: Props) {
    super(props)

    this.toggleTheme = this.toggleTheme.bind(this)

    // L'état local contient aussi la fonction de mise à jour donc elle va
    // être passée au fournisseur de contexte
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    }
  }

  toggleTheme() {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }))
  }

  render() {
    // Le bouton ThemedButton à l'intérieur du ThemeProvider
    // utilise le thème de l’état local tandis que celui à l'extérieur
    // utilise le thème dark par défaut
    return (
      <ThemeContext.Provider value={this.state}>
        <h1>Server Rendering</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <ThemeTogglerButton />
        <ThemedButton>
          ThemedButton
        </ThemedButton>

        {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </ThemeContext.Provider>
    )
  }
}
