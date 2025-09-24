import React from 'react'
import Addcartbtn from '../Addcartbtn/Addcartbtn'
import Image from 'next/image'
import { brand } from '@/types/brands.type'

export default function BrandDetails({brand}: {brand: brand}) {
   
const { image, name, updatedAt, createdAt } = brand;
  return (
        <div className='grid grid-cols-11  gap-10 container m-auto justify-center items-center min-h-screen '>
        <div className='grid col-span-5 p-5 m-auto '>
<Image 
            src={image} 
            alt={name} 
            width={500} 
            height={500} 
            className='w-full h-96 object-center text-center'
          />
        </div>
<div className='col-span-6 p-5 space-y-5 '>
    <h1>{name}</h1>
    <p>{createdAt.toLocaleString()}</p>
    <h5>{updatedAt.toLocaleString()}</h5>
    <br />

</div>
      </div>
  )
}
