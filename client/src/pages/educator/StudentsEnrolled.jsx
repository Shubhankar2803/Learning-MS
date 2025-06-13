import React, { useState, useEffect, useContext } from 'react'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

// Simple user icon SVG as a React component
const UserIcon = () => (
  <svg className="w-9 h-9 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" />
  </svg>
)

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState()

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(
        backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: ` Bearer ${token}` } }
      )
      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents()
    }
  }, [isEducator])

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-2">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white border-2 border-teal-100 shadow-xl">
        <h2 className="px-6 pt-6 pb-2 text-2xl font-extrabold text-teal-700 tracking-tight">Students Enrolled</h2>
        <table className="w-full text-gray-900 border-b border-teal-100 text-sm text-left">
          <thead className="bg-gray-50 text-teal-700 border-b border-teal-100 text-sm">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-teal-50 transition">
                <td className="px-4 py-3 text-center hidden sm:table-cell text-gray-400">{index + 1}</td>
                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  {item.student.imageUrl ? (
                    <img
                      src={item.student.imageUrl}
                      alt=""
                      className="w-9 h-9 rounded-full border border-teal-100 object-cover bg-gray-100"
                    />
                  ) : (
                    <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 border border-teal-100">
                      <UserIcon />
                    </span>
                  )}
                  <span className="truncate font-medium text-teal-800">{item.student.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                <td className="px-4 py-3 hidden sm:table-cell text-gray-500">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {enrolledStudents.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-400 text-lg">
                  No students enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled