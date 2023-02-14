import React, { useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'
import Profile from '../../components/members/Profile'
import { getCsrfToken } from "next-auth/react"

function ProfilePage({ csrfToken }) {

    useEffect(() => {
        const access = async () => {
            const session = await getSession()
            if(!session) {
                signIn()
            }
        }
        access()  
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line      
    }, [])

    return (
        <div className='min-h-screen relative px-5 pt-14 bg-stone-200'>
            <Profile csrfToken={csrfToken} />
        </div>
    )
}

export default ProfilePage

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }
