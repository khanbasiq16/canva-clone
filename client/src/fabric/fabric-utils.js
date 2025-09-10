

export const initialize = async(canvasEl , containerEl) => {
    try {

      const {Canvas , PancelBrush} = await import("fabric");

      const canvas = new Canvas(canvasEl, {
        preserveObjectStacking: true,
        isDrawingMode: false,
        renderOnAddRemove: true,
      });


      const brush = new PancelBrush(canvas);
      brush.width = 5;
      brush.color = "black";
      canvas.freeDrawingBrush = brush;
      

      return canvas;
    } catch (error) {
      console.error("Error initializing Fabric.js canvas:", error);
    }
}


export const centerCanvas = (canvas) => {
    if (!canvas) return;
  
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const viewportCenter = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    };
  
    const objects = canvas.getObjects();
    if (objects.length === 0) return;
  
    const group = new fabric.Group(objects, { originX: 'center', originY: 'center' });
    const groupCenter = group.getCenterPoint();
  
    const deltaX = viewportCenter.x - groupCenter.x;
    const deltaY = viewportCenter.y - groupCenter.y;
  
    objects.forEach((obj) => {
      obj.set({
        left: obj.left + deltaX,
        top: obj.top + deltaY,
      });
      obj.setCoords();
    });
  
    canvas.requestRenderAll();
  }


