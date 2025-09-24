'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { z } from "zod" 
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from 'next/navigation'
import { checkoutpayment } from '@/checkoutaction/checkoutaction'
export default function CheckOut() {
    
   const {caartid}:{caartid:string,}= useParams()
  const route=useRouter()
  const formSchema = z.object({
  details: z.string().min(10, {
    message: "details must be at least 10 characters.",
  }),
  
  
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",  
  }),
    city: z.string().min(4, {
    message: "city must be at least 4 characters.",
  })
  
})

  const resgisterform=useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
    "details": "",
    "phone":"",
    "city":""
    }
  })
   async function handelpayment(values:{details:string,phone:string,city:string}) {

const data= await checkoutpayment(caartid!,values)
console.log(data);
if(data?.status==="success"){
  window.open(data.session.url,"_blank")
}
else{
    route.push("/(shop)/cart")
}

  }
  return (
    <div className='space-y-10  h-screen pt-10 '>
      <h1 className='text-center text-6xl '>Check_Out</h1>
 <div className='my-10 w3/4 mx-auto space-y-7'>
   <Form {...resgisterform}>
       <form onSubmit={resgisterform.handleSubmit(handelpayment)} className='w-1/3 mx-auto space-y-5'>
       <FormField
  control={resgisterform.control}
  name="details"
  render={({ field }) => (
    <FormItem>

      <FormControl>
        <Input  placeholder='details' {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

  <FormField
  control={resgisterform.control}
  name="phone"
  render={({ field }) => (
    <FormItem>

      <FormControl>
        <Input type='tel' placeholder='Phone_Number' {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
  <FormField
  control={resgisterform.control}
  name="city"
  render={({ field }) => (
    <FormItem>

      <FormControl>
        <Input type='text' placeholder='city' {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<Button  className='bg-green-500 text-center rounded-3xl w-full transition-all duration-300 hover:bg-black hover:text-green-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1'>
Payment</Button>     </form>
  </Form>
 </div>
    </div>
  )
}
