import React, { Component, createElement, ReactNode } from 'react'

export default function LazyComponent(
  callback: () => Promise<{ default: ReactNode }>
) {
  return class extends Component {

    public state = {
      Component: null
    }

    public async componentDidMount() : Promise<void> {
      const { state } = this

      if (!state.Component) {
        const { default: Component } = await callback()
        this.setState({ Component })
      }
    }

    public render() : ReactNode {
      const { state, props } = this
      if (state.Component)
        return createElement(state.Component, props)
      return <div>Loading page...</div>
    }
  }
}
