import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <header className='w-full font-poppins bg-Iwhite border-b border-gray-200'>
        <nav className='mx-auto flex sm:px-16 px-6 h-[60px] items-center'>
            <Link href="/">
                <p className='text-Iblack font-semibold'>Info <span className='text-Ired font-semibold'>Harvest</span> </p>
            </Link>
        </nav>
    </header>
  )
}

export default NavBar