import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the interface for the User document
export interface IUser extends Document { // Added 'export' to make it a named export
  name: string;
  email: string;
  password: string;
  photo: string;
  bio: string;
  role: "user" | "admin" | "creator";
  isVerified: boolean;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add password!"],
  },
  photo: {
    type: String,
    default: "https://avatars.githubusercontent.com/u/19819005?v=4",
  },
  bio: {
    type: String,
    default: "I am a new user.",
  },
  role: {
    type: String,
    enum: ["user", "admin", "creator"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, minimize: true });

// Hash the password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create and export the User model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
