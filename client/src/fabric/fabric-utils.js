

export const initializeFabric = async(canvasEl , containerEl) => {
    try {

      const {Canvas , PencilBrush} = await import("fabric");

      const canvas = new Canvas(canvasEl, {
        preserveObjectStacking: true,
        isDrawingMode: false,
        renderOnAddRemove: true,
      });


      const brush = new PencilBrush(canvas);
      brush.width = 5;
      brush.color = "black";
      canvas.freeDrawingBrush = brush;
      

      return canvas;
    } catch (error) {
      console.error("Error initializing Fabric.js canvas:", error);
    }
}


export const centerCanvas = (canvas) => {
    if (!canvas || !canvas.wrapperEl) return;


    const canvasWrapper = canvas.wrapperEl;

    canvasWrapper.style.width = `${canvas.width}px`;
    canvasWrapper.style.height = `${canvas.height}px`;
    canvasWrapper.style.position = "absolute";
    canvasWrapper.style.left = "50%";
    canvasWrapper.style.top = "50%";
    canvasWrapper.style.transform = "translate(-50%, -50%)";

    // const canvasWidth = canvas.getWidth();
    // const canvasHeight = canvas.getHeight();
    // const viewportCenter = {
    //   x: canvasWidth / 2,
    //   y: canvasHeight / 2,
    // };
  
    // const objects = canvas.getObjects();
    // if (objects.length === 0) return;
  
    // const group = new fabric.Group(objects, { originX: 'center', originY: 'center' });
    // const groupCenter = group.getCenterPoint();
  
    // const deltaX = viewportCenter.x - groupCenter.x;
    // const deltaY = viewportCenter.y - groupCenter.y;
  
    // objects.forEach((obj) => {
    //   obj.set({
    //     left: obj.left + deltaX,
    //     top: obj.top + deltaY,
    //   });
    //   obj.setCoords();
    // });
  
    // canvas.requestRenderAll();
  }


