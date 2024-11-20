import { Request, Response } from "express-serve-static-core";
import bcrypt from "bcrypt";
import { User } from "./model";
import jwt from "jsonwebtoken";
import AppDataSource from "../../config/database.config";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    await AppDataSource.getRepository(User).save(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration unsuccessful", err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    console.log(process.env.SECRETE_KEY);
    const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: " server error unable to genrate token " });
  }
};

// const tokenBlacklist = new Set<string>();

// export const logout = async (req: Request, res: Response) => {
//   try {
//     const token = req.headers.authorization;
//     console.log(token);
//     if (!token) {
//       res.status(400).json({ message: "Token is required" });
//       return;
//     }

//     // Add the token to the blacklist
//     tokenBlacklist.add(token);
//     res.json({ message: "Logged out successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "unable to logOut", err });
//   }
// };

// export const isTokenBlacklisted = (token: string): boolean => {
//   return tokenBlacklist.has(token);
// };
