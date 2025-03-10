import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'
 
const CoursesSection = () => {
  const {allCourses}=useContext(AppContext)
  return (
    <div>
      <h2>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mb-5'>discover our top rated course across various categories from coding and design <br /> to business and wellness,our courses are crafted to deliver results.</p>
      <div className='grid grid-cols-auto px-4 md:px-0 md:py-10 mx-16 gap-4'>
        {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course}/>)}</div>
      <Link to={'/course-list'} onClick={()=>scrollTo(0,0)} className='text-graye-500 border border-gray-500/30 my-8 px-10 py-3 rounded'>Show all courses</Link>
    </div>
  )
}

export default CoursesSection