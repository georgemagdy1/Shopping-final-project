'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { positive, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
export default function Register() {
  const route=useRouter()
  const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.", 
  }),
  rePassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",  
  }),
  
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
})
  const resgisterform=useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
    }
  })
   async function handelResgister(values: z.infer<typeof formSchema>) {
const res= await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
  method:"POST",
  body:JSON.stringify(values),
  headers:{"Content-Type":"application/json"}
})
const data= await res.json()
console.log(data);
if(data.message=="success"){
  toast.success("Resgister Successfully",{description:"You can login now",duration:1000,position:"top-center"})
route.push("/login")
}
else{
  toast.error(data.message,{duration:2000,position:"top-center"})
  route.refresh()
}
  }
  return (
    <div className='space-y-10  h-screen pt-10 '>
      <h1 className='text-center text-6xl '>Register</h1>
 <div className='my-10 w3/4 mx-auto space-y-7'>
   <Form {...resgisterform}>
       <form onSubmit={resgisterform.handleSubmit(handelResgister)} className='w-1/3 mx-auto space-y-5'>
       <FormField
  control={resgisterform.control}
  name="name"
  render={({ field }) => (
    <FormItem>

      <FormControl>
        <Input type='text' placeholder='User_Name' {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
  <FormField
  control={resgisterform.control}
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
  <FormField
  control={resgisterform.control}
  name="password"
  render={({ field }) => (
    <FormItem>

      <FormControl>
        <Input type='password' placeholder='Password' {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
  <FormField
  control={resgisterform.control}
  name="rePassword"
  render={({ field }) => (
    <FormItem>

      <FormControl>
        <Input type='password' placeholder='Re_Password' {...field} />
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
<Button  className='bg-green-500 text-center rounded-3xl w-full transition-all duration-300 hover:bg-black hover:text-green-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1'>
  Create An Account
</Button>     </form>
  </Form>
 </div>
    </div>
  )
}
