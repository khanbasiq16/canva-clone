"use client"
import Aifeatures from '@/components/home/Aifeatures'
import Banner from '@/components/home/Banner'
import Designtypes from '@/components/home/Designtypes'
import Header from '@/components/home/Header'
import Recentdesign from '@/components/home/Recentdesign'
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
          <Designtypes/>
          <Aifeatures/>
          <Recentdesign/>
          </main>

          </div>
    </div>
  )
}

export default page