import Story from "../models/Story.js";

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
export const getStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Public
export const getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a story
// @route   POST /api/stories
// @access  Private/Admin
export const createStory = async (req, res) => {
    try {
        const storyData = { ...req.body };
        // Ensure both fields are set if either is provided
        const img = storyData.image || storyData.coverImage;
        if (img) {
            storyData.image = img;
            storyData.coverImage = img;
        }

        const story = new Story(storyData);
        const createdStory = await story.save();
        res.status(201).json(createdStory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Update a story
// @route   PUT /api/stories/:id
// @access  Private/Admin
export const updateStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (story) {
            story.title = req.body.title || story.title;
            story.author = req.body.author || story.author;
            story.description = req.body.description || story.description;
            story.genre = req.body.genre || story.genre;
            story.status = req.body.status || story.status;

            // Supporting both field names for maximum compatibility
            const newImage = req.body.image || req.body.coverImage;
            if (newImage) {
                story.image = newImage;
                story.coverImage = newImage;
            }

            const updatedStory = await story.save();
            res.json(updatedStory);
        } else {
            res.status(404).json({ message: "Story not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc    Delete a story
// @route   DELETE /api/stories/:id
// @access  Private/Admin
export const deleteStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (story) {
            await story.deleteOne();
            res.json({ message: "Story removed" });
        } else {
            res.status(404).json({ message: "Story not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
