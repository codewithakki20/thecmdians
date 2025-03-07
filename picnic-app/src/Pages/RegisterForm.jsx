import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import BASE_URL from "../environment";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    course: "",
    picture: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const courses = [
    "B.Sc. Third Year",
    "B.Sc. Second Year",
    "B.Sc. First Year",
    "Other Course",
  ];

  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, picture: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      !formData.name ||
      !formData.fatherName ||
      !formData.mobile ||
      !formData.course ||
      !formData.picture
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (formData.mobile.length < 10) {
      setError("Mobile number must be at least 10 digits.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("fatherName", formData.fatherName);
    data.append("mobile", formData.mobile);
    data.append("course", formData.course);
    data.append("picture", formData.picture);

    try {
      await axios.post(`${BASE_URL}/api/v1/register`, data);
      alert("User registered successfully!");
      setFormData({
        name: "",
        fatherName: "",
        mobile: "",
        course: "",
        picture: null,
      });
      setPreview(null);
      navigate("/registered");
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Failed to register user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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
            Register
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-6" data-aos="fade-up">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up">
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
                required
                maxLength={15}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Select Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
                required
              >
                <option value="">Choose a course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Upload Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-blue-900/30 border border-blue-700 text-white rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-400 file:text-blue-900 hover:file:bg-teal-300 transition duration-300"
                required
              />
              {preview && (
                <motion.div
                  className="mt-4 flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border border-teal-300"
                  />
                </motion.div>
              )}
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
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
