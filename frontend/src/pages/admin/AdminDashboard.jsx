const AdminDashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create New Story */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Story</h2>

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Author"
            className="w-full mb-3 p-2 border rounded"
          />

          <textarea
            placeholder="Description"
            className="w-full mb-3 p-2 border rounded"
          />

          {/* Genres & Status */}
        <div className="grid grid-cols-2 gap-4 mb-4">
  
        {/* Genres */}
        <div>
            <h3 className="text-lg font-semibold mb-2">Genres</h3>
            <select className="p-2 border rounded w-full">
            <option>Fantasy</option>
            <option>Mystery</option>
            <option>Romance</option>
            <option>Adventure</option>
            <option>Comedy</option>
            <option>Horror</option>
            <option>Historical</option>
            </select>
        </div>

        {/* Status */}
        <div>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <select className="p-2 border rounded w-full">
            <option>Ongoing</option>
            <option>Completed</option>
            </select>
        </div>

        </div>


          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Add Story
          </button>
        </div>

        {/* Manage Stories */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Stories</h2>

          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">Life of Pie</h3>
            <p className="text-sm text-gray-600">by XYZ</p>

            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 text-xs bg-purple-200 rounded">
                Mystery
              </span>
              <span className="px-2 py-1 text-xs bg-green-200 rounded">
                Ongoing
              </span>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Add Chapters
              </button>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
