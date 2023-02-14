import React from 'react'
import { getCsrfToken } from "next-auth/react"
import Signup from '../../components/auth/Signup'


function signup({ csrfToken }) {
    return (
        <div 
         className='min-h-screen relative bg-stone-100'>
            <Signup csrfToken={csrfToken} />
        </div>
    )
}

export default signup

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }