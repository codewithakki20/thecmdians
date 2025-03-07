// src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFonud';

// Import your page components
import Home from './Pages/Home';
import About from './Pages/About';
import EventsPage from './Pages/events';
import Login from './Pages/Login';
import Signup from './Pages/Singup';
import UploadImage from './Pages/UploadImage';
import Feedback from './Pages/Feedback';
import Image from './Pages/Images';
import Register from './Pages/RegisterForm';
import Registered from './Pages/Registered';

import WelcomeScreen from './components/WelcomeScreen';

import './index.css';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000); // Show welcome screen for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Image />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registered" element={<Registered />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
