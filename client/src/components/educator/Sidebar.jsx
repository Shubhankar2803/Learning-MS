import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)
  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Students Enrolled', path: '/educator/students-enrolled', icon: assets.person_tick_icon },
  ]
  return isEducator && (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-teal-200 bg-white py-2 flex flex-col shadow-sm">
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 
            md:px-10 gap-3 font-semibold transition-all
            ${isActive
              ? 'bg-teal-50 border-r-[6px] border-teal-500 text-teal-700'
              : 'hover:bg-teal-50 border-r-[6px] border-white text-gray-600 hover:text-teal-700 hover:border-teal-100'}`
          }
        >
          <img src={item.icon} className="w-6 h-6" alt="" />
          <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar