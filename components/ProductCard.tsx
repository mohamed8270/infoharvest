import React from 'react'
import {Product} from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  product: Product;
}

export const ProductCard = ({product}: Props) => {
  return (
    <Link href={`/products/${product._id}`} className='sm:w-[292px] sm:max-w-[292px] w-full flex-1 flex flex-col gap-4 rounded-md font-poppins'>
      <div className='flex-1 relative flex flex-col gap-5 p-4 rounded-md'>
      <Image
       src={product.image}
       alt={product.title}
       height={200}
       width={200}
       className='max-h-[250px] object-contain w-full h-full bg-transparent'>
      </Image>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-secondary text-xl leading-6 font-semibold truncate'>{product.title}</h3>
        <div className='flex justify-between'>
          <p className='text-Iblack opacity-50 text-lg capitalize'>
            {product.category}
          </p>

          <p className='text-Iblack text-lg font-semibold'>
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
