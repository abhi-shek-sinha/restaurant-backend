import express from "express";
import multer from "multer";
import { authenticateJWT } from "../../middleware/auth";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "./controller";

const menuRoute = express.Router();
const upload = multer({ dest: "assets/uplodedPictures" });

menuRoute.post("/", authenticateJWT, upload.single("image"), createMenuItem);
menuRoute.get("/", getMenuItems);
menuRoute.put("/:id", authenticateJWT, upload.single("image"), updateMenuItem);
menuRoute.delete("/:id", deleteMenuItem);

export default menuRoute;
