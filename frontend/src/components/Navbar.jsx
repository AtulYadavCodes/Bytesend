import React from 'react'
import { NavLink } from 'react-router'

function Navbar() {
  const color="";
  return (
    <>
    
    <div className=' w-screen flex flex-row justify-center items-center my-[1vh] p-[2vh]'>
      <div className='flex flex-row justify-center items-center bg-gray-100 rounded-2xl h-[10vh]  w-[90vw] lg:w-[40vw] drop-shadow-2xl '>
        <NavLink to={'/'} style={({isActive})=>({background:(isActive?"oklch(80.9% 0.105 251.813)":"transparent")})} className=' flex flex-col justify-center items-center h-10 w-[18vw]  m-[0.5vw] rounded-2xl text-center drop-shadow-2xl'> file
        </NavLink>
        <NavLink to={'/text'} className=' flex flex-col justify-center items-center h-10 w-[18vw]   m-[0.5vw] rounded-2xl text-center drop-shadow-2xl' style={({isActive})=>({background:(isActive?"oklch(80.9% 0.105 251.813)":"transparent")})}> text
        </NavLink>
      </div>
    </div>

    </>
  )
}

export default Navbar