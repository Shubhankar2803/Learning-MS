import React from 'react'
import { assets } from '../../assets/assets.js'
import SearchBar from './SearchBar.jsx'
import { motion, useScroll, useTransform } from 'framer-motion'

const Heero = () => {
    // Stronger parallax effect based on scroll position
    const { scrollY } = useScroll()
    // Increase the movement range for a more pronounced effect
    const headingY = useTransform(scrollY, [0, 300], [0, 90])
    const sketchY = useTransform(scrollY, [0, 300], [0, 180])
    const paraY = useTransform(scrollY, [0, 300], [0, 50])

    return (
        <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-transparent relative overflow-hidden'>
            <motion.h1
                className='md:text-home-heading-large text-home-heading-small font-bold text-teal-800 max-w-3xl mx-auto relative'
                style={{ y: headingY }}
            >
                Empower your future with the courses designed to 
                <span className='text-teal-600'> fit your choice. </span>
                <motion.img
                    src={assets.sketch}
                    alt="sketch"
                    className='md:block hidden absolute -bottom-7 right-0'
                    style={{ y: sketchY }}
                />
            </motion.h1>
          
            <div>
                <SearchBar />
            </div>
        </div>
    )
}

export default Heero