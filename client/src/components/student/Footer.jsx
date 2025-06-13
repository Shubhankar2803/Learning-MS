import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className=" bg-gray-300 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-6 border-b border-teal-200">
        <div className="flex flex-col md:items-start items-center w-full">
          <img className="w-28 lg:w-39 cursor-pointer" src={assets.loggo} alt="logo" />
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-teal-700 mb-3">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-gray-600 md:space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-teal-700 mb-3">Subscribe to our newsletter</h2>
          <div className="flex items-center gap-2 pt-2">
            <input
              className="border border-teal-300 bg-transparent text-gray-700 placeholder-gray-400 outline-none w-64 h-9 rounded px-2 text-sm"
              type="email"
              name="enter email"
              placeholder="Enter your email"
            />
            <button className="bg-teal-600 hover:bg-teal-700 w-24 h-9 text-white rounded transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-3 text-center text-xs md:text-sm text-gray-400">
        Copyright @IntelliLearn 2023. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer