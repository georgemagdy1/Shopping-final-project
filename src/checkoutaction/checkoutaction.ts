'use server'
import { getUserToken } from "@/getUserToken";

 export async function checkoutpayment(caartid:string,shippingAddress:{details:string,phone:string,city:string}) {
    const token=await getUserToken()
    if(!token) return null
    console.log(token);
    const res: Response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${caartid}?url=http://localhost:3000`,{
        method:"POST",
        body:JSON.stringify({
            "shippingAddress":shippingAddress
        }
        ),
        headers:{
             token:token as string,       
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    return data
 }