import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Home from '@mui/icons-material/Home'

// Import react scroll
import { Link as LinkScroll } from "react-scroll"


// context
import { MainContext } from '../../../contexts/MainContext'
import { Opacity } from '@mui/icons-material'

const Navbar = () => {

  const router = useRouter()
  const { data: session, status } = useSession()

  // Initiate context
  const { 
    subscriptionPlan, setSubscriptionPlan, newFullname
  } = useContext(MainContext)

  const [menuToggle, setMenuToggle] = useState(true)
  const [activeLink, setActiveLink] = useState(null)
  const [loading, setLoading] = useState(true) 

  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(null)


  useEffect(() => {
    if(router.asPath === '/'){
        setActiveLink('hero')
    }else if(router.asPath === '/#recipes'){
        setActiveLink('recipes')
    }else if(router.asPath === '/#contact'){
      setActiveLink('contact')
    }
    else{
      setActiveLink('')
    }
  }, [router])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }  

  useEffect(() => {
    axios.get(`/api/auth/authed-user`)
        .then((response) => {
            setUserName(response.data.name) 
            setIsAdmin(response.data.admin)
            setSubscriptionPlan(response.data.stripeSubscriptionPrice) 
            setLoading(false)
        })
        .catch((error) => { 
            if(error.message){
                setLoading(false)
            }
         })
    // Line below removes useeffect warning about adding dependency
    // eslint-disable-next-line
  }, [router, newFullname])

  return (
      <motion.nav 
      className={`fixed bg-gray-700 px-10 text-white w-full z-20`}>
        <div className="inset-y-0 left-0 flex items-center sm:hidden w-1/4">
          <button type="button" 
          onClick={() => setMenuToggle(!menuToggle)}
          className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer ${!menuToggle ? 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white':''} `} aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>

        <div className='hidden sm:flex sm:flex-row items-center justify-between'>
          <div className='w-full flex flew-row justify-between'>
            <div className='sm:flex sm:flex-row md:space-x-4'>
              <LinkScroll 
              onClick={() => {
                  router.push('/')
                  setActiveLink("hero")
              }}
              activeClass='active'
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              onSetActive={() => {
                  setActiveLink("hero")
              }}
              className={`cursor-pointer
                  ${activeLink === 'hero' ? 'bg-gray-900 text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium' 
                  : 'text-gray-300 hover:text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium'}
                  `}
              >
                <Home /> 
              </LinkScroll>
              <LinkScroll 
              onClick={() => {router.push('/#recipes')}}
              activeClass='active'
              to="recipes"
              spy={true}
              smooth={true}
              duration={500}
              onSetActive={() => {
                  setActiveLink("recipes");
              }}
              className={`cursor-pointer
                  ${activeLink === 'recipes' ? 'bg-gray-900 text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium' 
                  : 'text-gray-300 hover:text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium'}
                  `}
              >
                Recipes
              </LinkScroll>
              <LinkScroll 
              onClick={() => {router.push('/#contact')}}
              activeClass='active'
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              onSetActive={() => {
                  setActiveLink("contact");
              }}
              className={`cursor-pointer
                  ${activeLink === 'contact' ? 'bg-gray-900 text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium' 
                  : 'text-gray-300 hover:text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium'}
                  `}
              >
                Contact
              </LinkScroll>
            </div>
            <div className={`md:space-x-4 flex items-center justify-end ${loading ? 'loading' : 'loaded'}`}>
              {
                !session ? 
                <div className={`flex md:space-x-4`}>
                  <Link 
                  href="/auth/signup"
                  className={`${router.asPath === '/auth/signup' ? 'bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium'}
                  `}  onClick={() => { setMenuToggle(true) }}>
                    Get Started
                  </Link>
                  <Link 
                  href="/auth/signin"
                  className={`${router.asPath === '/auth/signin' ? 'bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium'}
                  `}  onClick={() => setMenuToggle(true)}>
                    Sign In
                  </Link>
                </div>
                :
                <div className="flex space-x-4">
                  <h1 className='flex items-center text-white rounded-md text-xs md:text-sm lg:text-lg font-semibold mr-3 capitalize'>Welcome, {userName}</h1>
                  
                  {
                    subscriptionPlan && 
                    <Link 
                    href="/members/profile"
                    className={`
                    ${router.asPath === '/members/profile' ? 'flex items-center bg-gray-900 text-white px-3 py-1 my-1 rounded-md text-sm font-medium' 
                    : ' text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 my-1 rounded-md text-sm font-medium'}
                    `}
                    >
                      <AccountCircleIcon />
                    </Link>
                  }
                  <Link href="#"  
                  onClick={handleSignOut}
                  className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Sign Out
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 3,
          ease: "easeInOut"
        }}
        className={`${menuToggle ? 'hidden':''} sm:hidden flex flex-col items-start mb-3`} id="mobile-menu">
          <div className="px- pt-2 pb-3 space-y-1 flex flex-col items-start">
            <LinkScroll 
            onClick={() => {
                router.push('/')
                setActiveLink("hero")
                setMenuToggle(!menuToggle)
            }}
            activeClass='active'
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            onSetActive={() => {
                setActiveLink("hero")
            }}
            className={`cursor-pointer
                ${activeLink === 'hero' ? 'bg-gray-900 text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium' 
                : 'text-gray-300 hover:text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium'}
                `}
            >
              <Home />
            </LinkScroll>
            <LinkScroll 
            onClick={() => {
                router.push('/#recipes')
                setActiveLink("recipes")
                setMenuToggle(!menuToggle)
            }}
            activeClass='active'
            to="recipes"
            spy={true}
            smooth={true}
            duration={500}
            onSetActive={() => {
                setActiveLink("recipes")
            }}
            className={`cursor-pointer
                ${activeLink === 'recipes' ? 'bg-gray-900 text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium' 
                : 'text-gray-300 hover:text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium'}
                `}
            >
              Recipes
            </LinkScroll>
            <LinkScroll 
            onClick={() => {
                router.push('/#contact')
                setActiveLink("contact")
                setMenuToggle(!menuToggle)
            }}
            activeClass='active'
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            onSetActive={() => {
                setActiveLink("contact")
            }}
            className={`cursor-pointer
                ${activeLink === 'contact' ? 'bg-gray-900 text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium' 
                : 'text-gray-300 hover:text-white px-3 flex items-center justify-center my-1 py-1 rounded-md text-sm font-medium'}
                `}
            >
              Contact
            </LinkScroll>
          </div>
          <div className='pb-3'>
            {
              !session ? 
              <div>
                <Link 
                href="/auth/signup"
                className={`${router.asPath === '/auth/signup' ? 'bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium'}
                `} onClick={() => { setMenuToggle(true) }}>
                  Get Started
                </Link>
                <Link 
                href="/auth/signin"
                className={`${router.asPath === '/auth/signin' ? 'bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium'}
                `}  onClick={() => setMenuToggle(true)}>
                  Sign In
                </Link>
              </div>
              :
              <div>
                {
                  subscriptionPlan && (
                    <Link 
                    href="/members/profile"
                    className={`
                    ${router.asPath === '/members/profile' ? 'flex items-center bg-gray-900 text-white px-3 py-1 my-1 rounded-md text-sm font-medium' 
                    : ' text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 my-1 rounded-md text-sm font-medium'}
                    `}
                    onClick={() => { setMenuToggle(true) }}
                    >
                      <AccountCircleIcon />
                    </Link>
                  )
                }
                <Link href="#"  
                onClick={handleSignOut}
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign Out
                </Link>
              </div>
            }
          </div>
        </motion.div>
      </motion.nav>
  )
}

export default Navbar