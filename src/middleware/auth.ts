import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import { isTokenBlacklisted } from "../api/user/controller";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }

  // if (isTokenBlacklisted(token)) {
  //   res.status(403).json({ message: "Token has been blacklisted" });
  //   return;
  // }

  try {
    const decoded = jwt.verify(token, process.env.SECRETE_KEY!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
