import React from 'react'
import Image from 'next/image';

interface Props {
    title: string;
    value: string;
    borderColor: string;
    iconSrc: string;
}

const PriceInfoCard = ({title, iconSrc, borderColor, value}: Props) => {
  return (
    <div className={`flex-1 min-w-[200px] flex flex-col gap-2 border-l-[3px] rounded-[10px] bg-gray-100 px-5 py-4 border-l-[${borderColor}]`}>
        <p className='text-base text-Iblack'>{title}</p>

        <div className='flex gap-1'>
            <Image src={iconSrc} 
            height={24}
            width={24}
            alt={title}/>

            <p className='text-2xl font-bold text-Iblack'>{value}</p>
        </div>
    </div>
  )
}

export default PriceInfoCard