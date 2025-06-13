import React, { useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'
import { motion, useAnimation, useInView } from 'framer-motion'

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start('show')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="bg-gray-50 rounded-xl py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-teal-700">Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-5'>
        Discover our top rated courses across various categories from coding and design <br />
        to business and wellness. Our courses are crafted to deliver results.
      </p>
      <motion.div
        ref={ref}
        className='grid grid-cols-auto px-4 md:px-0 md:py-10 mx-16 gap-4'
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {allCourses.slice(0, 4).map((course, index) => (
          <motion.div key={index} variants={cardVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
      <Link
        to={'/course-list'}
        onClick={() => scrollTo(0, 0)}
        className='text-teal-700 my-8 px-10 py-3 rounded hover:bg-teal-50 transition'
      >
        Show all courses
      </Link>
    </div>
  )
}

export default CoursesSection