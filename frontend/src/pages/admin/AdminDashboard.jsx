import { useState, useEffect } from "react";
import LogoutButton from "../../components/LogoutButton";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "Fantasy",
    status: "Ongoing",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Chapter management state
  const [selectedStory, setSelectedStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chapterForm, setChapterForm] = useState({
    title: "",
    content: "",
    chapterNumber: 1,
  });
  const [editingChapterId, setEditingChapterId] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/stories");
      const data = await res.json();
      const storiesData = Array.isArray(data) ? data : data.stories || [];
      setStories(storiesData);
    } catch (error) {
      console.error("Failed to fetch stories", error);
      setStories([]);
    }
  };

  const fetchChapters = async (storyId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/chapters/story/${storyId}`);
      const data = await res.json();
      setChapters(data);
      // Set next chapter number
      setChapterForm(prev => ({ ...prev, chapterNumber: data.length + 1 }));
    } catch (error) {
      console.error("Failed to fetch chapters", error);
    }
  };

  const handleOpenChapters = (story) => {
    setSelectedStory(story);
    fetchChapters(story._id);
  };

  const [chapterLoading, setChapterLoading] = useState(false);

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    setChapterLoading(true);
    const method = editingChapterId ? "PUT" : "POST";
    const url = editingChapterId
      ? `http://localhost:5000/api/chapters/${editingChapterId}`
      : "http://localhost:5000/api/chapters";

    const payload = editingChapterId
      ? { ...chapterForm, chapterNumber: Number(chapterForm.chapterNumber) }
      : { ...chapterForm, storyId: selectedStory._id, chapterNumber: Number(chapterForm.chapterNumber) };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setChapterForm({ title: "", content: "", chapterNumber: chapters.length + 1 });
        setEditingChapterId(null);
        fetchChapters(selectedStory._id);
        fetchStories(); // Refresh stories to update chaptersCount
        alert(editingChapterId ? "Chapter updated!" : "Chapter submitted successfully!");
      } else {
        alert(`Error: ${data.message || data.error || "Failed to save chapter"}`);
      }
    } catch (error) {
      console.error("Failed to save chapter:", error);
      alert("Network error: Could not connect to the server.");
    } finally {
      setChapterLoading(false);
    }
  };

  const handleEditChapter = (chapter) => {
    setEditingChapterId(chapter._id);
    setChapterForm({
      title: chapter.title,
      content: chapter.content,
      chapterNumber: chapter.chapterNumber,
    });
  };

  const handleDeleteChapter = async (id) => {
    if (window.confirm("Delete this chapter?")) {
      await fetch(`http://localhost:5000/api/chapters/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchChapters(selectedStory._id);
      fetchStories();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChapterChange = (e) => {
    setChapterForm({ ...chapterForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/stories/${editingId}`
      : "http://localhost:5000/api/stories";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          coverImage: formData.image // Send both to be safe
        }),
      });

      if (res.ok) {
        setFormData({ title: "", author: "", description: "", genre: "Fantasy", status: "Ongoing", image: "" });
        setEditingId(null);
        fetchStories();
      }
    } catch (error) {
      console.error("Failed to save story", error);
    }
    setLoading(false);
  };

  const handleEdit = (story) => {
    setEditingId(story._id);
    setFormData({
      title: story.title,
      author: story.author,
      description: story.description,
      genre: story.genre,
      status: story.status,
      image: story.image || story.coverImage || "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      await fetch(`http://localhost:5000/api/stories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchStories();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-blue-400">Nest Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block px-4 py-2 bg-slate-800 rounded-lg font-medium">
            Overview
          </Link>
          <button onClick={() => setSelectedStory(null)} className="w-full text-left px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            Manage Stories
          </button>
          <Link to="/library" className="block px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            View Site
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {!selectedStory ? (
          <>
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-800">Admin Control Center</h1>
                <p className="text-slate-500 mt-2">Manage your stories and monitor platform activity.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-end">
                  <span className="text-xs text-slate-400 uppercase font-bold">Total Stories</span>
                  <span className="text-2xl font-black text-slate-800">{stories.length}</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Create/Edit Story */}
              <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">{editingId ? "Edit Story" : "Add New Story"}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Story Title"
                    className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    type="text"
                    placeholder="Author Name"
                    className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <div className="relative">
                    <input
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      type="text"
                      placeholder="Image Name (e.g. Garden.jpg) or URL"
                      className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.image && (
                      <div className="mt-2 flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                        <img
                          src={formData.image.startsWith('http') || formData.image.startsWith('/') ? formData.image : `/images/${formData.image}`}
                          className="w-12 h-16 object-cover rounded shadow-sm"
                          alt="Preview"
                          onError={(e) => e.target.src = "https://via.placeholder.com/48x64?text=X"}
                        />
                        <span className="text-xs font-semibold text-blue-600">Image Preview</span>
                      </div>
                    )}
                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Synopsis"
                    rows="4"
                    className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 mb-2 uppercase ml-1">Genre</h3>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Fantasy</option>
                        <option>Action</option>
                        <option>Comedy</option>
                        <option>Adventure</option>
                        <option>Mystery</option>
                        <option>Romance</option>
                        <option>Horror</option>
                        <option>Sci_Fi</option>
                        <option>Drama</option>
                        <option>Thriller</option>
                        <option>Historical</option>
                        <option>General Fiction</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 mb-2 uppercase ml-1">Status</h3>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Ongoing</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
                  >
                    {loading ? "Saving..." : editingId ? "Update Story" : "Publish Story"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setFormData({ title: "", author: "", description: "", genre: "Fantasy", status: "Ongoing", image: "" }); }}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-bold transition-all"
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>

              {/* Manage Stories */}
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Platform Stories</h2>
                  <button onClick={fetchStories} className="text-blue-600 font-semibold hover:underline">Refresh List</button>
                </div>

                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                  {stories.map((story) => (
                    <div key={story._id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                      <div className="flex gap-6 items-center">
                        <img
                          src={(story.image || story.coverImage) && !(story.image || story.coverImage).startsWith('http') && !(story.image || story.coverImage).startsWith('/')
                            ? `/images/${story.image || story.coverImage}`
                            : (story.image || story.coverImage || "https://via.placeholder.com/150")}
                          alt=""
                          className="w-16 h-20 object-cover rounded-lg bg-gray-200"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Img" }}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{story.title}</h3>
                          <p className="text-sm text-slate-500">by {story.author}</p>
                          <div className="flex gap-2 mt-3">
                            <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 rounded-full">{story.genre}</span>
                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-gray-100 text-slate-600 rounded-full`}>
                              {story.chaptersCount || 0} Chapters
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleOpenChapters(story)}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
                        >
                          Manage Chapters
                        </button>
                        <button
                          onClick={() => handleEdit(story)}
                          className="p-3 bg-white text-slate-600 rounded-xl shadow-sm hover:text-blue-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(story._id)}
                          className="p-3 bg-white text-slate-600 rounded-xl shadow-sm hover:text-red-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedStory(null)}
                className="p-3 bg-white border rounded-xl hover:bg-gray-50"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-800">Manage Chapters</h1>
                <p className="text-slate-500 italic">Editing chapters for: {selectedStory.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add/Edit Chapter Form */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <h2 className="text-xl font-bold mb-6 text-slate-800">
                  {editingChapterId ? "Edit Chapter" : "Add New Chapter"}
                </h2>
                <form onSubmit={handleChapterSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Chapter Title</label>
                    <input
                      name="title"
                      value={chapterForm.title}
                      onChange={handleChapterChange}
                      className="w-full p-4 bg-gray-50 rounded-xl mt-1 border-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Chapter {index}: Title Name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 ml-1">Chapter #</label>
                      <input
                        name="chapterNumber"
                        type="number"
                        value={chapterForm.chapterNumber}
                        onChange={handleChapterChange}
                        className="w-full p-4 bg-gray-50 rounded-xl mt-1 border-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Content</label>
                    <textarea
                      name="content"
                      rows="12"
                      value={chapterForm.content}
                      onChange={handleChapterChange}
                      className="w-full p-4 bg-gray-50 rounded-xl mt-1 border-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your chapter here..."
                      required
                    />
                  </div>
                  <button
                    disabled={chapterLoading}
                    className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${chapterLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1"}`}
                  >
                    {chapterLoading ? "Saving..." : editingChapterId ? "Update Chapter" : "Submit Chapter"}
                  </button>
                  {editingChapterId && (
                    <button
                      type="button"
                      onClick={() => { setEditingChapterId(null); setChapterForm({ title: "", content: "", chapterNumber: chapters.length + 1 }); }}
                      className="w-full bg-gray-100 text-slate-600 py-3 rounded-xl"
                    >
                      Cancel
                    </button>
                  )}
                </form>
              </div>

              {/* Chapter List */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <h2 className="text-xl font-bold mb-6 text-slate-800">Existing Chapters</h2>
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {chapters.map(chapter => (
                    <div key={chapter._id} className="p-4 bg-gray-50 rounded-xl border flex justify-between items-center group">
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-500">Ch. {chapter.chapterNumber}</span>
                        <h4 className="font-bold text-slate-800 line-clamp-1">{chapter.title}</h4>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditChapter(chapter)}
                          className="p-2 border bg-white rounded-lg hover:text-blue-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(chapter._id)}
                          className="p-2 border bg-white rounded-lg hover:text-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {chapters.length === 0 && (
                    <div className="text-center py-20 text-slate-400 italic">No chapters yet. Set the world in motion!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
