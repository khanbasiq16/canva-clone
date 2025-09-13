"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEditorStore } from '@/store'
import { ChevronDown, Eye, Link, Pencil } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {


  const { IsEditing, setIsEditing} = useEditorStore();

  return (
    <header className="header-gradient header flex items-center justify-between px-4 h-14">

         <div className="flex items-center space-x-2">
        <Link href={"/"}>
          <Image
            src="https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg"
            alt="canva"
            width={70}
            height={30}
            priority
          />
        </Link>

           <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="header-button flex items-center text-white">
           <span>{IsEditing ? "Editing" : "Viewing"}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem className="flex items-center gap-2" onClick={() => setIsEditing(true)}>
          <Pencil className="h-4 w-4" />
          <span>Editing</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2" onClick={() => setIsEditing(false)}>
          <Eye className="h-4 w-4" />
          <span>Viewing</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </header>
  )
}

export default Header