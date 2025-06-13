import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext)

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(
        backendUrl + '/api/educator/dashboard',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
  }, [isEducator])

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-10 p-4 pt-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="w-full space-y-8">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-6 items-center justify-start">
          <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-5 w-60 border-t-4 border-teal-500 transition hover:shadow-lg">
            <div className="bg-teal-50 p-3 rounded-full">
              <img src={assets.patients_icon} alt="" className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-700">{dashboardData.enrolledStudentsData.length}</p>
              <p className="text-sm text-gray-500">Total Enrollments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-5 w-60 border-t-4 border-teal-500 transition hover:shadow-lg">
            <div className="bg-teal-50 p-3 rounded-full">
              <img src={assets.appointments_icon} alt="" className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-700">{dashboardData.totalCourses}</p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-5 w-60 border-t-4 border-teal-500 transition hover:shadow-lg">
            <div className="bg-teal-50 p-3 rounded-full">
              <img src={assets.earning_icon} alt="" className="w-8 h-8" />
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-700">
                {currency} {dashboardData.totalEarnings}
              </p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Latest Enrollments */}
        <div className="w-full mt-8">
          <h2 className="pb-4 text-xl font-semibold text-teal-700">Latest Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-xl bg-white shadow border border-gray-200">
            <table className="table-fixed md:table-auto w-full">
              <thead className="bg-gray-50 text-teal-700 border-b border-teal-100 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {dashboardData.enrolledStudentsData.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-10 text-gray-400 text-lg">
                      No enrollments yet.
                    </td>
                  </tr>
                )}
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-teal-50 transition">
                    <td className="px-4 py-3 text-center hidden sm:table-cell text-gray-400">{index + 1}</td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img src={item.student.imageUrl} alt="" className="w-10 h-10 rounded-full border border-teal-100 shadow-sm" />
                      <span className="truncate text-teal-700 font-medium">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Dashboard