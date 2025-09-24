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
import { brand } from '@/types/brands.type';

export default function BrandsAll({brands}:{brands:brand[]}) {
  return (
    <div className='w-full m-auto min-h-screen '>
    <div className='p-2 w-3/4 m-auto space-x-02 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
        {brands.map((brandItem) => (
        <Card key={brandItem.slug} className='hover:scale-105 duration-300 shadow-lg shadow-green-500/50'>
          <Link href={`/brands/${brandItem._id}`}>
            <CardHeader>
              <Image 
                src={brandItem.image} 
                alt={brandItem.name} 
                width={200} 
                height={100} 
                className='w-full h-56 object-center text-center'
              />
            </CardHeader>
            <CardContent className='space-y-2'>
              <CardTitle className='text-main'>
                {brandItem.name.split(" ").slice(0,2).join(" ")}
              </CardTitle>
            </CardContent>
            <CardFooter>
       
            </CardFooter>
          </Link>
        </Card>
      ))}
      </div>  
    </div>
  )
}
