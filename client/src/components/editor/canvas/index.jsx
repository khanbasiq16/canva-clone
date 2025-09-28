"use client"

import { customizeBoundingBox, initializeFabric } from '@/fabric/fabric-utils';
import { useEditorStore } from '@/store';
import React, { useEffect, useRef } from 'react'

const Canvas = () => {

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas , markAsModified} = useEditorStore();

  useEffect(() => {
    
    const cleanupcanvas = async() => {
      if (fabricCanvasRef.current) {

         try {
          fabricCanvasRef.current.off("object:added");
          fabricCanvasRef.current.off("object:modified");
          fabricCanvasRef.current.off("object:removed");
          fabricCanvasRef.current.off("path:created");
        } catch (e) {
          console.error("Error remvoing event listeners", e);
        }
        
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

        //apply custom style for the controls
        customizeBoundingBox(fabricCanvas);

        //set up event listeners
        const handleCanvasChange = () => {
          markAsModified();
        };

        fabricCanvas.on("object:added", handleCanvasChange);
        fabricCanvas.on("object:modified", handleCanvasChange);
        fabricCanvas.on("object:removed", handleCanvasChange);
        fabricCanvas.on("path:created", handleCanvasChange);

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