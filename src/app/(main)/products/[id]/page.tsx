import ProductDetalias from '@/app/_components/ProductDetalias/ProductDetalias';
import { Data, ProductDetails } from '@/types/productsDetails.type'
import React from 'react'

export default async function page(params:{params:{id:string}}  ) {
    const {id}=params.params
    console.log(id);
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const data:ProductDetails=await res.json()
   const product:Data=data.data;

  return (

    <div>
      <ProductDetalias product={product} />
    </div>
  )
}
