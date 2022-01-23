import React, { Component } from 'react'

import { ThemeContext } from '../contexts/ThemeContext'

class ThemedButton extends Component {

  render() {
    const { props, context } = this
    
    return (
      <button
        {...props}
        style={{backgroundColor: context.theme.background}}
      />
    )
  }

}

ThemedButton.contextType = ThemeContext

export default ThemedButton
