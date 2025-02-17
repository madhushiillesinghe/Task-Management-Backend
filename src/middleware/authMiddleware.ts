import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/auth/UserModel"; // Correct import for User model
import { IUser } from "../models/auth/UserModel"; // Use named import for IUser

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Ensure the user type is extended for the request object
    }
  }
}

// protect middleware
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(401).json({ message: "Not authorized, please login!" });
        return; // End execution
      }

      // Type the decoded token properly
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return; // End execution
      }

      req.user = user; // Attach the user to the request
      next(); // Call next middleware
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed!" });
    }
  }
);

// admin middleware
export const adminMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.user && req.user.role === "admin") {
      return next(); // Proceed to next middleware
    }
    res.status(403).json({ message: "Only admins can do this!" });
  }
);

// creator middleware
export const creatorMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (
      req.user &&
      (req.user.role === "creator" || req.user.role === "admin")
    ) {
      return next(); // Proceed to next middleware
    }
    res.status(403).json({ message: "Only creators can do this!" });
  }
);

// verified middleware
export const verifiedMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.user && req.user.isVerified) {
      return next(); // Proceed to next middleware
    }
    res.status(403).json({ message: "Please verify your email address!" });
  }
);
