import React from "react"
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="relative pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex justify-end items-top mb-6">
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Recipes App by{" "}
                <a
                  href="https://www.maryoctav.com/" target="_blank"
                  className="text-blueGray-500 hover:text-blueGray-800"
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
