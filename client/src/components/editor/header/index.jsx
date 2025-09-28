"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store";
import {
  ChevronDown,
  Download,
  Eye,
  Link,
  LogOut,
  Pencil,
  Save,
  Star,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ExportModal from "../export";

const Header = () => {
  const { canvas, IsEditing, setIsEditing, name, setName } = useEditorStore();
  const { data: session } = useSession();
    const [showExportModal, setShowExportModal] = useState(false);


  const handleLogout = async () => {
    await signOut();
  };

    useEffect(() => {
    if (!canvas) return;
    canvas.selection = IsEditing;
    canvas.getObjects().forEach((obj) => {
      obj.selectable = IsEditing;
      obj.evented = IsEditing;
    });
  }, [IsEditing]);


    const handleExport = () => {
    // if (userDesigns?.length >= 5 && !userSubscription.isPremium) {
    //   toast.error("Please upgrade to premium!", {
    //     description: "You need to upgrade to premium to create more designs",
    //   });

    //   return;
    // }
    setShowExportModal(true);
  };

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
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              <span>Editing</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => setIsEditing(false)}
            >
              <Eye className="h-4 w-4" />
              <span>Viewing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="header-button relative" title="Save">
          <Save className="h-5 w-5" />
        </button>

           <button
          onClick={handleExport}
          className="header-button ml-3 relative"
          title="Export"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-1 justify-center max-w-md">
        <Input
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-3">
        <button className="update-button flex items-center bg-white/10 hover:bg-white/20 text-white px-3 py-1  h-9 transition-colors rounded-md">
          <Star className="mr-1 h-5 w-5 text-yellow-400" />
          <span>Upgrade Your Plan</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger aschild="true">
            <div className="flex items-center space-x-2 ">
              <Avatar>
                <AvatarFallback>
                  {session?.user?.name?.[0] || "U"}
                </AvatarFallback>
                <AvatarImage
                  src={session?.user?.image || "/placeholder-user.jpg"}
                />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={handleLogout}
              className={"cursor-pointer"}
            >
              <LogOut className="mr-2 w-4 h-4" />
              <span className="font-bold">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

       <ExportModal isOpen={showExportModal} onClose={setShowExportModal} />
    </header>
  );
};

export default Header;
