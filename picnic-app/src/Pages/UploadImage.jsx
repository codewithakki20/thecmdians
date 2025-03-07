import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import BASE_URL from "../environment";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize AOS on component mount
  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim() || !image) {
      showAlert("Please provide a title and select an image.", "error");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert("Image uploaded successfully!", "success");
      console.log("Uploaded Image:", response.data);

      setTimeout(() => {
        navigate("/gallery");
      }, 1000); // Delay for success message visibility
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Error uploading image. Please try again.";
      showAlert(errorMessage, "error");
      console.error("Upload Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        showAlert("Invalid file type. Please upload a JPG or PNG image.", "error");
        setImage(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showAlert("File size exceeds the 5MB limit.", "error");
        setImage(null);
        return;
      }

      setImage(file);
    }
  };

  const showAlert = (message, type) => {
    setError(type === "error" ? message : "");
    setSuccessMessage(type === "success" ? message : "");
    setTimeout(() => {
      setError("");
      setSuccessMessage("");
    }, 3000); // Clear alert after 3 seconds
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="bg-blue-700/50 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {(error || successMessage) && (
            <motion.div
              className={`mb-6 px-4 py-3 rounded-lg shadow-lg text-white text-center ${
                error ? "bg-red-500" : "bg-teal-400"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {error || successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <h2
          className="text-4xl font-extrabold text-center text-white mb-8"
          data-aos="fade-down"
        >
          Upload Your Image
        </h2>

        <form onSubmit={handleUpload} className="space-y-6" data-aos="fade-up">
          <div>
            <input
              type="text"
              placeholder="Enter image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
              required
            />
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-white rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-400 file:text-blue-900 hover:file:bg-teal-300 transition duration-300"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-blue-900 ${
              loading
                ? "bg-blue-900/50 text-gray-400 cursor-not-allowed"
                : "bg-teal-400 hover:bg-teal-300"
            } transition duration-300`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadForm;
