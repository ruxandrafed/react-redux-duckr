import React from 'react'
import { color } from './styles.css'

const Main = React.createClass({
  render () {
    return (
      <p className={color}>{'Hello World! Hello!'}</p>
    )
  },
})

export default Main
