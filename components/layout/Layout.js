import React from 'react'
import Navbar from './nav/Navbar'

const Layout = ({ children }) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default Layout