
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
import Link from 'next/link'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function ForgetPassword() {
    const route=useRouter()
  const formSchema = z.object({
  
    resetCode: z.string().nonempty({ message: "Code is Must" }),
 
  })
  const ForgetForm=useForm <z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues:{
     resetCode:"",
   
     }
   })

      async function handelVerfiycode(values: z.infer<typeof formSchema>) {
const res= await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
     method:"POST",
     body:JSON.stringify(values),
     headers:{"Content-Type":"application/json"}
   })
   const data= await res.json()
   console.log(data);
   if(data.status=="Success"){
       toast.success("Correct Code",{duration:1000,position:"top-center"})
       route.push("/Newpassword")
   }
   else{
     toast.error(data.message,{duration:2000,position:"top-center"})

   }
     }
     return (
 <div className='space-y-10  h-screen flex flex-col items-center mx-auto justify-center '>
       <Form {...ForgetForm}>
      <form onSubmit={ForgetForm.handleSubmit(handelVerfiycode)} className="w-2/3 space-y-6 flex flex-col items-center mx-auto justify-center">
        <FormField 
          control={ForgetForm.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
 </div>
  )
}
