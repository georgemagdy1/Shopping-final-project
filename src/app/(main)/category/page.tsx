import { getServerSession } from 'next-auth'
import { nextoptions } from '@/app/api/auth/[...nextauth]/route'
import React from 'react'

export default async function page() {
const data= await getServerSession(nextoptions)

  return (
    <div>
    </div>
  )
}
