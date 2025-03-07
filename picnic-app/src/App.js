import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import WelcomeScreen from "./Pages/WelcomeScreen";
import HeroPage from "./components/Heropage";
import ImageList from "./components/ImageList";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const LandingPage = ({ showWelcome, setShowWelcome, images, handleImageDelete, handleImageDownload }) => (
  <>
    <AnimatePresence mode="wait">
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
    </AnimatePresence>

    {!showWelcome && (
      <>
        <HeroPage />
        {/* Contact Us Link */}
        <div className="text-center my-8">
          <Link
            to="/contact-us"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Contact Us
          </Link>
        </div>
        <ImageList
          images={images}
          onDelete={handleImageDelete}
          onDownload={handleImageDownload}
        />
      </>
    )}
  </>
);

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [images, setImages] = useState([]);

  // Add Image
  const handleImageUpload = (image) => {
    const imageUrl = URL.createObjectURL(image.image); // Create object URL for local files
    const newImage = {
      id: uuidv4(), // Generate a unique ID for the image
      title: image.title,
      image: image.image,
      url: imageUrl, // Local URL
    };
    setImages([...images, newImage]); // Add new image with URL to the state
  };

  // Delete Image
  const handleImageDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  // Download Image
  const handleImageDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title;
    link.click();
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route
          path="/"
          element={
            <LandingPage
              showWelcome={showWelcome}
              setShowWelcome={setShowWelcome}
              images={images}
              handleImageDelete={handleImageDelete}
              handleImageDownload={handleImageDownload}
            />
          }
        />

       
      </Routes>
    </Router>
  );
};

export default App;
