import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
  readingProgress: [
    {
      storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
      status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
      lastRead: { type: Date, default: Date.now },
      progress: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model("User", UserSchema);
