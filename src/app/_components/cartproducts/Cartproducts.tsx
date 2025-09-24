import React from 'react'
import {
  Card,
 
  CardContent,

  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Datum } from '@/types/probusts.type';
import Addcartbtn from '../Addcartbtn/Addcartbtn';
import Image from 'next/image';
import Link from 'next/link';


export default function Cartproducts({product}:{product:Datum}) {
   const {imageCover,price,title,category:{name},ratingsQuantity,_id}=product
   
  return (
    <>
    
    <div className='p-2 w-full m-auto  '>
      <Card className='hover:scale-105 duration-300 shadow-lg shadow-green-500/50'>
        <Link href={`/products/${product._id}`}>
        <CardHeader>
          <Image 
            src={imageCover} 
            alt={title} 
            width={200} 
            height={100} 
            className='w-full h-56 object-center text-center'
          />
        </CardHeader>
        <CardContent className='space-y-2'>
          <CardTitle className='text-main'>
            {name.split(" ").slice(0,2).join(" ")}
          </CardTitle>
          <CardTitle>{title}</CardTitle>
          <div className='flex justify-between items-center'>
            <span>{price} EGP</span>
            <span className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              {ratingsQuantity}
            </span>
          </div>  
        </CardContent>
        <CardFooter>
        </CardFooter></Link>

          <Addcartbtn id={_id}/>
      </Card>
    </div>
    </>
  )
}