import express from "express";
import Story from "../models/Story.js";

const router = express.Router();

// Create story
router.post("/", async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;   
