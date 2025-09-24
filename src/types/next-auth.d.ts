import NextAuth from "next-auth"

declare module "next-auth" {
interface User {
    id: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
    token: string;
  }
  interface Session {
    user:user["User"];
  }
}