
'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { positive, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
export default function Login() {
  const router= useRouter()
  const formSchema = z.object({
  
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.", 
    }),

  })
  const loginform=useForm <z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues:{
     "email":"",
     "password":"",
     }
   })

      async function handelResgister(values: z.infer<typeof formSchema>) {
       const data=  await signIn("credentials",{
          email:values.email,
          password:values.password,
          redirect:false,
        
        })
        if(data?.ok){
          toast.success("Login Successfully",{duration:1000,position:"top-center"})
          router.push("/products")
        }
        else{
          toast.error(data?.error ?? "Login failed",{duration:2000,position:"top-center"})
                    router.refresh()

        }

     }
     return (
       <div className='space-y-10  h-screen pt-10 '>
         <h1 className='text-center text-6xl '>Login</h1>
    <div className='my-10 w3/4 mx-auto space-y-7'>
      <Form {...loginform}>
          <form onSubmit={loginform.handleSubmit(handelResgister)} className='w-1/3 mx-auto space-y-5'>
  
     <FormField
     control={loginform.control}
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
     control={loginform.control}
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
    

    <Link href="/ForgetPassword" className='text-blue-600 underline '>Forget Password</Link>


   <Button  className='bg-green-500  my-6 text-center rounded-3xl w-full transition-all duration-300 hover:bg-black hover:text-green-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1'>
    Login
   </Button>     </form>
     </Form>
    </div>
       </div>
     )
   }
