'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Addtocart } from '@/CartAction/CartAction'
import { toast } from 'sonner'
export default function Addcartbtn({id}:{id:string})
 {

  
 async function handleAddToCart(id: string): Promise<void> {
  const data = await Addtocart(id);
  console.log(data);
  if (data?.status === "success") {
    toast.success(data?.message ?? "Added to cart", { duration: 1000, position: "top-center" });
  } else {
    console.log(data?.message );
    toast.error("Try Again", { duration: 2000, position: "top-center" });
  }
}
  return (
    <div className=' flex justify-center   items-center hover:scale-105 duration-300 '>
      <Button onClick={()=>handleAddToCart(id)} className='bg-green-500 hover:bg-black hover:text-green-500'>Add to Cart</Button>
    </div>
  )
}
