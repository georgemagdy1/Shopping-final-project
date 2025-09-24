
'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export default function ForgetPassword() {
    const route=useRouter()
  const formSchema = z.object({
  
    email: z.string().email({ message: "Invalid email address." }),
 
  })
  const ForgetForm=useForm <z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues:{
     "email":"",
   
     }
   })

      async function handelResgister(values: z.infer<typeof formSchema>) {
const res= await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
     method:"POST",
     body:JSON.stringify(values),
     headers:{"Content-Type":"application/json"}
   })
   const data= await res.json()
   console.log(data);
   if(data.statusMsg=="success"){
       toast.success("Please Check Your Email",{duration:1000,position:"top-center"})
       route.push("/VerfiyCode")
   }
   else{
     toast.error(data.statusMsg,{duration:2000,position:"top-center"})

   }
     }
     return (
       <div className='space-y-10  h-screen pt-10 '>
         <h1 className='text-center text-6xl '>Login</h1>
    <div className='my-10 w3/4 mx-auto space-y-7'>
      <Form {...ForgetForm}>
          <form onSubmit={ForgetForm.handleSubmit(handelResgister)} className='w-1/3 mx-auto space-y-5'>
  
     <FormField
     control={ForgetForm.control}
     name="email"
     render={({ field }) => (
       <FormItem>
   
         <FormControl>
           <Input type='email' placeholder='E_mail' {...field} />
         </FormControl>
         <FormMessage />
       </FormItem>
     )}
   />
    


   <Button  className='bg-green-500  my-6 text-center rounded-3xl w-full transition-all duration-300 hover:bg-black hover:text-green-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1'>
    Send Email
   </Button>     </form>
     </Form>
    </div>
       </div>
     )
   }
