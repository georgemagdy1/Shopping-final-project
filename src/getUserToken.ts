import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

 export async function getUserToken() {
    const token=await cookies()
const entoken = token.get("next-auth.session-token")?.value
const data=  await decode({token:entoken,secret:process.env.NEXTAUTH_SECRET!})
 return data?.accessToken
}