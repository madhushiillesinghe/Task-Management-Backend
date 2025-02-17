import mongoose, { Schema, Model, Document } from "mongoose";

// Define an interface for the Task document
interface ITask extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    status: "active" | "inactive";
    completed: boolean;
    priority: "low" | "medium" | "high";
    user: mongoose.Types.ObjectId;
}

// Define the schema
const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: [true, "Please provide a title"],
            unique: true,
        },
        description: {
            type: String,
            default: "No description",
        },
        dueDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create the model
const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
export { ITask };
