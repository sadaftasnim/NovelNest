import express from "express";
import {
    addChapter,
    getChaptersByStory,
    updateChapter,
    deleteChapter,
} from "../controllers/chapterController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, addChapter);
router.get("/story/:storyId", getChaptersByStory);
router
    .route("/:id")
    .put(protect, admin, updateChapter)
    .delete(protect, admin, deleteChapter);

export default router;
