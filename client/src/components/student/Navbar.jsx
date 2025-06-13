import React, { useContext } from 'react'
import { assets } from "../../assets/assets.js"
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext)
  const isCourselistPage = location.pathname.includes('/course-list');
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate('/educator')
      }

      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setIsEducator(true)
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className="sticky top-0 z-30 w-full bg-transparent shadow-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-10 md:px-14" style={{ minHeight: '64px', height: '64px' }}>
        <img
          onClick={() => navigate('/')}
          src={assets.loggo}
          alt="Logo"
          className="w-24 h-24 md:w-28 md:h-28 cursor-pointer transition-transform hover:scale-105 -my-6"
        />
        <div className="hidden md:flex flex-1 items-center justify-end gap-24 text-gray-700 font-medium">
          {user && (
            <>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full shadow transition-all duration-200"
                onClick={becomeEducator}
              >
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <span className="text-gray-300">|</span>
              <Link
                to="/my-enrollments"
                className="bg-teal-50 hover:bg-teal-100 text-teal-700 px-5 py-2 rounded-full transition-all duration-200"
              >
                My Enrollments
              </Link>
            </>
          )}
          {user ? (
            <div className="ml-12">
              <UserButton />
            </div>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full shadow transition-all duration-200 ml-12"
            >
              Create Account
            </button>
          )}
        </div>
        {/* Mobile */}
        <div className="md:hidden flex items-center gap-7 text-gray-700">
          {user && (
            <>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow transition-all duration-200 text-xs"
                onClick={becomeEducator}
              >
                {isEducator ? 'Educator' : 'Become Educator'}
              </button>
              <Link
                to="/my-enrollments"
                className="bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-full transition-all duration-200 text-xs"
              >
                Enrollments
              </Link>
            </>
          )}
          {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="user" className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar