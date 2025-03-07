import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BASE_URL from "../environment";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeedbackPage = () => {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchComments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.comment) {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newComment = await response.json();
          setComments([newComment, ...comments]);
          setFormData({ name: "", email: "", comment: "" });
        } else {
          console.error("Error posting comment:", response.statusText);
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/comments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== id));
      } else {
        console.error("Error deleting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white min-h-screen py-12 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-md shadow-xl rounded-xl w-full max-w-4xl mx-4 p-8">
        <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
          Share Your Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-white/30 border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-white/30 border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <textarea
            name="comment"
            rows="4"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 bg-white/30 border border-white rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            required
          ></textarea>
          <motion.button
            type="submit"
            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Post Comment
          </motion.button>
        </form>

        <div className="mt-12" data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold text-center mb-6">Community Feedback</h2>
          {comments.length === 0 ? (
            <p className="text-center">No comments yet. Share yours first!</p>
          ) : (
            <ul className="space-y-6">
              {comments.map((comment) => (
                <motion.li
                  key={comment._id}
                  className="bg-white/30 border border-white p-6 rounded-lg flex justify-between items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div>
                    <p className="italic">"{comment.comment}"</p>
                    <h4 className="font-semibold">- {comment.name}</h4>
                    <p className="text-sm">{comment.email}</p>
                  </div>
                  <motion.button
                    onClick={() => deleteComment(comment._id)}
                    className="text-red-400 font-semibold hover:text-red-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Delete
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;