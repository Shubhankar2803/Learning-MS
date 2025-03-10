import React from 'react'
import { Routes,Route, useMatch } from 'react-router-dom'
import Home from "./pages/student/Home.jsx"
import CourseList from "./pages/student/CoursesList.jsx"
import CourseDetails from "./pages/student/CourseDetails.jsx"
import MyEnrollments from "./pages/student/MyEnrollments.jsx"
import Loading from "./components/student/Loading.jsx"
import Player from "./pages/student/Player.jsx"
import Educator from "./pages/educator/Educator.jsx"
import Dashboard from "./pages/educator/Dashboard.jsx"
import AddCourse from "./pages/educator/AddCourse.jsx"
import MyCourse from "./pages/educator/MyCourses.jsx"
import StudentsEnrolled from "./pages/educator/StudentsEnrolled.jsx"
import Navbar from './components/student/Navbar.jsx'
import "quill/dist/quill.snow.css";


const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
       
       {!isEducatorRoute &&<Navbar/> }
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/course-list' element={<CourseList/>}/>
         <Route path='/course-list/:input' element={<CourseList/>}/>
         <Route path='/course/:id' element={<CourseDetails/>}/>
         <Route path='/my-enrollments' element={<MyEnrollments/>}/>
         <Route path='/player/:courseID' element={<Player/>}/>
         <Route path='/loading/:path' element={<Loading/>}/>

         <Route path='/educator' element={<Educator/>}>
         <Route path='/educator' element={<Dashboard/>}/>
         <Route path='add-course' element={<AddCourse/>}/>
         <Route path='my-courses' element={<MyCourse/>}/>
         <Route path='students-enrolled' element={<StudentsEnrolled/>}/>



         </Route>



      </Routes>


    </div>
  )
}

export default App