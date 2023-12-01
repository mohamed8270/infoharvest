import React from 'react'
import {getProductById} from '@/lib/actions'
import {redirect} from 'next/navigation';

type Props = {
  params: {id: string}
}

const ProductDeatils = async ({params: {id}}: Props) => {
  
const product = await getProductById(id);

if(!present) redirect('/')


  return (
    <div className='flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24'>
      {product.title}
    </div>
  )
}

export default ProductDeatils