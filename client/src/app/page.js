"use client"
import Banner from '@/components/home/Banner'
import Header from '@/components/home/Header'
import Sidebar from '@/components/home/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pt-20">
          <Banner />

          </main>

          </div>
    </div>
  )
}

export default page