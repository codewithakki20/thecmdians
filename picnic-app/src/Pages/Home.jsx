import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextEvent, setNextEvent] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const events = [
    { title: "Yaadein 2.0 Farewell 2025", date: "February 25, 2025", location: "Hotel Anandaa Imperial Vypar Vhar Bilaspur " },
    { title: "Annual Function 2025", date: "February 2, 2025", location: "CMD College Bilaspur" },
    { title: "Azaad Rang 3.0", date: "March 11, 2025", location: "CMD Ground Bilaspur" },
    { title: "Pool Party 2025", date: "Coming Soon", location: "Coming Soon" },
    
    
    
  ];

  const calculateTimeLeft = useCallback((eventDate) => {
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { expired: false, days, hours, minutes, seconds };
  }, []);

  useEffect(() => {
    const findNextEvent = () => events.find((event) => new Date(event.date) > new Date());
    const event = findNextEvent();
    setNextEvent(event);
    setIsLoading(false);

    if (!event) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const updateCountdown = () => {
      const result = calculateTimeLeft(new Date(event.date));
      setTimeLeft(result);

      if (result.expired) {
        clearInterval(interval);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const handleImageError = (e) => {
    e.target.src = "/fallback-image.jpg";
  };

  const handleRegisterClick = (eventTitle) => {
    navigate(`/register/${eventTitle.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Secondary CTA */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-24 text-center shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-yellow-300">The CMDians</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Join us for unforgettable college moments - Farewell, Fresher Parties, Holi Celebrations, Annual Functions & more!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/feedback")}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Provide event feedback"
            >
              Share Your Experience
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-md hover:bg-teal-600 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              aria-label="Register for upcoming events"
            >
              Register Now
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Countdown Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
            {isLoading ? "Checking events..." : "Next Event Starts In"}
          </h2>
          {nextEvent ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700 font-medium">
                <span className="text-blue-600 font-bold">{nextEvent.title}</span> •{" "}
                <span className="text-gray-600">{nextEvent.date}</span>
              </p>
              <p className="text-gray-800 font-medium mb-4">
                Location: {nextEvent.location}
              </p>
              <div className="flex justify-center gap-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg shadow-md p-6">
                {timeLeft.expired ? (
                  <p className="text-xl md:text-2xl font-bold">Event in progress!</p>
                ) : (
                  [
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <span className="text-2xl md:text-3xl font-bold">{unit.value}</span>
                      <span className="text-sm md:text-base">{unit.label}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            !isLoading && (
              <p className="text-xl text-red-600 font-medium">
                No upcoming events scheduled
              </p>
            )
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
            Upcoming College Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Event Sponsors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
            Our Event Sponsors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "TechCorp", logo: "./cmdLogo.jpeg" },
              { name: "EduFund", logo: "./cec.jpeg" },
              { name: "Snackify", logo: "./jke.png" },
              { name: "GearUp", logo: "./dp.jpeg" },
              { name: "CampusCafe", logo: "./lcrt.avif" },
            ].map((sponsor, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`/${sponsor.logo}`}
                  alt={`${sponsor.name} logo`}
                  className="h-16 object-contain"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">
            Interested in sponsoring?{" "}
            <button
              onClick={() => navigate("/feedback")}
              className="text-teal-500 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-400"
              aria-label="Contact us about sponsorship opportunities"
            >
              Contact us
            </button>
          </p>
        </div>
      </section>

      {/* Featured Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
            Featured Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fresher Party 2024",
                description: "A night full of dance, music, and new friendships!",
                image: "./fresher.jpg",
              },
              {
                title: "Holi Bash 2024",
                description: "Colors, laughter, and unforgettable memories!",
                image: "./Holi Bash 2024.jpg",
              },
              {
                title: "Farewell 2024",
                description: "A heartfelt goodbye to our seniors with tears and cheers.",
                image: "./Farewell 2024.jpg",
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`/${highlight.image}`}
                  alt={highlight.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What People Say Section (Static Grid) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Sophomore",
                quote: "The Fresher Party was the best welcome I could’ve asked for—so much fun and great vibes!",
                avatar: "./priya.jpeg",
              },
              {
                name: "Rahul Verma",
                role: "Senior",
                quote: "Holi Bash was a blast! The colors and music made it unforgettable.",
                avatar: "./Rahul Verma.jpg",
              },
              {
                name: "Anjali Patel",
                role: "Alumni",
                quote: "Farewell Fiesta brought back so many memories. CMDians know how to throw a party!",
                avatar: "./Anjali Patel Headshot.jpeg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <img
                  src={`/${testimonial.avatar}`}
                  alt={`${testimonial.name}'s avatar`}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                  onError={handleImageError}
                  loading="lazy"
                />
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="text-blue-600 font-semibold">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-12">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["image1.jpg", "image2.jpeg", "image3.jpeg", "image4.jpeg"].map((src, index) => (
              <div
                key={src}
                className="relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <img
                  src={`/${src}`}
                  alt={`Event moment ${index + 1}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/gallery")}
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-md hover:bg-teal-600 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              aria-label="Browse all gallery images"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;