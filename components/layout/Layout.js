import React from 'react'
import Head from 'next/head'
import Navbar from './nav/Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout

