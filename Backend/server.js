import express from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

import { userRoutes } from "./src/routes/user.routes.js";
import { articleRoutes } from "./src/routes/article.routes.js";
import { adminRoutes } from "./src/routes/admin.routes.js";
import { uploadRouter } from "./src/routes/upload.routes.js";

const app = express();
const port = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/article", articleRoutes);
app.use("api/v1/upload", uploadRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
