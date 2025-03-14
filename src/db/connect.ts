import mongoose from "mongoose";

// Create an asynchronous function to handle database connection
const connect = async (): Promise<void> => {
  try {
    console.log("Attempting to connect to the database...");

    // Use the environment variable for MongoDB URI connection
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to the database!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to connect to the database:", error.message);
    } else {
      console.error("Unknown error occurred during database connection");
    }
    process.exit(1); // Exit process if connection fails
  }
};

export default connect;
