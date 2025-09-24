'use client'
import { Deleteallfromcart, Deletefromcart, getallCartItems, Updateitemformcart } from '@/CartAction/CartAction'
import { Button } from '@/components/ui/button'
import { Allcart, Data } from '@/types/cartall.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Page() { 
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<Data>()
  
  useEffect(() => {
    handleCart()
  }, [])
  
  async function handleCart() {
    setLoading(true)
    const data: Allcart | null = await getallCartItems()
    setCart(data?.data)
    setLoading(false)
  }
  
  async function removeitem(id: string) {
    const data = await Deletefromcart(id)
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (data.status == "success") {
      toast.success("Removed Successfully", { duration: 1000, position: "top-center" })
      handleCart()
    } else { 
      toast.error("Try Again", { duration: 2000, position: "top-center" })
    }
  }
  
  async function removeallitem() {
    const data = await Deleteallfromcart()
    if (data.message == "success") {
      toast.success("Removed Successfully", { duration: 1000, position: "top-center" })
      handleCart()
    } else {
      toast.error("Try Again Please", { duration: 2000, position: "top-center" })
    }
  }
 
  async function updatecart(id: string, count: number) {
    const data = await Updateitemformcart(id, count)
    if (data.status == "success") {
      toast.success("Updated Successfully", { duration: 1000, position: "top-center" })
      setCart(data?.data)
    } else {
      toast.error("Try Again", { duration: 2000, position: "top-center" })
    }
  }
  
  return (
    <div className='h-screen w-full p-5'>
      {loading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className='flex justify-between items-center'>
            <h1 className='text-center text-3xl my-4'>Shop Cart</h1>
            <Button onClick={removeallitem} className="font-medium bg-red-500">Remove ALL</Button>
          </div>
          
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart?.products.map((item) => (
                  <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4 text-center">
                      <Image 
                        src={item.product.imageCover} 
                        width={200} 
                        height={200}  
                        className="w-16 md:w-32 max-w-full max-h-full" 
                        alt={item.product.title} 
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updatecart(item.product.id, item.count - 1)} 
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>

                        <div className="mx-3">{item.count}</div>
                        
                        <button 
                          onClick={() => updatecart(item.product.id, item.count + 1)} 
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price}
                    </td>
                    <td className="px-6 py-4">
                      <Button onClick={() => removeitem(item.product._id)} className="font-medium bg-red-500">Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className='flex justify-between items-center mt-10'>
            <h2 className='text-6xl text-green-500 my-10'>Total Price: {cart?.totalCartPrice}</h2>
            <Button className='bg-green-500 text-3xl text-white hover:bg-black hover:text-green-500 transition-all duration-200'>
              <Link href={"/checkout/" + cart?._id}>Check Out</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}