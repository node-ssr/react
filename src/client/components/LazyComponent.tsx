import React, { Component, createElement, ReactNode } from 'react'

export default async function LazyComponent(
  callback: () => Promise<{ default: ReactNode }>
) {
  const { default: Element } = await callback()

  return class LazyComponent extends Component {

    public state = {
      Element: null
    }

    public async componentDidMount() : Promise<void> {
      const { state } = this

      if (!state.Element) {
        this.setState({ Element })
      }
    }

    public render() : ReactNode {
      const { state, props } = this
      if (state.Element)
        return createElement(state.Element, props)
      return <div>Loading page...</div>
    }
  }
}
