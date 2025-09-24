'use server'

import { getUserToken } from "@/getUserToken"
import { Allcart } from "@/types/cartall.type";


 export async function getallCartItems() {

    const token=await getUserToken()
    if(!token) return null
    console.log(token);
    const res= await fetch("https://ecommerce.routemisr.com/api/v1/cart",{

       headers:{
  token:token as string,     
  }
    })
    const data:Allcart= await res.json()
    return data
}
 export async function Addtocart(id:string) {

    const token=await getUserToken()
    if(!token) return null
    console.log(token);
    const res: Response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
        method:"POST",
        body:JSON.stringify({
            productId:id,
        }),
        headers:{
            token:token as string,  
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    return data
}
    export async function Deletefromcart(id:string) {   
    const token=await getUserToken()
    if(!token) return null
    console.log(token);
    const res: Response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method:"DELETE",
        headers:{
            token:token as string,
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    return data
}
    export async function Deleteallfromcart() {   
    const token=await getUserToken()
    if(!token) return null
    console.log(token);
    const res: Response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
        method:"DELETE",
        headers:{  
            token:token as string,
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    return data
}
 export async function Updateitemformcart(id:string,count:number) {
    const token=await getUserToken()
    if(!token) return null
    console.log(token);
    const res: Response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method:"PUT",
        body:JSON.stringify({
            count:count
        }),
        headers:{
            token:token as string,       
            "Content-Type":"application/json"
        }
    })
    const data = await res.json()
    return data
 }