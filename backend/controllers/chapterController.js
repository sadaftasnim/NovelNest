import Chapter from "../models/Chapter.js";
import Story from "../models/Story.js";

// @desc    Add a new chapter
// @route   POST /api/chapters
// @access  Private/Admin
export const addChapter = async (req, res) => {
    try {
        const { storyId, title, content, chapterNumber } = req.body;

        const story = await Story.findById(storyId);
        if (!story) {
            console.error("Add Chapter Error: Story not found", storyId);
            return res.status(404).json({ message: "Story not found" });
        }

        const chapter = new Chapter({
            storyId,
            title,
            content,
            chapterNumber,
        });

        const savedChapter = await chapter.save();

        // Sync chapters array and count
        if (story.chapters && !story.chapters.includes(savedChapter._id)) {
            story.chapters.push(savedChapter._id);
        }
        story.chaptersCount = await Chapter.countDocuments({ storyId });
        await story.save();

        res.status(201).json(savedChapter);
    } catch (error) {
        console.error("Add Chapter Backend Error:", error);
        res.status(400).json({ error: error.message });
    }
};

// @desc    Get all chapters for a story
// @route   GET /api/chapters/story/:storyId
// @access  Public
export const getChaptersByStory = async (req, res) => {
    try {
        const chapters = await Chapter.find({ storyId: req.params.storyId })
            .sort({ chapterNumber: 1 });
        res.status(200).json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update a chapter
// @route   PUT /api/chapters/:id
// @access  Private/Admin
export const updateChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);

        if (chapter) {
            chapter.title = req.body.title || chapter.title;
            chapter.content = req.body.content || chapter.content;
            chapter.chapterNumber = req.body.chapterNumber || chapter.chapterNumber;

            const updatedChapter = await chapter.save();
            res.json(updatedChapter);
        } else {
            res.status(404).json({ message: "Chapter not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Delete a chapter
// @route   DELETE /api/chapters/:id
// @access  Private/Admin
export const deleteChapter = async (req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id);

        if (chapter) {
            const storyId = chapter.storyId;
            await chapter.deleteOne();

            // Update chapters array and count in Story
            const story = await Story.findById(storyId);
            if (story) {
                if (story.chapters) {
                    story.chapters = story.chapters.filter(id => id.toString() !== req.params.id);
                }
                story.chaptersCount = await Chapter.countDocuments({ storyId });
                await story.save();
            }
            res.json({ message: "Chapter removed" });
        } else {
            res.status(404).json({ message: "Chapter not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
