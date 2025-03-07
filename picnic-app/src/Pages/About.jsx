import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.2)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
            About CMD College
          </h1>
          <p className="mt-4 text-lg text-gray-100 max-w-2xl mx-auto">
            Discover the heart of education and exploration in Bilaspur, Chhattisgarh.
          </p>
        </div>

        {/* College Details Section */}
        <motion.div
          className="flex flex-col lg:flex-row bg-white/20 backdrop-blur-md shadow-xl rounded-xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:w-1/2" data-aos="fade-right">
            <img
              src="college-campus.jpg"
              alt="CMD College Campus"
              className="w-full h-96 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
            />
          </div>
          <div className="lg:w-1/2 p-8 text-gray-100" data-aos="fade-left">
            <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
              Our Institution
            </h2>
            <p className="leading-relaxed">
              CMD College stands as a beacon of educational excellence, offering modern facilities and a nurturing environment. Our dedicated faculty empowers students from diverse backgrounds to achieve their fullest potential.
            </p>
          </div>
        </motion.div>

        {/* Course Details Section */}
        <motion.div
          className="flex flex-col lg:flex-row-reverse bg-white/20 backdrop-blur-md shadow-xl rounded-xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="lg:w-1/2" data-aos="fade-left">
            <img
              src="./bsc.webp"
              alt="Students Learning"
              className="w-full h-96 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
            />
          </div>
          <div className="lg:w-1/2 p-8 text-gray-100" data-aos="fade-right">
            <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
              B.Sc. Program
            </h2>
            <p className="leading-relaxed">
              Our 3-year B.Sc. program blends theoretical knowledge with practical application. Supported by expert educators, students thrive in state-of-the-art labs and engaging lectures.
            </p>
          </div>
        </motion.div>

        {/* Picnic Locations Section */}
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-semibold text-center text-yellow-300 mb-8">
            Memorable Picnic Spots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Parsahi */}
            <motion.div
              className="bg-white/20 backdrop-blur-md shadow-lg rounded-xl overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="image4.jpeg"
                alt="Parsahi Picnic Spot"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-yellow-300">
                  Parsahi
                </h3>
                <p className="text-gray-100 mt-2">
                  A tranquil oasis surrounded by nature, ideal for relaxation and student bonding.
                </p>
              </div>
            </motion.div>

            {/* Golden Island */}
            <motion.div
              className="bg-white/20 backdrop-blur-md shadow-lg rounded-xl overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src="image1.jpg"
                alt="Golden Island Picnic Spot"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-yellow-300">
                  Golden Island
                </h3>
                <p className="text-gray-100 mt-2">
                  A scenic retreat offering peaceful vibes and stunning views for student getaways.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg text-gray-100 max-w-3xl mx-auto">
            At CMD College, we believe education extends beyond the classroom. Join us to shape your future and create lasting memories!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
