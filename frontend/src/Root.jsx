import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router'
function Root() {
  return (
    <div className='w-screen h-screen bg-gray-100 py-[1vh]'>
      <Navbar />
      <div className='flex w-screen justify-center items-center'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Root