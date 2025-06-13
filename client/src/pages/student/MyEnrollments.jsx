import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Line } from 'rc-progress'
import Footer from '../../components/student/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchenrolled,
    backendUrl,
    getToken,
    calculateNoOflectures,
  } = useContext(AppContext)

  const [progress, setProgress] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  const courseProgress = async () => {
    try {
      const token = await getToken()
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            backendUrl + '/api/user/get-course-progress',
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          let totalLectures = calculateNoOflectures(course)
          const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0
          return { totalLectures, lectureCompleted }
        })
      )
      setProgress(tempProgressArray)
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (userData) {
      fetchenrolled()
    }
  }, [userData])

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      courseProgress()
    }
    // eslint-disable-next-line
  }, [enrolledCourses])

  // Filter logic
  const filteredCourses = enrolledCourses.filter((course, index) => {
    if (!progress[index]) return false
    const isCompleted = progress[index].lectureCompleted / progress[index].totalLectures === 1
    if (filter === 'completed') return isCompleted
    if (filter === 'active') return !isCompleted
    return true
  })

  return (
    <>
      <div className="md:px-36 px-4 pt-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-teal-700 mb-1 tracking-tight">My Enrollments</h1>
            <p className="text-gray-500 text-base">
              All your active and completed courses in one place.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition
                ${filter === 'active' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-teal-700 hover:bg-teal-50'}`}
              onClick={() => setFilter('active')}
            >
Active
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition
                ${filter === 'completed' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-teal-700 hover:bg-teal-50'}`}
              onClick={() => setFilter('completed')}
            >
             Completed
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition
                ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-teal-700 hover:bg-teal-50'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-sm bg-white/80">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-teal-700 border-b border-teal-200 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Course</th>
                <th className="px-4 py-3 font-semibold truncate">Duration</th>
                <th className="px-4 py-3 font-semibold truncate">Completed</th>
                <th className="px-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400 text-lg">
                    You have not enrolled in any courses yet.
                  </td>
                </tr>
              )}
              {filteredCourses.map((course, index) => {
                // Find the correct progress index for the filtered course
                const originalIndex = enrolledCourses.findIndex(c => c._id === course._id)
                const isCompleted =
                  progress[originalIndex] &&
                  progress[originalIndex].lectureCompleted / progress[originalIndex].totalLectures === 1
                const percent =
                  progress[originalIndex] && progress[originalIndex].totalLectures > 0
                    ? (progress[originalIndex].lectureCompleted * 100) / progress[originalIndex].totalLectures
                    : 0
                return (
                  <tr
                    key={course._id}
                    className="border-b border-gray-100 hover:bg-teal-50 transition group"
                  >
                    <td className="md:px-4 pl-2 md:pl-4 py-4 flex items-center space-x-4 min-w-[220px]">
                      <img
                        src={course.courseThumbnail}
                        alt=""
                        className="w-14 sm:w-20 md:w-24 rounded-lg shadow-sm object-cover border border-gray-200 group-hover:border-teal-400 transition"
                      />
                      <div className="flex-1">
                        <p className="mb-1 max-sm:text-sm font-semibold text-teal-800 group-hover:text-teal-600 transition">
                          {course.courseTitle}
                        </p>
                        <Line
                          strokeWidth={4}
                          percent={percent}
                          className="bg-gray-200 rounded-full"
                          strokeColor="#14b8a6"
                          trailColor="#e5e7eb"
                        />
                        <span className="text-xs text-gray-400 mt-1 block">
                          {percent.toFixed(0)}% completed
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{calculateCourseDuration(course)}</td>
                    <td className="px-4 py-4 text-gray-600">
                      {progress[originalIndex]
                        ? `${progress[originalIndex].lectureCompleted} / ${progress[originalIndex].totalLectures} lectures`
                        : '--'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        className={`px-4 py-2 rounded-full font-semibold text-xs shadow-sm transition
                          ${isCompleted
                            ? 'bg-teal-700 text-white'
                            : 'bg-gray-200 text-teal-700 hover:bg-teal-600 hover:text-white'
                          }`}
                        onClick={() => navigate('/player/' + course._id)}
                      >
                        {isCompleted ? 'Completed' : 'Continue'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollments