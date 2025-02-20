import { Request, Response, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import User from "../models/auth/UserModel";
import generateToken from "../helpers/generateToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../models/auth/Token";
import crypto from "node:crypto";
import hashToken from "../helpers/hashToken";
import sendEmail from "../helpers/sendEmail";

// Register User
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return; // Don't return res, just handle the response.
  }

  if (password.length < 6) {
    res.status(400).json({ message: "Password must be at least 6 characters" });
    return; // Handle response
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return; // Handle response
  }

  const user = await User.create({ name, email, password });
  const userId = user._id as string; // or `as number` if it's supposed to be a number

  const token = generateToken(userId);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    sameSite: "none",
    secure: true,
  });

  const { _id, name: userName, email: userEmail, role, photo, bio, isVerified } = user;

  res.status(201).json({
    _id,
    userName,
    userEmail,
    role,
    photo,
    bio,
    isVerified,
    token,
  });
});

// Login User
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return; // Handle response
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found, sign up!" });
    return; // Handle response
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return; // Handle response
  }
  const userId = user._id as string; // or `as number` if it's supposed to be a number
  const token = generateToken(userId);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    sameSite: "none",
    secure: true,
  });

  const { _id, name, email: userEmail, role, photo, bio, isVerified } = user;

  res.status(200).json({
    _id,
    name,
    userEmail,
    role,
    photo,
    bio,
    isVerified,
    token,
  });
});

// Logout User
export const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  res.status(200).json({ message: "User logged out" });
});

// Get User Profile
export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Check if req.user exists
  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    // 404 Not Found
    res.status(404).json({ message: "User not found" });
  }
});

// Update User
export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Check if req.user exists
  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const { name, bio, photo }: { name?: string; bio?: string; photo?: string } = req.body;
  user.name = name || user.name;
  user.bio = bio || user.bio;
  user.photo = photo || user.photo;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    photo: updatedUser.photo,
    bio: updatedUser.bio,
    isVerified: updatedUser.isVerified,
  });
});
// User Login Status
export const userLoginStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Not authorized, please login!" });
    return; // Handle response
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  if (decoded) {
    res.status(200).json(true);
  } else {
    res.status(401).json(false);
  }
});

// Email Verification
export const verifyEmail = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Check if req.user exists
  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Further logic remains the same...
});

// Verify User
export const verifyUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Check if req.user exists
  if (!req.user || !req.user._id) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  // Further logic remains the same...
});
