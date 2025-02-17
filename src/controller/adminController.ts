import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/auth/UserModel";
import { IUser } from "../models/auth/UserModel"; // Assuming IUser interface exists for typing

// Delete User
export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Cannot delete user", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred", error });
    }
  }
});

// Get All Users
export const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();

    if (!users || users.length === 0) {
       res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Cannot get users", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred", error });
    }
  }
});
