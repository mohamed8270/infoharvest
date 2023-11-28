import React from 'react'
import SearchBar from '../components/SearchBar'
import HeroCarousel from '../components/HeroCarousel'

const HeroSection = () => {
  return (
    <>
    <section className='font-poppins sm:px-16 px-6 py-24 mx-auto max-w-10xl'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='text-Iblack text-[12px]'>Start harvesting your money here ➡️</p>
          <h1 className='text-Iblack text-[50px] font-semibold'>Make a wise decission with <br/><span className='text-Ired text-[50px] font-semibold'>Info Harvest</span> </h1>
          <p className='text-Iblack text-opacity-50 text-[14px] font-regular'>The powerful tool present in market for the user to make price decission well,<br/>Unlock the potentail of saving money money over every order you make!</p>
          <SearchBar/>
        </div>
        <HeroCarousel/>
      </div>
    </section>
    </>
  )
}

export default HeroSection