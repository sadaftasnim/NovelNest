import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  genre: String,
  status: String,
});

const Story = mongoose.model("Story", storySchema);

export default Story;   
