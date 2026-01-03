import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  status: { type: String, default: "Ongoing" },
  image: { type: String },
  coverImage: { type: String },
  rating: { type: Number, default: 0 },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  views: { type: Number, default: 0 },
  chaptersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.model("Story", storySchema);

export default Story;
