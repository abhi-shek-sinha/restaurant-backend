import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import cors from "cors";
import env from "./config/environment.config";
import path from "path";
import { emailRouter, userRoute, menuRoute } from "./api";

const app = express();
export const PORT = env.app.port || 5000;

app.use(cors());
app.use(express.json());
app.use("/assets", express.static("assets"));

app.use("/api/email", emailRouter);
app.use("/api/user", userRoute);
app.use("/api/menu", menuRoute);

// app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public"))); // enable static folder

// If not found api then give message
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(`Can't find ${req.originalUrl} on the server`);
});

// Error Handle
process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  console.error("Uncaught Exception occurred! Shutting down...");
  process.exit(1);
});

export default app;
