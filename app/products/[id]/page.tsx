import React from 'react'
import {getProductById, getSimilarProducts} from '@/lib/actions'
import {Product} from '@/types'
import {redirect} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber } from "@/lib/utils";
import PriceInfoCard from '@/components/PriceInfoCard';
import {ProductCard} from '@/components/ProductCard';
import Modal from '@/components/Modal';

type Props = {
  params: {id: string}
}

const ProductDeatils = async ({params: {id}}: Props) => {
  
const product: Product = await getProductById(id);

if(!product) redirect('/')

const similarProducts = await getSimilarProducts(id);


  return (
    <div className='flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24 font-poppins bg-Iwhite'>
      <div className='flex xl:flex-row flex-col gap-28'>
        <div className='flex-grow xl:max-w-[50%] max-w-full py-16 border border-[#CDDBFF] rounded-[17px]'>
          <Image
          src={product.image}
          alt={product.title}
          width={580}
          height={400}
          className='mx-auto'/>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-blue-400 text-[12px]'>{product.brand}</p>
              <p className='text-[28px] font-semibold text-Iblack font-poppins'>{product.title}</p>
              <Link
              href={product.url}
              target='_blank'
              className='text-base text-Iblack opacity-50'>
                Visit Product
              </Link>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-[10px]'>
                  <Image
                  src='/assets/icons/red-heart.svg'
                  alt='heart'
                  height={20}
                  width={20}/>

                  <p className='text-base font-semibold text-Ired'>{product.reviewsCount}</p>
                </div>

                <div className='p-2 bg-gray-100 rounded-[10px]'>
                  <Image
                    src='/assets/icons/bookmark.svg'
                    alt='bookmark'
                    height={20}
                    width={20}/>
                </div>

                <div className='p-2 bg-gray-100 rounded-[10px]'>
                  <Image
                    src='/assets/icons/share.svg'
                    alt='share'
                    height={20}
                    width={20}/>
                </div>
              </div>
            </div>

            <div className='flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]'>
              <div className='flex flex-col gap-2'>
                <p className='text-[34px] text-Iblack font-bold'>
                  {product.currency} {formatNumber(product.currentPrice)}
                </p>
                <p className='text-[21px] text-Iblack text-opacity-50 line-through'>
                  {product.currency} {formatNumber(product.originalPrice)}
                </p>
              </div>

              <div className='flex flex-col gap-4'>
                <div className='flex gap-3'>
                  <div className='flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]'>
                    <Image
                    src='/assets/icons/star.svg'
                    height={16}
                    width={16}
                    alt='star'/>
                    <p className='text-sm text-yellow-600 font-semibold'>
                      {product.stars || '25'}
                    </p>
                  </div>

                  <div className='flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-[27px]'>
                    <Image
                    src='/assets/icons/comment.svg'
                    alt='comment'
                    height={16}
                    width={16}/>
                    <p className='text-sm text-Iblack font-semibold'>
                      {product.reviewsCount} Reviews
                    </p>
                  </div>
                </div>

                <p className='text-sm text-Iblack text-opacity-50'>
                  <span className='text-green-500 font-semibold'>{`-${product.discoutPercentage}%`  || '93%'}</span> Deal of the day.
                </p>
              </div>
            </div>

            <div className='flex gap-5 my-7 flex-col'>
              <div className='flex gap-5 flex-wrap'>
                <PriceInfoCard
                title='Current Price'
                iconSrc='/assets/icons/price-tag.svg'
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                borderColor='#b6bdff'/>

                <PriceInfoCard
                title='Average Price'
                iconSrc='/assets/icons/chart.svg'
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                borderColor='#b6bdff'/>

                <PriceInfoCard
                title='Highest Price'
                iconSrc='/assets/icons/arrow-up.svg'
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                borderColor='#FCC'/>

                <PriceInfoCard
                title='Lowest Price'
                iconSrc='/assets/icons/arrow-down.svg'
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                borderColor='#BEFFC5'/>
              </div>
            </div>

            <Modal productId={id}/>
        </div>
      </div>

      <div className='flex flex-col gap-16'>
          <div className='flex flex-col gap-5'>
            <h3 className='text-Iblack text-2xl font-semibold'>
              Product Description
            </h3>

            <div className='flex flex-col gap-4 text-Iblack text-justify'>
              {product?.description?.split('\n')}
            </div>
          </div>
          <button className='w-fit mx-auto py-4 px-4 bg-Iblack hover:bg-Ilightblack rounded-[30px] text-white text-lg font-semibold flex items-center justify-center gap-3 min-w-[200px] font-poppins'>
            <Image
            src='/assets/icons/bag.svg'
            height={22}
            width={22}
            alt='check'/>
            <Link className='text-base text-Iwhite' href='/'>
              Buy Now
            </Link>
          </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className='flex flex-col gap-2 py-14 w-full font-poppins text-Iblack'>
          <p className='text-secondary text-[32px] font-semibold'>Similar Products</p>

          <div className='flex flex-wrap gap-10 mt-7 w-full'>
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDeatils