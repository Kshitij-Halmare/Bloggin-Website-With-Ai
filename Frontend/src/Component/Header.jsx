import React from 'react'
import logo from "../assets/logo.jpg"

function Header() {
  return (
    <div className='py-3'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <img src={logo}  className='rounded-full h-12 w-12'/>
          <h1 className='text-amber-100 text-xl font-bold font-sans '>Blogging</h1>
        </div>
        <div className='flex items-center gap-3'>
          <p className='bg-amber-100 rounded-full px-3 py-2 font-semibold text-cyan-950 '>Sign in</p>
          <p className='text-amber-100 font-semibold'>Sign up</p>
        </div>
      </div>
    </div>
  )
}

export default Header
