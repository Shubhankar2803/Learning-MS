import React, { useContext } from 'react'

import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)
  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0, 0)}
      className="pb-6 overflow-hidden rounded-lg transition-all duration-300 group hover:scale-[1.04] hover:shadow-2xl hover:bg-teal-50"
      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
    >
      <div className="relative">
        <img
          className="w-full transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
          src={course.courseThumbnail}
          alt=""
        />
        {/* Optional: subtle overlay on hover */}
        <div className="absolute inset-0 bg-teal-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold group-hover:text-teal-700 text-teal-800 transition-colors duration-300">
          {course.courseTitle}
        </h3>
        <p className="text-gray-500">{course.educator.name}</p>
        <div className="flex items-center space-x-2">
          <p className="text-teal-700">{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-400">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default CourseCard