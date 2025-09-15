import { shapeDefinitions } from "./shapes/shape-definition";
import { createShape } from "./shapes/shape-factory";


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


  export const addShapeToCanvas = async (canvas, shapeType, customProps = {}) => {
  if (!canvas) return null;
  try {
    const fabricModule = await import("fabric");

    const shape = createShape(fabricModule, shapeType, shapeDefinitions, {
      left: 100,
      top: 100,
      ...customProps,
    });

    if (shape) {
      shape.id = `${shapeType}-${Date.now()}`;
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
      return shape;
    }
  } catch (e) {}
};



export const addTextToCanvas = async (
  canvas,
  text,
  options = {},
  withBackground = false
) => {
  if (!canvas) return null;

  try {
    const { IText } = await import("fabric");

    const defaultProps = {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: "Arial",
      fill: "#000000",
      padding: withBackground ? 10 : 0,
      textAlign: "left",
      id: `text-${Date.now()}`,
    };

    const textObj = new IText(text, {
      ...defaultProps,
      ...options,
    });

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    return textObj;
  } catch (e) {
    return null;
  }
};


export const toggleDrawingMode = (
  canvas,
  isDrawingMode,
  drawingColor = "#000000",
  brushWidth = 5
) => {
  if (!canvas) return null;

  try {
    canvas.isDrawingMode = isDrawingMode;
    if (isDrawingMode) {
      canvas.freeDrawingBrush.color = drawingColor;
      canvas.freeDrawingBrush.width = brushWidth;
    }

    return true;
  } catch (e) {
    return false;
  }
};


export const toggleEraseMode = (
  canvas,
  isErasing,
  previousColor = "#000000",
  eraserWidth = 20
) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    if (isErasing) {
      canvas.freeDrawingBrush.color = "#ffffff";
      canvas.freeDrawingBrush.width = eraserWidth;
    } else {
      canvas.freeDrawingBrush.color = previousColor;
      canvas.freeDrawingBrush.width = 5;
    }

    return true;
  } catch (e) {
    return false;
  }
};



export const addImageToCanvas = async (canvas, imageUrl) => {
  if (!canvas) return null;

  try {
    const { Image: FabricImage } = await import("fabric");

    let imgObj = new Image();
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = imageUrl;

    return new Promise((resolve, reject) => {
      imgObj.onload = () => {
        let image = new FabricImage(imgObj);
        image.set({
          id: `image-${Date.now()}`,
          top: 100,
          left: 100,
          padding: 10,
          cornorSize: 10,
        });

        const maxDimension = 400;

        if (image.width > maxDimension || image.height > maxDimension) {
          if (image.width > image.height) {
            const scale = maxDimension / image.width;
            image.scale(scale);
          } else {
            const scale = maxDimension / image.height;
            image.scale(scale);
          }
        }

        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.renderAll();
        resolve(image);
      };

      imgObj.onerror = () => {
        reject(new Error("Failed to load image", imageUrl));
      };
    });
  } catch (error) {
    console.error("Error adding image");

    return null;
  }
};


export const updateDrawingBrush = (canvas, properties = {}) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    const { color, width, opacity } = properties;
    if (color !== undefined) {
      canvas.freeDrawingBrush.color = color;
    }

    if (width !== undefined) {
      canvas.freeDrawingBrush.width = width;
    }

    if (opacity !== undefined) {
      canvas.freeDrawingBrush.opacity = opacity;
    }

    return true;
  } catch (e) {
    return false;
  }
};


export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous"; // CORS issue avoid

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      resolve(canvas.toDataURL("image/png")); // cropped image as base64
    };

    image.onerror = (err) => reject(err);
  });
}