

// const axios = require("axios");
// const Media = require("../model/media");
// const { uploadMediaToCloudinary } = require("../utils/cloudinary");

// const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
// const STABILITY_ENGINE_ID = "stable-diffusion-v1-6";
// const STABILITY_API_HOST = "https://api.stability.ai";

// const generateImageFromAIAndUploadToDB = async (req, res) => {
//   const prompt = req.body.prompt;
//   const userId = req.user.userId;

//   if (!prompt) {
//     return res.status(400).json({ success: false, message: "Prompt is required" });
//   }

//   try {
//     const response = await axios.post(
//       `${STABILITY_API_HOST}/v2beta/stable-image/generate/core`,
//       {
//         prompt: prompt,
//         width: 512,
//         height: 512,
//         samples: 1,
//         steps: 30,
//         cfg_scale: 7,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${STABILITY_API_KEY}`,
//         },
//       }
//     );

//     const generatedImage = response.data.artifacts?.[0];
//     if (!generatedImage || !generatedImage.base64) {
//       throw new Error("No image generated from Stability AI");
//     }

//     const imageBuffer = Buffer.from(generatedImage.base64, "base64");

//     const file = {
//       buffer: imageBuffer,
//       originalName: `ai-generated-${Date.now()}.png`,
//       mimetype: "image/png",
//       size: imageBuffer.length,
//       width: 512,
//       height: 512,
//     };

//     const cloudinaryResult = await uploadMediaToCloudinary(file);

//     const newlyCreatedMedia = new Media({
//       userId,
//       name: `AI Generated ${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}`,
//       cloudinaryId: cloudinaryResult.public_id,
//       url: cloudinaryResult.secure_url,
//       mimeType: "image/png",
//       size: imageBuffer.length,
//       width: 512,
//       height: 512,
//     });

//     await newlyCreatedMedia.save();

//     return res.status(201).json({
//       success: true,
//       data: newlyCreatedMedia,
//       prompt,
//       seed: generatedImage.seed || null,
//       message: "AI image generated and uploaded to DB successfully",
//     });

//   } catch (e) {
//     console.error("Stability AI error:", e.response?.data || e.message);

//     res.status(500).json({
//       success: false,
//       message: "Fetch from AI and upload to DB failed! Please try again",
//     });
//   }
// };

// module.exports = { generateImageFromAIAndUploadToDB };

const axios = require("axios");
const FormData = require("form-data");
const Media = require("../model/media");
const { uploadMediaToCloudinary } = require("../utils/cloudinary");

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const STABILITY_ENGINE_ID = "stable-diffusion-v1-6";
const STABILITY_API_HOST = "https://api.stability.ai";

const generateImageFromAIAndUploadToDB = async (req, res) => {
  const prompt = req.body.prompt;
  const userId = req.user.userId;

  if (!prompt) {
    return res.status(400).json({ success: false, message: "Prompt is required" });
  }

  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("width", 512);
    formData.append("height", 512);
    formData.append("samples", 1);
    formData.append("steps", 30);
    formData.append("cfg_scale", 7);

    const response = await axios.post(
      `${STABILITY_API_HOST}/v2beta/stable-image/generate/core`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
        responseType: "arraybuffer", // image raw data
      }
    );

    // Convert response to buffer
    const imageBuffer = Buffer.from(response.data, "binary");

    const file = {
      buffer: imageBuffer,
      originalName: `ai-generated-${Date.now()}.png`,
      mimetype: "image/png",
      size: imageBuffer.length,
      width: 512,
      height: 512,
    };

    // Upload to Cloudinary
    const cloudinaryResult = await uploadMediaToCloudinary(file);

    // Save to MongoDB
    const newlyCreatedMedia = new Media({
      userId,
      name: `AI Generated ${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}`,
      cloudinaryId: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      mimeType: "image/png",
      size: imageBuffer.length,
      width: 512,
      height: 512,
    });

    await newlyCreatedMedia.save();

    return res.status(201).json({
      success: true,
      data: newlyCreatedMedia,
      prompt,
      message: "AI image generated and uploaded to DB successfully",
    });

  } catch (e) {
    console.error("Stability AI error:", e.response?.data || e.message);
    res.status(500).json({
      success: false,
      message: "Fetch from AI and upload to DB failed! Please try again",
    });
  }
};

module.exports = { generateImageFromAIAndUploadToDB };
