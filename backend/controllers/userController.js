import User from "../models/User.js";

// @desc    Get user profile with progress and bookmarks
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("bookmarks")
            .populate("readingProgress.storyId");

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                bookmarks: user.bookmarks,
                readingProgress: user.readingProgress,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Toggle bookmark
// @route   POST /api/auth/bookmark/:id
// @access  Private
export const toggleBookmark = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const storyId = req.params.id;

        if (user.bookmarks.includes(storyId)) {
            user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
        } else {
            user.bookmarks.push(storyId);
        }

        await user.save();
        res.json({ bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update reading progress
// @route   POST /api/auth/progress
// @access  Private
export const updateProgress = async (req, res) => {
    try {
        const { storyId, status, progress } = req.body;
        const user = await User.findById(req.user._id);

        const existingProgress = user.readingProgress.find(
            (p) => p.storyId.toString() === storyId
        );

        if (existingProgress) {
            existingProgress.status = status || existingProgress.status;
            existingProgress.progress = progress || existingProgress.progress;
            existingProgress.lastRead = Date.now();
        } else {
            user.readingProgress.push({
                storyId,
                status: status || "In Progress",
                progress: progress || 0,
            });
        }

        await user.save();
        res.json({ readingProgress: user.readingProgress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
