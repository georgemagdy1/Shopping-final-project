import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";

export const nextoptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
     
        if(data.message == "success"){
          const decodedToken: { id: string } = jwtDecode(data.token);
          return {
            id: decodedToken.id,
            user: data.user,
            token: data.token,
          }
        }    
     
        throw new Error(data.message)
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
        token.user = user.user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as string
      return session
    }
  }
}

const handler = NextAuth(nextoptions)
export { handler as GET, handler as POST };