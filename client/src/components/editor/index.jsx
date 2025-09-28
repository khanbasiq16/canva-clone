import React, { use, useCallback, useEffect, useState } from "react";
import Header from "./header";
import Canvas from "./canvas";
import Sidebar from "./sidebar";
import { useParams, useRouter } from "next/navigation";
import { useEditorStore } from "@/store";
import { getUserDesignByID } from "@/services/design-service";
import Properties from "./properties";

const MainEditor = () => {
  const params = useParams();
  const router = useRouter();
  const designID = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designID);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const { canvas, setDesignID, resetstore , IsEditing , setIsEditing ,  setName , showProperties ,setShowProperties} = useEditorStore();

  useEffect(() => {
    resetstore();

    if (designID) {
      setDesignID(designID);
    }

    return () => {
      resetstore();
    };
  }, []);

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
  }, [isLoading, canvas, designID]);

  useEffect(() => {
    if (canvas) {
      console.log("Canvas is Now Available in Editor Store");
    }
  }, [canvas]);

  const loadDesign = useCallback(async () => {
    if (!designID || !canvas || loadAttempted) return;

    try {
      setIsLoading(true);
      setLoadAttempted(true);

      // Simulate loading design data

      const response = await getUserDesignByID(designID);
      console.log("Design data fetched:", response);

      const desgin = response?.data;

      if (desgin) {
        
        setName(desgin.name || "Untitled Design");
        setDesignID(designID);

        try {
          if (desgin.canvasData) {
            canvas.clear();

            if (desgin.width && desgin.height) {
              canvas.setDimensions({
                width: desgin.width,
                height: desgin.height,
              });

              const convasData =
                typeof desgin.canvasData === "string"
                  ? JSON.parse(desgin.canvasData)
                  : desgin.canvasData;

              const hasobjects =
                convasData?.objects && convasData.objects.length > 0;

              if (convasData.background) {
                canvas.backgroundColor = convasData.background;
              } else {
                canvas.backgroundColor = "#ffffff";
              }

              if (!hasobjects) {
                canvas.renderAll();
                return true;
              }

              canvas
                .loadFromJSON(desgin.canvasData)
                .then((canvas) => canvas.requestRenderAll())
                .catch((err) =>
                  console.error("Error rendering canvas from JSON:", err)
                );
            }
          } else {
            console.log("No canvas data found in design.");

            canvas.clear();
            canvas.setWidth(desgin.width);
            canvas.setHeight(desgin.height);
            canvas.backgroundColor = "#ffffff";
            canvas.renderAll();
          }
        } catch (error) {
          console.error("Error applying design:", error);
          setError("Failed to apply design.");
          return;
        } finally {
          setIsLoading(false);
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error loading design:", err);
      setError("Failed to load design.");
      setIsLoading(false);
    }
  }, [designID, canvas, loadAttempted, setDesignID]);

  useEffect(() => {
    if (designID && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designID) {
      router.push("/");
    }
  }, [canvas, designID, loadAttempted, loadDesign, router]);

    useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = () => {
      const activeObject = canvas.getActiveObject();


      if (activeObject) {
        setShowProperties(true);
      }
    };

    const handleSelectionCleared = () => {
      setShowProperties(false);
    };

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas]);


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {IsEditing && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-auto bg-[#f0f0f0] flex items-center justify-center">
            <Canvas />
          </main>
        </div>
      </div>

       {showProperties && IsEditing  && <Properties />}
    </div>
  );
};

export default MainEditor;
