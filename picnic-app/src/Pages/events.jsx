import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchEvents = async () => {
      try {
        // Replace this dummy data with your API call
        const dummyEvents = [
          {
            id: 1,
            title: 'Azaad Rang 3.0',
            date: '2025-03-11',
            description: 'Celebrate the festival of colors with us!',
            location: "CMD Ground Bilaspur",
            image: './Holi Bash 2024.jpg'
          },
          {
            id: 2,
            title: 'Pool Party 2025',
            date: 'Coming Soon',
            description: 'Join us for our annual function filled with fun and entertainment.',
            location: "Coming Soon" ,
            image: './Pool Party.webp'
          },
          {
            id: 3,
            title: 'Yaadein 2.0 Farewell 2025',
            date: '2023-05-10',
            description: 'A heartfelt farewell for our graduating students.',
            location: "Hotel Anandaa Imperial Vypar Vhar Bilaspur ",
            image: './Farewell 2024.jpg'
          }
        ];
        // Simulate API call delay
        setTimeout(() => {
          setEvents(dummyEvents);
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
          Upcoming Events
        </h1>
        {loading ? (
          <p className="text-center" data-aos="fade-up">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-400" data-aos="fade-up">{error}</p>
        ) : events.length === 0 ? (
          <p className="text-center" data-aos="fade-up">No events available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="bg-blue-700/50 rounded-lg overflow-hidden shadow-lg"
                data-aos="fade-up"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-sm mb-2">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-200">{event.description}</p>
                  <p className="text-gray-200">{event.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;