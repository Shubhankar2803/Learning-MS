import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyEnrollments = () => {

  const {enrolledCourses,calculateCourseDuration,navigate,userData,fetchenrolled,backendUrl,getToken,calculateNoOflectures}=useContext(AppContext)

  const [progress,setProgress]=useState([])

  const courseProgress=async()=>{
    try {
      const token =await getToken()
      const tempProgressArray=await Promise.all(
        enrolledCourses.map(async(course)=>{
          const {data} =await axios.post(backendUrl+'/api/user/get-course-progress',{courseId:course._id},
            {headers:{Authorization:`Bearer ${token}`}})
            let totalLectures=calculateNoOflectures(course);
      const lectureCompleted=data.progressData?data.progressData.lectureCompleted.length:0;
      return {totalLectures,lectureCompleted}
        })
      )

      setProgress(tempProgressArray)
    } catch (error) {
      toast.error("idhr")
      console.log(error.message)
    }
  }

  useEffect(()=>{
   if(userData){
    fetchenrolled()
   }
  },[userData])

  useEffect(()=>{
    if(enrolledCourses.length>0){
     courseProgress()
    }
   },[enrolledCourses])

  return (
    <>
    
    <div className='md:px-36 px-8 pt-10'>
       <h1 className='text-2xl font-semibold'>MyEnrollments</h1>
       <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className='text-gray-900 border-b border-gray-800/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-500 '>
          {enrolledCourses.map((course,index)=>(
            <tr key={index} className='border-b border-gray-500'>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
              <div className='flex-1'>
                <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                <Line strokeWidth={2} percent={progress[index]?(progress[index].lectureCompleted*100) /progress[index].totalLectures :0 } className='bg-gray-300 rounded-full' />
              </div>
              </td>
              <td className='px-4 py-3 mac-sm:hidden'>
                {calculateCourseDuration(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                
                {progress[index]&&`${progress[index].lectureCompleted}/ ${progress[index].totalLectures}`} <span>lectures</span>
              </td>
              <td className='px-4 py-4 max-sm:text-right'>
                <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white' onClick={()=>navigate('/player/'+course._id)}>
                  {progress[index]&&progress[index].lectureCompleted/progress[index].totalLectures===1?'Completed':'Ongoing' }
                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
    
    </div> 
    <Footer/>
    </>
  )
}

export default MyEnrollments