import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { MainContextProvider } from '../contexts/MainContext'


function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }, 
  router
 }) {
  return (
    <AnimatePresence>
      <SessionProvider session={session}>
        <MainContextProvider>
          <Layout>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 1,
                ease: "easeInOut"
              }}
            key={router.route}
            >
              <Component {...pageProps} />
              <Analytics />
            </motion.div >
          </Layout>
        </MainContextProvider>
      </SessionProvider>
    </AnimatePresence>
  )
  
}

export default MyApp
