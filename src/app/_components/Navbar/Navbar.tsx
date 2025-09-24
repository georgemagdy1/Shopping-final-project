'use client'
import React from 'react'
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const {data, status} = useSession()
  
  const menulist: {path: string, content: string, product: boolean}[] = [
    {path: "/products", content: "Products", product: false},
    {path: "/category", content: "Category", product: false},
    {path: "/brands", content: "Brands", product: false},
    {path: "/wishlist", content: "Wishlist", product: false},
    {path: "/cart", content: "Cart", product: true},
    {path: "/allorders", content: "Order", product: true}
  ]
  
  const menuauthlist: {path: string, content: string}[] = [
    {path: "/login", content: "Login"},
    {path: "/register", content: "Register"}
  ]
  
  function logout() {
    signOut({
      callbackUrl: "/login"
    })
  }

  return (
    <NavigationMenu viewport={false} className='max-w-full p-5 flex justify-between items-center font-bold bg-gray-300'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className="flex items-center bg-gray-300" >
              <Image src="/images/freshcart-logo.svg" alt="Logo" width={120} height={120}/>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        {menulist.map((item) => {
          // Show product-specific items only when authenticated
          if (item.product && status !== "authenticated") {
            return null
          }
          
          return (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link 
                  className="bg-gray-300 hover:bg-black hover:text-green-500 transition-colors duration-200 rounded " 
                  href={item.path}
                >
                  {item.content}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
      
      <NavigationMenuList>
        {status === "authenticated" ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span className="bg-gray-300 hover:bg-black hover:text-green-500 transition-colors duration-200 rounded">
                  Hello {data?.user?.name}
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <button 
                  className="bg-red-400 hover:bg-red-700 hover:text-green-500 transition-colors duration-200 text-black border border-black rounded px-3 py-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            {menuauthlist.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link 
                    className="hover:bg-black hover:text-green-500 transition-colors duration-200 text-black border border-black rounded px-3 py-2" 
                    href={item.path}
                  >
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}