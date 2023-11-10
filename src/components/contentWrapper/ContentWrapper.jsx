import React from 'react'
import "./ContentWrapper.scss"

const contentWrapper = ({children}) => {
  return (
    <div className="contentWrapper">{children}</div>
  )
}

export default contentWrapper
