import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaBookOpen, FaUsers, FaBookReader  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 px-10 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-300">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">NovelNest</h2>
          <p className="mt-3 text-md">
            Your gateway to endless stories. Discover, read, and create
            captivating novels.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-md">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/library" className="hover:text-blue-400">Library</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* About Platform (NEW SECTION) */}
        <div>
          <h3 className="font-bold text-xl text-white mb-3">About Platform</h3>
          <ul className="space-y-3 text-md">
            <li className="flex items-center gap-3">
              <FaBookOpen className="text-blue-400" />
              Read Quality Novels
            </li>
          <li className="flex items-center gap-3">
            <FaBookReader  className="text-blue-400" />
            Explore New Authors
          </li>
         <li className="flex items-center gap-3">
              <FaUsers className="text-blue-400" />
              Curated Story Collections
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-xl text-white mb-3">Contact Us</h3>
          <ul className="space-y-3 text-md">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              support@novelnest.com
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-400" />
              India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © 2025 NovelNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
