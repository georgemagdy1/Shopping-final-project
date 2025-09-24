import React from 'react'
import Addcartbtn from '../Addcartbtn/Addcartbtn'
import { Data } from '@/types/productsDetails.type'
import { ProductSlider } from '../ProductSlider/ProductSlider'

export default function ProductDetails(props: { product: Data }) {
   
  const { imageCover, price, title, description, ratingsQuantity, images, _id } = props.product
  
  return (
    <div className='grid grid-cols-11 gap-10 container m-auto justify-center items-center min-h-screen'>
      <div className='grid col-span-5 p-5 m-auto'>
        <ProductSlider images={images}/>
      </div>
      <div className='col-span-6 p-5 space-y-5'>
        <h1>{title}</h1>
        <p>{description}</p>
        <h5>{price} EGP</h5>
        <p className='text-yellow-400'>★{ratingsQuantity}</p>
        <br />
        <Addcartbtn id={_id}/>
      </div>
    </div>
  )
}
