import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import TaskModel from "../../models/task/TaskModel";
import {IUser} from "../../models/auth/UserModel";
import asyncHandler from 'express-async-handler';
import User from "../../models/auth/UserModel";


// Create Task Controller
export const createTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Validate required fields
    if (!title || title.trim() === "") {
       res.status(400).json({ message: "Title is required!" });
       return ;
    }

    // Create a new task and save it
    const task = new TaskModel({
      title,
      description: description || "No description",
      dueDate: dueDate || new Date(),
      priority: priority || "low",
      status: status || "active",
      completed: false, // Default value
      user: (req.user as IUser)._id, // Attach the logged-in user's ID to the task
    });

    await TaskModel.create(task);
     res.status(201).json(task); // Respond with the created task
  } catch (error: any) {
    console.error("Error creating task:", error.message);
     res.status(500).json({ message: error.message });
  }
});

// Get all tasks for a specific user
export const getTasks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as IUser)._id; // Get the logged-in user's ID
    console.log("Logged-in User ID:", userId);

    // Find tasks that belong to the logged-in user
    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({ length: tasks.length, tasks });
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: error.message });
  }
});


// Get a single task by ID
export const getTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as IUser)._id;
    const { id } = req.params;

    if (!id) {
       res.status(400).json({ message: "Please provide a task ID" });
       return
    }

    // Find task by ID
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return
    }


     res.status(200).json(task);
  } catch (error: any) {
    console.error("Error fetching task:", error.message);
     res.status(500).json({ message: error.message });
     return
  }
});

// Update a task by ID
export const updateTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as IUser)._id;
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } = req.body;

    if (!id) {
       res.status(400).json({ message: "Please provide a task ID" });
      return
    }

    // Find the task by ID
    const task = await TaskModel.findById(id);
    if (!task) {
       res.status(404).json({ message: "Task not found" });
      return
    }


    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed !== undefined ? completed : task.completed; // Update if provided

    await TaskModel.create(task);
     res.status(200).json(task);
  } catch (error: any) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: error.message });
    return
  }
});

// Delete a task by ID
export const deleteTask = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as IUser)._id;
    const { id } = req.params;

    // Find the task by ID
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return
    }


    // Delete the task
    await TaskModel.findByIdAndDelete(id);
     res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting task:", error.message);
     res.status(500).json({ message: error.message });
    return
  }
});
