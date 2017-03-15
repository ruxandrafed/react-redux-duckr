import React, { PropTypes } from 'react'

export default function Duck (props) {
  console.log(props.duck)
  return (
    <div>{props.duck.text}</div>
  )
}