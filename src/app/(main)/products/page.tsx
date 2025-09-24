import Cartproducts from '@/app/_components/cartproducts/Cartproducts';
import { Hero } from '@/app/_components/hero/Hero';
import { Datum, Welcome } from '@/types/probusts.type';
import React from 'react'

export default  async function page() {
    const res=await fetch(`${process.env.NEXT_Base_URL}/api/v1/products`)
  const data:Welcome=await res.json()
const products:Datum[]=data.data
  return (
    <>
    <Hero/>
    <h1 className='text-5xl font-bold text-center my-5 text-main '>Products</h1>
    {
      !products? <div className='w-full h-screen flex justify-center items-center'>
      <span className="loader"></span>
    </div>:
    <div className='container m-auto p-5'>
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 space-y-2'>
      {
        products.map((product)=>{
      return <Cartproducts key={product._id} product={product}/>
      
 } )
      }
    </div> 
    </div>
    }
    </>
  )
}
