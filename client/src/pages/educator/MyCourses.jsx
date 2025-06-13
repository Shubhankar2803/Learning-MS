import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)

  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(
        backendUrl + '/api/educator/courses',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      data.success && setCourses(data.courses)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-2">
      <div className="w-full max-w-5xl">
        <h2 className="pb-6 text-2xl font-extrabold text-teal-700 tracking-tight">My Courses</h2>
        <div className="flex flex-col items-center overflow-hidden rounded-2xl bg-white border-2 border-teal-100 shadow-xl">
          <table className="w-full">
            <thead className="bg-gray-50 text-teal-700 border-b border-teal-100 text-sm text-left">
              <tr>
                <th className="px-4 py-4 font-semibold truncate">Course</th>
                <th className="px-4 py-4 font-semibold truncate">Earnings</th>
                <th className="px-4 py-4 font-semibold truncate">Students</th>
                <th className="px-4 py-4 font-semibold truncate">Published On</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-100 hover:bg-teal-50 transition group"
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-4 flex items-center space-x-4 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="Course"
                      className="w-14 h-14 rounded-lg shadow border border-teal-100 object-cover"
                    />
                    <span className="truncate font-semibold text-teal-800 group-hover:text-teal-600 transition hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-teal-700">
                    {currency}{' '}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2 font-medium text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
                      {course.enrolledStudents.length}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400 text-lg">
                    You have not created any courses yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default MyCourses