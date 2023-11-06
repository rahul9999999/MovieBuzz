import React from 'react'
import "./contentWrapper.scss"

const contentWrapper = ({children}) => {
  return (
    <div className="contentWrapper">{children}</div>
  )
}

export default contentWrapper
