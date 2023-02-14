import React from 'react'
import { useRouter } from 'next/router'
import { getCsrfToken } from 'next-auth/react'
import VerifyEmail from '../../../components/auth/VerifyEmail'

const VerifyEmailPage = ({ csrfToken }) => {
    const router = useRouter()
    const { emailVerificationToken } = router.query
    return (
        <div>
            <VerifyEmail 
            csrfToken={csrfToken} 
            emailVerificationToken={emailVerificationToken}
            />
        </div>
    )
}

export default VerifyEmailPage

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }