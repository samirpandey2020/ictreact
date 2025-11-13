import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play } from 'lucide-react';

const WelcomeScreen = ({ onStart, pairs }) => {
  return (
    <motion.div 
      className="text-center z-10 w-full max-w-4xl px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Title with Gaming Aesthetic */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full mx-auto w-3/4"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
            SIMILARITY
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
            SHOWDOWN
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        className="text-cyan-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Test your perception skills! Guess how similar two images are and compete for the highest score.
      </motion.p>

      {/* Start Button */}
      <motion.button 
        onClick={onStart} 
        className="relative bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-10 py-6 text-xl md:text-2xl font-bold rounded-full hover:from-cyan-500 hover:to-teal-500 transition-all shadow-lg shadow-cyan-500/30 border border-cyan-400/30 group mb-8"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        disabled={pairs.length === 0}
      >
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center justify-center gap-3 relative z-10">
          {pairs.length === 0 ? (
            <>
              <Zap className="w-6 h-6" />
              <span>NO IMAGES</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              <span>START GAME</span>
            </>
          )}
        </div>
        <motion.div
          className="absolute -inset-2 rounded-full bg-cyan-400/30 blur-lg -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>

     

      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900"></div>
        
        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg opacity-20"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#0891b2' : '#0e7490',
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 90, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Pulsing circles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#0891b2' : '#0e7490',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;