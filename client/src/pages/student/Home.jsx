import React from 'react'
import Heero from '../../components/student/Heero.jsx'
import Companies from '../../components/student/Companies.jsx'
import CoursesSection from '../../components/student/CoursesSection.jsx'
import Testimonials from '../../components/student/Testimonials.jsx'
import CalToAction from '../../components/student/CalToAction.jsx'
import Footer from '../../components/student/Footer.jsx'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Heero/>
      <Companies/>
      <CoursesSection/>
      <Testimonials/>
      <CalToAction/>
      <Footer/>
    </div>
  )
}

export default Home