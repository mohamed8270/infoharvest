import React from 'react'
import SearchBar from '../components/SearchBar'
import HeroCarousel from '../components/HeroCarousel'
import {getAllProducts} from '@/lib/actions';
import {ProductCard} from '../components/ProductCard'

const HeroSection = async () => {

  const allProducts = await getAllProducts();

  return (
    <>
    <section className='font-poppins sm:px-16 px-6 py-24 mx-auto max-w-10xl'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='text-Iblack text-[12px]'>Start harvesting your money here ➡️</p>
          <h1 className='text-Iblack text-[50px] font-semibold'>Make a wise decission with <br/><span className='text-Ired text-[50px] font-semibold'>Info Harvest</span> </h1>
          <p className='text-Iblack text-opacity-50 text-[14px] font-regular'>The powerful tool present in market for the user to make price decission well,<br/>Unlock the potential of saving money over every order you make!</p>
          <SearchBar/>
        </div>
        <HeroCarousel/>
      </div>
    </section>
    <section className='flex flex-col gap-10 px-6 md:px-20 py-24 font-poppins text-Iblack'>
      <h1 className='text-secondary text-[32px] font-semibold'>Trending</h1>
      <div className='flex flex-wrap gap-x-12 gap-y-16'>
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
    </section>
    </>
  )
}

export default HeroSection