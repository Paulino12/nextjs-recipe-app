import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ButtonField from './forms/ButtonField'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Link as LinkScroll } from "react-scroll"

import { getSession } from 'next-auth/react'

// context
import { MainContext } from '../contexts/MainContext'

const Hero = () => {

  // initiate context
  const { inSession, setInSession } = useContext(MainContext)

  useEffect(() => {
    const access = async () => {
      const session = await getSession()
      if(session){
        setInSession(true)
      }
    }
    access()
    // Line below removes useeffect warning about adding dependency
    // eslint-disable-next-line
  }, [])

  return (
      <section id='hero' 
      className='flex content-center items-center justify-center min-h-screen py-20'
      style={{
        backgroundImage: 'url("/assets/images/homeBg2.jpg")',
        backgroundRepeat: "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}      
      >
        {/* <Image src="/assets/images/heroBanner.png" layout='fill' objectFit='cover' priority={true} alt="heroBanner" /> */}
        <span id="blackOverlay" className="w-full h-full absolute opacity-60 bg-black" ></span>
        <div className="w-full flex items-center text-center z-10 relative">
          <div className='w-full px-5 md:p-0'>
              <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }}>
                <p 
                className="my-4 text-xl md:text-3xl text-gray-200 italic">
                    Welcome to your food recipetheque...
                    {/* {!inSession ? "£1.95/mo" : "In session"} */}
                </p>
                <h1 className="text-gray-200 font-semibold text-3xl md:text-7xl mb-16">
                  {
                    !inSession ? "Professionally Made Easy Recipes" : "Start cooking and Enjoy!"
                  }
                    
                </h1>
              </motion.div>
              <motion.div
                animate={{  y: -30 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeOut",
                }}
              >
                <LinkScroll
                  activeClass='active'
                  to="recipes"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <ButtonField 
                  btnText={<ArrowDownwardIcon fontSize='large' />} 
                  className="rounded-full py-3" />
                </LinkScroll>
              </motion.div>
          </div>
        </div>
      </section>
    
  )
}

export default Hero