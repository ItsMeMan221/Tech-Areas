import { v2 as cloudinary } from "cloudinary";

const uploadController = async (req, res) => {
  const base64ImageString = req.body.base64Image;
  if (!base64ImageString) {
    return res.status(400).json({ error: "Missing base64 image string" });
  }

  // Check the image type

  const imageType = base64ImageString.split(",")[0].split(":")[1];
  if (!["image/png", "image/jpg", "image/jpeg"].includes(imageType)) {
    return res.status(400).json({ error: "Invalid image type" });
  }

  // Check the image size

  const imageSize = Buffer.from(base64ImageString, "base64").length;
  if (imageSize > 1024 * 1024) {
    return res.status(400).json({ error: "Image size too large" });
  }
  const uploadResult = await cloudinary.uploader.upload(base64ImageString);
  res.status(200).json(uploadResult);
};
export { uploadController };
