import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import HomeIcon from '@mui/icons-material/Home'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
// Import react scroll
import { Link as LinkScroll } from "react-scroll"
import Home from '@mui/icons-material/Home'

const Navbar = () => {
  const router = useRouter()
  const [menuToggle, setMenuToggle] = useState(true)
  const [activeLink, setActiveLink] = useState(null)
  const [activeScroll, setActiveScroll] = useState(false)

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //       setActiveScroll(window.scrollY > 20)
  //   })
  // }, [])

  useEffect(() => {
    if(router.asPath === '/'){
        setActiveLink('hero')
    }else if(router.asPath === '/#recipes'){
        setActiveLink('recipes')
    }else{
      setActiveLink('')
    }
}, [router])

  return (
    <>
      <nav className={`fixed bg-gray-700 px-10 text-white w-full z-20`}>
        <div className="inset-y-0 left-0 flex items-center sm:hidden">
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
          {/* <div className='hidden sm:flex sm:flex-row sm:items-baseline'>
            <Link href="https://www.maryoctav.com" target="_blank">Octav</Link>
          </div> */}
          <div className='flex sm:flex-row md:space-x-4'>
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
          </div>
          <div className='space-x-4 flex items-center justify-end'>
            <TwitterIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            <FacebookIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            <LinkedInIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            <InstagramIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
          </div>
        </div>

        <div className={`${menuToggle ? 'hidden':''} sm:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <LinkScroll 
            onClick={() => {
                router.push('/#hero')
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
          </div>
          <div className='space-x-4 flex items-center justify-center pb-3'>
            <TwitterIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            <FacebookIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            <LinkedInIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            <InstagramIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar