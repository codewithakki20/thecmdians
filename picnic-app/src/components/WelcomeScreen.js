import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); // Faster typing speed for better UX

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-teal-200">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-teal-400/20 to-blue-700/30 blur-3xl animate-pulse opacity-70" />
    <div className="absolute inset-0 bg-gradient-to-tl from-teal-300/10 via-transparent to-blue-900/10 blur-2xl animate-float opacity-50" />
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          'radial-gradient(circle at 20% 30%, rgba(30,144,255, 0.1) 0%, transparent 70%)',
          'radial-gradient(circle at 80% 70%, rgba(0,128,128, 0.1) 0%, transparent 70%)',
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
    />
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800); // Reduced for smoother transition
    }, 5000); // Reduced to 5 seconds for better UX

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(5px)',
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  const childVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-r from-blue-600 to-teal-500 text-white overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
            <div className="w-full max-w-3xl mx-auto text-center space-y-8">
              {/* Welcome Text */}
              <motion.div variants={childVariants}>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
                  data-aos="fade-up"
                >
                  <span className="block mb-4">
                    <TypewriterEffect text=" Welcome to The CMDians" />
                  </span>
                  <span
                    className="block bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    Adventure awaits you!
                  </span>
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.p
                className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                🌿  Join us for unforgettable college moments - Farewell, Fresher Parties, Holi Celebrations, Annual Functions & more! 🌿
              </motion.p>

              {/* Progress Indicator */}
              <motion.div
                className="mt-8 flex justify-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <div className="w-24 h-1 bg-teal-300/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-200"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
