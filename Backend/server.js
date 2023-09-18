import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRoutes } from "./src/routes/user.routes.js";
import { articleRoutes } from "./src/routes/article.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/article", articleRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
