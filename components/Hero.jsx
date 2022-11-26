import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from './forms/Button'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Link as LinkScroll } from "react-scroll"

const Hero = () => {

  return (
    <div>
      <section id='hero' 
      className='relative flex content-center items-center justify-center min-h-screen py-20'
      style={{
        backgroundImage: 'url("/assets/images/homeBg2.jpg")',
        backgroundRepeat: "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}      
      >
        {/* <Image src="/assets/images/heroBanner.png" layout='fill' objectFit='cover' priority={true} alt="heroBanner" /> */}
        <span id="blackOverlay" className="w-full h-full absolute opacity-60 bg-black" ></span>
        <div className="w-full flex items-center text-center z-10">
        <div className='w-full px-5 md:p-0'>
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }}>
              <p 
              className="my-4 text-xl md:text-3xl text-white italic">
                  Welcome to your recipetheque...
              </p>
              <h1 className="text-white font-semibold text-3xl md:text-7xl mb-16">
                  Professionally Crafted Recipes
              </h1>
            </motion.div>
            <motion.div
              // initial={{ opacity: 0 }}
              animate={{  y: -20 }}
              transition={{
                duration: 0.5,
                yoyo: "Infinity",
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
                <Button 
                btnText={<ArrowDownwardIcon fontSize='large' />} 
                className="rounded-full py-3" />
              </LinkScroll>
            </motion.div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Hero