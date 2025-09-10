"use client"

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



    const initializeCanvas = async() => {
      if (canvasRef.current && containerRef.current && !initAttemptedRef.current) {
        
      }

    }
  }, []);



  return (
    <div>Editor Canvas</div>
  )
}

export default Canvas