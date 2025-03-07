import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import BASE_URL from "../environment";

const Registered = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/users`);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const userVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-blue-700/50 backdrop-blur-md p-8 rounded-xl shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl font-extrabold text-center text-white mb-8"
            data-aos="fade-down"
          >
            Registered Users
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-6" data-aos="fade-up">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-white text-center" data-aos="fade-up">
              Loading users...
            </p>
          ) : users.length === 0 ? (
            <p className="text-white text-center" data-aos="fade-up">
              No registered users yet.
            </p>
          ) : (
            <AnimatePresence>
              <div className="space-y-6">
                {users.map((user) => (
                  <motion.div
                    key={user._id}
                    className="flex items-center justify-between p-6 bg-blue-900/30 border border-blue-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                    variants={userVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    data-aos="fade-up"
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={user.picture || "/default-avatar.png"}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border border-white"
                        onError={(e) => (e.target.src = "/default-avatar.png")}
                      />
                      <div>
                        <p className="font-bold text-lg text-white">
                          {user.name}
                        </p>
                        <p className="text-white">Father: {user.fatherName}</p>
                        <p className="text-white">Course: {user.course}</p>
                        <p className="text-white text-sm">{user.mobile}</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => confirmDelete(user._id)}
                      className="bg-red-400 text-white px-4 py-2 rounded-lg font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </motion.div>

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
                  Are you sure you want to delete this user?
                </p>
                <div className="flex justify-between gap-4">
                  <motion.button
                    onClick={() => handleDelete(deleteId)}
                    className="flex-1 bg-red-400 text-white font-semibold py-2 px-4 rounded-lg"
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
      </div>
    </div>
  );
};

export default Registered;
