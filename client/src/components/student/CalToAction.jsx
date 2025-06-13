import React from 'react'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 18,
      when: 'beforeChildren',
      staggerChildren: 0.18,
      duration: 0.9,
    },
  },
  exit: { opacity: 0, y: -60, transition: { duration: 0.5, ease: 'easeIn' } },
}

const childVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.4 } },
}

const CalToAction = () => {
  return (
    <motion.section
      className="w-full flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-lg px-2 py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        className="w-full max-w-4xl flex flex-col items-center gap-8"
        variants={childVariants}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-teal-700 text-center tracking-tight"
          variants={childVariants}
        >
          Unlock Your Learning Journey
        </motion.h1>
        <motion.p
          className="text-gray-600 md:text-lg text-center max-w-2xl"
          variants={childVariants}
        >
          Access high-quality courses, expert instructors, and interactive resources—anytime, anywhere. Empower your growth with our modern Learning Management System.
        </motion.p>
        <motion.button
          className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
          variants={childVariants}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(20,184,166,0.18)' }}
          whileTap={{ scale: 0.96 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default CalToAction