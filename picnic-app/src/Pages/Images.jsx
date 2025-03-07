import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import BASE_URL from "../environment";

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    let isMounted = true;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/images?page=${page}`);
        if (isMounted) {
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setImages((prevImages) => [...prevImages, ...response.data]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching images");
          showAlert("Error fetching images", "error");
        }
        console.error("Error fetching images", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDownload = async (url, title) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = title || "downloaded-file";
      link.click();
      URL.revokeObjectURL(link.href);
      showAlert("Image downloaded successfully", "success");
    } catch (err) {
      console.error("Error downloading file:", err);
      showAlert("Error downloading image", "error");
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/delete/${deleteId}`);
      if (response.status === 200) {
        showAlert("Image deleted successfully", "success");
        setImages((prevImages) => prevImages.filter((img) => img._id !== deleteId));
      } else {
        throw new Error("Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image", err);
      showAlert("Error deleting image", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const renderSkeleton = () => (
    <div className="bg-blue-700/50 p-4 rounded-xl shadow-lg">
      <div className="bg-blue-800/50 h-48 rounded-lg mb-4 animate-pulse"></div>
      <div className="h-6 bg-blue-800/50 rounded mb-4 animate-pulse"></div>
      <div className="h-6 bg-blue-800/50 rounded animate-pulse"></div>
    </div>
  );

  return (
    <section className="p-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white min-h-screen">
      <AnimatePresence>
        {alert && (
          <motion.div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
              alert.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-4xl font-extrabold text-center text-white mb-10" data-aos="fade-down">
         Photos
      </h2>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>{renderSkeleton()}</div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-center text-red-400" data-aos="fade-up">
          {error}
        </p>
      )}
      {images.length === 0 && !loading && (
        <p className="text-center text-gray-200" data-aos="fade-up">
          No images available.
        </p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((image) => (
          <motion.li
            key={image._id}
            className="bg-blue-700/50 backdrop-blur-md p-4 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            data-aos="fade-up"
          >
            <div
              className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
              style={{ backgroundImage: `url(${image.url})` }}
            ></div>
            <h3 className="text-lg font-bold text-center text-white mb-4">
              {image.title || "Untitled"}
            </h3>
            <div className="flex justify-between gap-2">
              <motion.button
                onClick={() => handleDownload(image.url, image.title)}
                className="flex-1 bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download
              </motion.button>
              <motion.button
                onClick={() => confirmDelete(image._id)}
                className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-blue-800/80 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <p className="mb-6 text-lg font-semibold text-white">
                Are you sure you want to delete this image?
              </p>
              <div className="flex justify-between gap-4">
                <motion.button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes, Delete
                </motion.button>
                <motion.button
                  onClick={cancelDelete}
                  className="flex-1 bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && hasMore && (
        <motion.button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="mt-10 bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg block mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-aos="fade-up"
        >
          Load More
        </motion.button>
      )}
      {!hasMore && (
        <p className="text-center mt-8 text-gray-200" data-aos="fade-up">
          No more Photo to load.
        </p>
      )}
    </section>
  );
};

export default ImageList;
