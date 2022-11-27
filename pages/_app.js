import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { motion, AnimatePresence } from 'framer-motion'
import { RecipesContextProvider } from '../context/RecipesContext'

function MyApp({ Component, pageProps, router }) {
  return <AnimatePresence>
    <RecipesContextProvider>
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
    </RecipesContextProvider>
  </AnimatePresence>
  
}

export default MyApp
