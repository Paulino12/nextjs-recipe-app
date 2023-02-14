import React from 'react'
import { getCsrfToken } from "next-auth/react"
import Signin from '../../components/auth/Signin'

function signin({ csrfToken }) {

    return (
        <div className='min-h-screen relative bg-stone-100'>
            <Signin csrfToken={csrfToken} />
        </div>
    )
}

export default signin

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }