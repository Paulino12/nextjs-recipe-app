import React from 'react'
import { motion } from 'framer-motion'

const ImageSkeleton = ({ height }) => {
    return (
        <motion.div 
        initial={{ zIndex: 10 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            duration: 2,
            ease: "easeInOut"
        }}
        className='absolute top-0 right-0 p-1 w-full h-full bg-white cursor-pointer flex flex-col space-y-1'>
            <div className={`bg-gray-200 w-full ${height} rounded-md animate-pulse`}></div>
        </motion.div>
    )
}

export default ImageSkeleton
