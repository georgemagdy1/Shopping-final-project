'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import {Button} from "@heroui/react";

export default function Login() {
  const route = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  
  const loginform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    }
  })
  
  async function handelResgister(values: z.infer<typeof formSchema>) {
    setLoading(true)
    
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {"Content-Type": "application/json"}
      })
      
      const data = await res.json()
      console.log(data);
      
      if(data.token) {
        toast.success("The Password Changed Successfully", {duration: 1000, position: "top-center"})
        route.push("/")
      }
      else {
        toast.error(data.message, {duration: 2000, position: "top-center"})
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {duration: 2000, position: "top-center"})
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className='space-y-10 h-screen pt-10'>
      <h1 className='text-center text-6xl'>Reset Password</h1>
      <div className='my-10 w-3/4 mx-auto space-y-7'>
        <Form {...loginform}>
          <form onSubmit={loginform.handleSubmit(handelResgister)} className='w-1/3 mx-auto space-y-5'>
            <FormField
              control={loginform.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='email' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginform.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='New Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {loading ? (
              <Button isLoading color="primary" className="w-full bg-white text-black my-6 rounded-3xl hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                Loading
              </Button>
            ) : (
              <Button 
                type="submit"
                className='bg-green-500 my-6 text-center rounded-3xl w-full transition-all duration-300 hover:bg-black hover:text-green-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1'
              >
                Reset Password
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}