import React from "react"
import Link from 'next/link'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Footer() {
  return (
    <>
      <footer className="relative pt-3 pb-3 bg-gray-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center px-10 text-white w-full">
            <div className="w-full p-3 flex gap-12 justify-center">
              <TwitterIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
              <FacebookIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
              <LinkedInIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
              <InstagramIcon fontSize='small' className='cursor-pointer text-gray-400 hover:text-white' />
            </div>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm font-semibold">
                Copyright © {new Date().getFullYear()} Recipes App by{" "}
                <a
                  href="https://www.maryoctav.com/" target="_blank" rel="noreferrer"
                  className=""
                >
                  MaryOctav Ltd
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
