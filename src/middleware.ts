import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function  middleware(request: NextRequest) {

   const token= await getToken({req:request})
   console.log('====================================');
   console.log(token);
   console.log('token');
   if(token){
    return NextResponse.next()
   }
   else{
  return NextResponse.redirect(new URL('/login', request.url))
}
}
 
export const config = {
  matcher: ['/cart','/orders'],
}