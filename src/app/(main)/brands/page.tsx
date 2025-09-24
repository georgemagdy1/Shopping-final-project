import Cartproducts from '@/app/_components/cartproducts/Cartproducts';
import { Hero } from '@/app/_components/hero/Hero';
import {  Datum, Welcome } from '@/types/probusts.type';
import {  brand, Brands } from '@/types/brands.type';
import React from 'react'
import   BrandsAll from '@/app/_components/Brand/BrandsAll';
 '@/app/_components/Brand/BrandsAll';

export default  async function page() {
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
  const data:Brands=await res.json()
const products:brand[]=data.data
console.log('====================================');
console.log(products);
console.log('====================================');
  return (
    <>
    <Hero/>
    <h1 className='text-5xl font-bold text-center my-5 text-main '>Brands</h1>
<BrandsAll brands={products}/>
    
    
    
    </>
  )
}
