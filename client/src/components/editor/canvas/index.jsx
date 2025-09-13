"use client"

import { initializeFabric } from '@/fabric/fabric-utils';
import { useEditorStore } from '@/store';
import React, { useEffect, useRef } from 'react'

const Canvas = () => {

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas } = useEditorStore();

  useEffect(() => {
    
    const cleanupcanvas = async() => {
      if (fabricCanvasRef.current) {
        try { 
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.error("Error cleaning up Fabric.js canvas:", error);
        }

        fabricCanvasRef.current = null;
        setCanvas(null);
      }
    }

    cleanupcanvas();
    
    initAttemptedRef.current = false;



    const initCanvas = async() => {
      if (typeof window === "undefined" ||
        !canvasRef.current ||
        initAttemptedRef.current) {
          return

      }

      initAttemptedRef.current = true;

      try {

        const fabricCanvas = await initializeFabric(canvasRef.current, containerRef.current);

        if(!fabricCanvas) {
          console.error("Fabric.js canvas initialization failed.");
          return;
        }

        fabricCanvasRef.current = fabricCanvas;
        setCanvas(fabricCanvas);  
        console.log("Fabric.js canvas initialized.");

      } catch (error) {
        console.error("Error initializing Fabric.js canvas:", error);
      }

    }

    const timer = setTimeout(() => {
      initCanvas();
    }, 50);

   
    return () => {
      clearTimeout(timer);
      cleanupcanvas();
    }

  }, []);





  return (
    <div className='relative w-full h-[600px] overflow-auto' ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas