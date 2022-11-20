import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { motion, AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return <AnimatePresence>
    <Layout>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      key={router.route}>
        <Component {...pageProps} />
      </motion.div >
    </Layout>
  </AnimatePresence>
  
}

export default MyApp
