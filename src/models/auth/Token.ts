import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Token document
interface IToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  verificationToken: string;
  passwordResetToken: string;
  createdAt: Date;
  expiresAt: Date;
}

// Create the Token schema with the correct types
const TokenSchema: Schema = new Schema<IToken>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  verificationToken: {
    type: String,
    default: "",
  },

  passwordResetToken: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

// Create and export the model based on the schema
const Token = mongoose.model<IToken>("Token", TokenSchema);

export default Token;
