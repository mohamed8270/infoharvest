"use client"

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';


const HeroImages = [
  {imageUrl: "/assets/images/laptop.png", alt: "laptop"},
  {imageUrl: "/assets/images/phone.png", alt: "phone"},
  {imageUrl: "/assets/images/smartwatch.png", alt: "smart watch"},
  {imageUrl: "/assets/images/headset.webp", alt: "head set"},
];

const HeroCorousel = () => {
  return (
    <div className='relative sm:px-10 py-5 sm:pt-20 pb-5 max-w-[560px] h-[700px] w-full bg-[#F2F4F7] rounded-[30px] sm:mx-auto'>
      <Carousel
    showThumbs ={false}
    infiniteLoop
    autoPlay
    interval = {2000}
    showArrows = {false}
    showStatus = {false}
    >
      {HeroImages.map((image) => (
        <Image 
        src = {image.imageUrl}
        alt = {image.alt}
        height = {484}
        width = {484}
        key = {image.alt}
        className='image-contain'
        />
      ))}
    </Carousel>
    </div>
  )
}

export default HeroCorousel