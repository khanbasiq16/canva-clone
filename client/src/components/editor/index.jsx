import React, { use, useEffect, useState } from 'react'
import Header from './header'
import Canvas from './canvas'
import Sidebar from './sidebar'
import { useParams, useRouter } from 'next/navigation'
import { useEditorStore } from '@/store'

const MainEditor = () => {
    const params = useParams();
    const router = useRouter();
    const designID = params?.slug;

    const [isLoading, setIsLoading] = useState(!!designID);
    const [loadAttempted, setLoadAttempted] = useState(false);
    const [error, setError] = useState(null);

    const {canvas , setDesignID , resetstore} = useEditorStore();

    useEffect(() => {

        resetstore();
     

        if (designID) {
             setDesignID(designID);
        }


        return () => { resetstore(); }
    }, [])


    useEffect(() => {
        setLoadAttempted(false);
        setError(null);
    }, [designID]);

    useEffect(() => {
      if (isLoading && !canvas && designID) {
        const Timer = setTimeout(() => {
            if (isLoading) {
               console.log("Canvas init timeout");
               setIsLoading(false);
            }
        }, 5000);

        return () => clearTimeout(Timer);
      }

    }, [isLoading , canvas , designID])
    

    useEffect(() => {
        if(canvas){
            console.log("Canvas is Now Available in Editor Store")
        }
    }, [canvas])
    

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden relative'>
            <main className='flex-1 overflow-auto bg-[#f0f0f0] flex items-center justify-center'>
                <Canvas />
            </main>
        </div>
      </div>
      
    </div>
  )
}

export default MainEditor