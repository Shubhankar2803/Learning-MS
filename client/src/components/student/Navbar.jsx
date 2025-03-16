import React, { useContext } from 'react'
import { assets } from "../../assets/assets.js"
import { Link } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const {navigate,isEducator,backendUrl,setIsEducator,getToken}=useContext(AppContext)
  const isCourselistPage = location.pathname.includes('/course-list');
  const {openSignIn}=useClerk();
  const {user}=useUser();

  const becomeEducator=async()=>{
    try {
      if(isEducator){
     navigate('/educator')
      }

      const token=await getToken()
      const {data}=await axios.get(backendUrl+'/api/educator/update-role',
        {headers:{Authorization:`Bearer ${token}`}}
      )
      if(data.success){
        setIsEducator(true)
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }


  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-30 border-b  border-gray-500 py-4 `}>
      <img onClick={()=>navigate('/')} src={assets.loggo} alt="" className='w-28 h-28 lg:w-38  cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          {user &&<>          <button className='bg-blue-600 text-white px-5 py-2 rounded-full' onClick={becomeEducator}>{isEducator?'Educator Dashboard':'Become Educator'}</button> |

          <Link to='/my-enrollments' className='bg-blue-600 text-white px-5 py-2 rounded-full'>My Enrollments </Link> </>
        }
        </div>
        {user? <UserButton/>: <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>}


      </div>
      <div className='md:hidden fle items-center gap-2 sm:gap-5 text-gray-500'>
           <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
           {user && <> <button className='bg-blue-600 text-white px-5 py-2 rounded-full' onClick={becomeEducator}>{isEducator?'Educator Dashboard':'Become Educator'}</button>

           <Link className='bg-blue-600 text-white px-5 py-2 rounded-full'   to='/my-enrollments'>My Enrollments </Link> </>
              }
             
           </div>
           {user?<UserButton/>:  <button onClick={()=>openSignIn()}><img src={assets.user_icon} alt="" /></button>}
          
      </div>
    </div>
  )
}

export default Navbar