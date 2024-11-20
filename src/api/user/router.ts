import express from "express";
import { register, login } from "./controller";
import { authenticateJWT } from "../../middleware/auth";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
// userRoute.post("/logout", authenticateJWT, logout);

export default userRoute;
