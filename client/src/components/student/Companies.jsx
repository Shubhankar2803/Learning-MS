import React from 'react'
import { assets } from '../../assets/assets.js'
import { motion } from 'framer-motion'

const Companies = () => {
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -10, 0],
      x: [0, 5, 0],
      rotate: [0, 1, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.3
      }
    })
  }

  return (
    <motion.div 
      className='pt-16'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p 
        className='text-base text-gray-500 text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Trusted by learners from
      </motion.p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
        <motion.img 
          src={assets.microsoft_logo} 
          alt="Microsoft" 
          className='w-20 md:w-28'
          custom={0}
          variants={floatingVariants}
          animate="animate"
        />
        <motion.img 
          src={assets.walmart_logo} 
          alt="Walmart" 
          className='w-20 md:w-28'
          custom={1}
          variants={floatingVariants}
          animate="animate"
        />
        <motion.img 
          src={assets.accenture_logo} 
          alt="Accenture" 
          className='w-20 md:w-28'
          custom={2}
          variants={floatingVariants}
          animate="animate"
        />
        <motion.img 
          src={assets.adobe_logo} 
          alt="Adobe" 
          className='w-20 md:w-28'
          custom={3}
          variants={floatingVariants}
          animate="animate"
        />
        <motion.img 
          src={assets.paypal_logo} 
          alt="Paypal" 
          className='w-20 md:w-28'
          custom={4}
          variants={floatingVariants}
          animate="animate"
        />
      </div>
    </motion.div>
  )
}

export default Companies