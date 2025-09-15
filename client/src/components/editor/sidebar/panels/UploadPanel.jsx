// "use client"
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { addImageToCanvas } from '@/fabric/fabric-utils';
// import { fetchWithAuth } from '@/services/base-service';
// import { uploadFileWithAuth } from '@/services/upload-services';
// import { useEditorStore } from '@/store';
// import { Loader2, Upload } from 'lucide-react';
// import { useSession } from 'next-auth/react';
// import React, { useCallback, useEffect, useState } from 'react'

// const UploadPanel = () => {

//     const { canvas } = useEditorStore();

//   const [isUploading, setIsUploading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userUploads, setUserUploads] = useState([]);

//   const { data: session, status } = useSession();

//   const fetchUserUploads = useCallback(async () => {
//     if (status !== "authenticated" || !session?.idToken) return;

//     try {
//       setIsLoading(true);
//       const data = await fetchWithAuth("/v1/media/get");
//       console.log(data, "fetchUserUploads");
//       setUserUploads(data?.data || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [status, session?.idToken]);

//   useEffect(() => {
//     if (status === "authenticated") fetchUserUploads();
//   }, [status, fetchUserUploads]);

//   const handleFileUpload = async (e) => {
//     console.log(e.target.files);
//     const file = e.target.files[0];

//     setIsUploading(true);

//     try {
//       const result = await uploadFileWithAuth(file);

//       setUserUploads((prev) => [result?.data, ...prev]);

//       console.log(result);
//     } catch (e) {
//       console.error("Error while uploading the file");
//     } finally {
//       setIsUploading(false);
//       e.target.value = "";
//     }
//   };

//   const handleAddImage = (imageUrl) => {
//     if (!canvas) return;
//     addImageToCanvas(canvas, imageUrl);
//   };

//   return (
//      <div className="h-full overflow-y-auto">
//       <div className="p-4 space-y-4">
//         <div className="flex gap-2">
//           <Label
//             className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white
//           rounded-md cursor-pointer h-12 font-medium transition-colors ${
//             isUploading ? "opacity-70 cursor-not-allowed" : ""
//           }
//           `}
//           >
//             <Upload className="w-5 h-5" />
//             <span>{isUploading ? "Uploading..." : "Upload Files"}</span>
//             <Input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileUpload}
//               disabled={isUploading}
//             />
//           </Label>
//         </div>
//         <div className="mt-5">
//           <h4 className="text-sm text-gray-500 mb-5">Your Uploads</h4>
//           {isLoading ? (
//             <div className="border p-6 flex rounded-md items-center justify-center">
//               <Loader2 className="w-4 h-4" />
//               <p className="font-bold text-sm">Loading your uploads...</p>
//             </div>
//           ) : userUploads.length > 0 ? (
//             <div className="grid grid-cols-3 gap-4">
//               {userUploads.map((imageData) => (
//                 <div
//                   className="aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity relative group"
//                   key={imageData._id}
//                   onClick={() => handleAddImage(imageData.url)}
//                 >
//                   <img
//                     src={imageData.url}
//                     alt={imageData.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>No Uploads yet</div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UploadPanel

// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { addImageToCanvas } from "@/fabric/fabric-utils";
// import { fetchWithAuth } from "@/services/base-service";
// import { uploadFileWithAuth } from "@/services/upload-services";
// import { useEditorStore } from "@/store";
// import { Loader2, Upload } from "lucide-react";
// import { useSession } from "next-auth/react";
// import React, { useCallback, useEffect, useState } from "react";

// const UploadPanel = () => {
//   const { canvas } = useEditorStore();

//   const [isUploading, setIsUploading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userUploads, setUserUploads] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null); // modal ke liye
//   const [scale, setScale] = useState(1); // resize slider
//   const [metaData, setMetaData] = useState({ name: "", description: "" });

//   const { data: session, status } = useSession();

//   const fetchUserUploads = useCallback(async () => {
//     if (status !== "authenticated" || !session?.idToken) return;

//     try {
//       setIsLoading(true);
//       const data = await fetchWithAuth("/v1/media/get");
//       setUserUploads(data?.data || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [status, session?.idToken]);

//   useEffect(() => {
//     if (status === "authenticated") fetchUserUploads();
//   }, [status, fetchUserUploads]);

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     setIsUploading(true);

//     try {
//       const result = await uploadFileWithAuth(file);
//       setUserUploads((prev) => [result?.data, ...prev]);
//     } catch (e) {
//       console.error("Error while uploading the file");
//     } finally {
//       setIsUploading(false);
//       e.target.value = "";
//     }
//   };

//   const handleOpenModal = (imageData) => {
//     setSelectedImage(imageData);
//     setScale(1);
//     setMetaData({ name: imageData.name, description: imageData.description || "" });
//   };

//   const handleAddToCanvas = () => {
//     if (!canvas || !selectedImage) return;
//     addImageToCanvas(canvas, selectedImage.url, { scaleX: scale, scaleY: scale });
//     setSelectedImage(null);
//   };

//   return (
//     <div className="h-full overflow-y-auto">
//       <div className="p-4 space-y-4">
//         <div className="flex gap-2">
//           <Label
//             className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white
//           rounded-md cursor-pointer h-12 font-medium transition-colors ${
//             isUploading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//           >
//             <Upload className="w-5 h-5" />
//             <span>{isUploading ? "Uploading..." : "Upload Files"}</span>
//             <Input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileUpload}
//               disabled={isUploading}
//             />
//           </Label>
//         </div>
//         <div className="mt-5">
//           <h4 className="text-sm text-gray-500 mb-5">Your Uploads</h4>
//           {isLoading ? (
//             <div className="border p-6 flex rounded-md items-center justify-center gap-2">
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <p className="font-bold text-sm">Loading your uploads...</p>
//             </div>
//           ) : userUploads.length > 0 ? (
//             <div className="grid grid-cols-3 gap-4">
//               {userUploads.map((imageData) => (
//                 <div
//                   className="aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity relative group cursor-pointer"
//                   key={imageData._id}
//                   onClick={() => handleOpenModal(imageData)}
//                 >
//                   <img
//                     src={imageData.url}
//                     alt={imageData.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>No Uploads yet</div>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Edit Image</DialogTitle>
//           </DialogHeader>
//           {selectedImage && (
//             <div className="space-y-4">
//               <img
//                 src={selectedImage.url}
//                 alt={selectedImage.name}
//                 className="w-full rounded-md border"
//               />

//               {/* Resize slider */}
//               <div>
//                 <Label>Resize</Label>
//                 <input
//                   type="range"
//                   min="0.1"
//                   max="2"
//                   step="0.1"
//                   value={scale}
//                   onChange={(e) => setScale(Number(e.target.value))}
//                   className="w-full"
//                 />
//               </div>

//               {/* Metadata inputs */}
//               <div>
//                 <Label>Name</Label>
//                 <Input
//                   value={metaData.name}
//                   onChange={(e) => setMetaData({ ...metaData, name: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <Label>Description</Label>
//                 <Input
//                   value={metaData.description}
//                   onChange={(e) => setMetaData({ ...metaData, description: e.target.value })}
//                 />
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="secondary" onClick={() => setSelectedImage(null)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddToCanvas}>Add to Canvas</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UploadPanel;


// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import getCroppedImg, { addImageToCanvas } from "@/fabric/fabric-utils";
// import { fetchWithAuth } from "@/services/base-service";
// import { uploadFileWithAuth } from "@/services/upload-services";
// import { useEditorStore } from "@/store";
// import { Loader2, Upload } from "lucide-react";
// import { useSession } from "next-auth/react";
// import React, { useCallback, useEffect, useState } from "react";
// import Cropper from "react-easy-crop";

// const UploadPanel = () => {
//   const { canvas } = useEditorStore();

//   const [isUploading, setIsUploading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [userUploads, setUserUploads] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [scale, setScale] = useState(1);
//   const [metaData, setMetaData] = useState({ name: "", description: "" });

//   // cropper states
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const { data: session, status } = useSession();

//   const fetchUserUploads = useCallback(async () => {
//     if (status !== "authenticated" || !session?.idToken) return;

//     try {
//       setIsLoading(true);
//       const data = await fetchWithAuth("/v1/media/get");
//       setUserUploads(data?.data || []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [status, session?.idToken]);

//   useEffect(() => {
//     if (status === "authenticated") fetchUserUploads();
//   }, [status, fetchUserUploads]);

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     setIsUploading(true);

//     try {
//       const result = await uploadFileWithAuth(file);
//       setUserUploads((prev) => [result?.data, ...prev]);
//     } catch (e) {
//       console.error("Error while uploading the file");
//     } finally {
//       setIsUploading(false);
//       e.target.value = "";
//     }
//   };

//   const handleOpenModal = (imageData) => {
//     setSelectedImage(imageData);
//     setScale(1);
//     setZoom(1);
//     setCrop({ x: 0, y: 0 });
//     setMetaData({ name: imageData.name, description: imageData.description || "" });
//   };

//   const onCropComplete = useCallback((_, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleAddToCanvas = async () => {
//     if (!canvas || !selectedImage) return;
//     try {
//       const croppedImage = await getCroppedImg(selectedImage.url, croppedAreaPixels);
//       addImageToCanvas(canvas, croppedImage, { scaleX: scale, scaleY: scale });
//       setSelectedImage(null);
//     } catch (e) {
//       console.error("Crop error:", e);
//     }
//   };

//   return (
//     <div className="h-full overflow-y-auto">
//       <div className="p-4 space-y-4">
//         {/* Upload button */}
//         <div className="flex gap-2">
//           <Label
//             className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white
//           rounded-md cursor-pointer h-12 font-medium transition-colors ${
//             isUploading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//           >
//             <Upload className="w-5 h-5" />
//             <span>{isUploading ? "Uploading..." : "Upload Files"}</span>
//             <Input
//               type="file"
//               className="hidden"
//               accept="image/*"
//               onChange={handleFileUpload}
//               disabled={isUploading}
//             />
//           </Label>
//         </div>

//         {/* Uploads list */}
//         <div className="mt-5">
//           <h4 className="text-sm text-gray-500 mb-5">Your Uploads</h4>
//           {isLoading ? (
//             <div className="border p-6 flex rounded-md items-center justify-center gap-2">
//               <Loader2 className="w-4 h-4 animate-spin" />
//               <p className="font-bold text-sm">Loading your uploads...</p>
//             </div>
//           ) : userUploads.length > 0 ? (
//             <div className="grid grid-cols-3 gap-4">
//               {userUploads.map((imageData) => (
//                 <div
//                   className="aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity relative group cursor-pointer"
//                   key={imageData._id}
//                   onClick={() => handleOpenModal(imageData)}
//                 >
//                   <img
//                     src={imageData.url}
//                     alt={imageData.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>No Uploads yet</div>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Edit & Crop Image</DialogTitle>
//           </DialogHeader>
//           {selectedImage && (
//             <div className="space-y-4">
//               {/* Cropper */}
//               <div className="relative w-full h-64 bg-black">
//                 <Cropper
//                   image={selectedImage.url}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={4 / 3} // fixed aspect ratio, change as needed
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={onCropComplete}
//                 />
//               </div>

//               {/* Zoom slider */}
//               <div>
//                 <Label>Zoom</Label>
//                 <input
//                   type="range"
//                   min="1"
//                   max="3"
//                   step="0.1"
//                   value={zoom}
//                   onChange={(e) => setZoom(Number(e.target.value))}
//                   className="w-full"
//                 />
//               </div>

//               {/* Resize scale */}
//               <div>
//                 <Label>Resize (after crop)</Label>
//                 <input
//                   type="range"
//                   min="0.1"
//                   max="2"
//                   step="0.1"
//                   value={scale}
//                   onChange={(e) => setScale(Number(e.target.value))}
//                   className="w-full"
//                 />
//               </div>

//               {/* Metadata inputs */}
//               <div>
//                 <Label>Name</Label>
//                 <Input
//                   value={metaData.name}
//                   onChange={(e) => setMetaData({ ...metaData, name: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <Label>Description</Label>
//                 <Input
//                   value={metaData.description}
//                   onChange={(e) => setMetaData({ ...metaData, description: e.target.value })}
//                 />
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="secondary" onClick={() => setSelectedImage(null)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddToCanvas}>Add to Canvas</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UploadPanel;


"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import getCroppedImg, { addImageToCanvas } from "@/fabric/fabric-utils";
import { fetchWithAuth } from "@/services/base-service";
import { uploadFileWithAuth } from "@/services/upload-services";
import { useEditorStore } from "@/store";
import { Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";

const UploadPanel = () => {
  const { canvas } = useEditorStore();

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userUploads, setUserUploads] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [metaData, setMetaData] = useState({ name: "", description: "" });

  // cropper states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const { data: session, status } = useSession();

  const fetchUserUploads = useCallback(async () => {
    if (status !== "authenticated" || !session?.idToken) return;

    try {
      setIsLoading(true);
      const data = await fetchWithAuth("/v1/media/get");
      setUserUploads(data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [status, session?.idToken]);

  useEffect(() => {
    if (status === "authenticated") fetchUserUploads();
  }, [status, fetchUserUploads]);

  // ✅ upload helper
  const uploadFile = async (file) => {
    setIsUploading(true);
    try {
      const result = await uploadFileWithAuth(file);
      setUserUploads((prev) => [result?.data, ...prev]);
    } catch (e) {
      console.error("Error while uploading the file", e);
    } finally {
      setIsUploading(false);
    }
  };

  // normal file input
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) await uploadFile(file);
    e.target.value = "";
  };

  // ✅ Drag & Drop setup
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      for (const file of acceptedFiles) {
        await uploadFile(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
  });

  const handleOpenModal = (imageData) => {
    setSelectedImage(imageData);
    setScale(1);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setMetaData({ name: imageData.name, description: imageData.description || "" });
     addImageToCanvas(canvas, imageData);
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleAddToCanvas = async () => {
    if (!canvas || !selectedImage) return;
    try {
      const croppedImage = await getCroppedImg(selectedImage.url, croppedAreaPixels);
      addImageToCanvas(canvas, croppedImage, { scaleX: scale, scaleY: scale });
      setSelectedImage(null);
    } catch (e) {
      console.error("Crop error:", e);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* ✅ Upload + Drag & Drop */}
        <div
          {...getRootProps()}
          className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer transition ${
            isDragActive ? "border-purple-600 bg-purple-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-6 h-6 text-purple-600 mb-2" />
          {isUploading ? (
            <p className="text-sm text-gray-500">Uploading...</p>
          ) : isDragActive ? (
            <p className="text-sm text-purple-600 font-medium">Drop files here</p>
          ) : (
            <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
          )}
        </div>

        {/* Uploads list */}
        <div className="mt-5">
          <h4 className="text-sm text-gray-500 mb-5">Your Uploads</h4>
          {isLoading ? (
            <div className="border p-6 flex rounded-md items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <p className="font-bold text-sm">Loading your uploads...</p>
            </div>
          ) : userUploads.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {userUploads.map((imageData) => (
                <div
                  className="aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity relative group cursor-pointer"
                  key={imageData._id}
                  onClick={() => handleOpenModal(imageData)}
                >
                  <img
                    src={imageData.url}
                    alt={imageData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>No Uploads yet</div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit & Crop Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              {/* Cropper */}
              <div className="relative w-full h-64 bg-black">
                <Cropper
                  image={selectedImage.url}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* Zoom slider */}
              <div>
                <Label>Zoom</Label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Resize scale */}
              <div>
                <Label>Resize (after crop)</Label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Metadata */}
              <div>
                <Label>Name</Label>
                <Input
                  value={metaData.name}
                  onChange={(e) => setMetaData({ ...metaData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={metaData.description}
                  onChange={(e) => setMetaData({ ...metaData, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedImage(null)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCanvas}>Add to Canvas</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPanel;
