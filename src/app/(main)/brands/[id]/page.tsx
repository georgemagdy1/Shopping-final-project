import BrandDetails from '@/app/_components/BrandDetails/BrandDetails';
import ProductDetalias from '@/app/_components/ProductDetalias/ProductDetalias';
import { brand, Brands } from '@/types/brands.type';
import { Data, ProductDetails } from '@/types/productsDetails.type'
import React from 'react'

export default async function page(params:{params:{id:string}}  ) {
    const {id}=params.params
    console.log(id);
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const data:Brands=await res.json()
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  const brandData: brand = data.data[0]
        return (

    <div>
      <BrandDetails brand={brandData} />
    </div>
  )
}
