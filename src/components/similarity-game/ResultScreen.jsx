import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Home, RotateCcw } from 'lucide-react';

const ResultScreen = ({ 
  pair, 
  userGuess, 
  score, 
  onPlayAgain, 
  onGoToHome 
}) => {
  // Create firecracker particles
  const createFirecrackerParticles = (count, centerX, centerY) => {
    return Array.from({length: count}).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      const size = 3 + Math.random() * 5;
      const duration = 0.8 + Math.random() * 0.7;
      
      return {
        id: i,
        angle,
        distance,
        size,
        duration,
        color: i % 4 === 0 ? '#fbbf24' : i % 4 === 1 ? '#ec4899' : i % 4 === 2 ? '#8b5cf6' : '#60a5fa'
      };
    });
  };

  // Create multiple firecracker bursts
  const firecrackers = [
    createFirecrackerParticles(12, 20, 30),
    createFirecrackerParticles(15, 80, 40),
    createFirecrackerParticles(10, 50, 70),
    createFirecrackerParticles(13, 30, 60),
    createFirecrackerParticles(11, 70, 20)
  ];

  // Calculate the difference between user guess and actual similarity
  const difference = Math.abs(userGuess - pair.similarity);

  // Get dynamic text based on how close the user was
  const getDynamicText = () => {
    if (score) {
      // Exact match - winner texts
      const winnerTexts = [
        "PERFECT MATCH! You're a similarity savant! 🎉",
        "EXACT MATCH! Your intuition is unmatched! 🔥",
        "PRECISION PERFECT! You nailed it! 🎯",
        "FLAWLESS VICTORY! You've mastered this! 🏆",
        "ABSOLUTE PERFECTION! You're a genius! 🌟"
      ];
      return winnerTexts[Math.floor(Math.random() * winnerTexts.length)];
    } else if (difference <= 5) {
      // Very close
      const closeTexts = [
        "SO CLOSE! You almost had it! 🔥",
        "NEARLY PERFECT! Just a tiny bit off! 🎯",
        "ALMOST THERE! Your estimate was spot on! ✨",
        "SUPER CLOSE! You're a natural at this! 🌟",
        "TEENSY WEENSY AWAY! Incredible guess! 💯"
      ];
      return closeTexts[Math.floor(Math.random() * closeTexts.length)];
    } else if (difference <= 10) {
      // Close
      const closeTexts = [
        "PRETTY CLOSE! Good estimation skills! 👍",
        "NOT BAD! You're getting the hang of it! 🎯",
        "CLOSE ENOUGH! Nice try! ✨",
        "ALMOST! You're on the right track! 🌟",
        "NEARLY! Keep practicing and you'll nail it! 💪"
      ];
      return closeTexts[Math.floor(Math.random() * closeTexts.length)];
    } else if (difference <= 20) {
      // Somewhat close
      const somewhatCloseTexts = [
        "NOT TOO FAR OFF! Keep trying! 👍",
        "YOU'RE GETTING WARMER! Nice effort! 🔥",
        "FAIR ATTEMPT! You're learning! 🌱",
        "DECENT GUESS! Practice makes perfect! 💪",
        "ON THE RIGHT PATH! Keep going! 🎯"
      ];
      return somewhatCloseTexts[Math.floor(Math.random() * somewhatCloseTexts.length)];
    } else {
      // Far off
      const farOffTexts = [
        "WIDE OF THE MARK! But don't give up! 💪",
        "NOT EVEN CLOSE! Try again! 👍",
        "FAR FROM ACCURATE! Keep practicing! 🌱",
        "MISSED BY A MILE! You'll do better next time! 🎯",
        "COMPLETELY OFF! But that's how you learn! ✨"
      ];
      return farOffTexts[Math.floor(Math.random() * farOffTexts.length)];
    }
  };

  // Get encouragement message based on performance
  const getEncouragementMessage = () => {
    if (score) {
      // Educational messages for winners
    const educationalMessages = [
  "Great job! Signature verification systems use pattern comparison to authenticate handwritten signatures.",
  "Excellent work! OCR (Optical Character Recognition) technology extracts text by matching visual patterns in images.",
  "Well done! Both OCR and signature verification rely on analyzing shapes, strokes, and structural similarities in images.",
  "Fantastic! Automated signature verification compares pressure, angle, and curve features just like this comparison task.",
  "Amazing! OCR systems train on thousands of letter samples to accurately detect and convert handwriting or printed text.",
  "Impressive! Signature verification models learn from genuine and forged examples to identify authenticity in documents."
];

      return educationalMessages[Math.floor(Math.random() * educationalMessages.length)];
    } else if (difference <= 5) {
      return "Incredible guess! You're so close to perfection!";
    } else if (difference <= 10) {
      return "Great effort! You're really improving!";
    } else if (difference <= 20) {
      return "Good try! Keep practicing and you'll get there!";
    } else {
      return "Don't worry! Estimation takes practice. Try again!";
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center text-center text-white space-y-6 z-10 w-full max-w-4xl px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.7 }}
    >
      {score ? (
        <>
          {/* Firecracker burst effects for winning */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Multiple firecracker bursts */}
            {firecrackers.map((particles, index) => (
              <div key={index} className="absolute" style={{
                left: `${particles[0]?.distance ? particles[0].distance * Math.cos(particles[0].angle) : 0}px`,
                top: `${particles[0]?.distance ? particles[0].distance * Math.sin(particles[0].angle) : 0}px`,
              }}>
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                      backgroundColor: particle.color,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      scale: 1
                    }}
                    animate={{ 
                      x: Math.cos(particle.angle) * particle.distance,
                      y: Math.sin(particle.angle) * particle.distance,
                      opacity: [1, 1, 0],
                      scale: [1, 1.5, 0]
                    }}
                    transition={{ 
                      duration: particle.duration,
                      times: [0, 0.8, 1]
                    }}
                  />
                ))}
              </div>
            ))}
            
            {/* Central burst */}
            {Array.from({length: 30}).map((_, i) => (
              <motion.div
                key={`central-${i}`}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#ec4899' : '#8b5cf6',
                  width: `${3 + Math.random() * 4}px`,
                  height: `${3 + Math.random() * 4}px`,
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 1
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300,
                  opacity: [1, 1, 0],
                  scale: [1, 1.5, 0]
                }}
                transition={{ 
                  duration: 0.6 + Math.random() * 0.4,
                  times: [0, 0.7, 1]
                }}
              />
            ))}
            
            {/* Sparkling stars */}
            {Array.from({length: 40}).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                }}
                animate={{ 
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ 
                  duration: 1 + Math.random(),
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: 2 + Math.random() * 3,
                }}
              />
            ))}
          </div>
          
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <Trophy className="w-32 h-32 md:w-40 md:h-40 text-yellow-500 drop-shadow-2xl" />
            <motion.div 
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full"
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
              }}
            />
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-yellow-400/60"
              animate={{ 
                scale: [1, 2],
                opacity: [0.9, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
          <motion.h2 
            className="text-5xl md:text-7xl font-bold"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {getDynamicText()}
            </span>
          </motion.h2>
          <motion.div
            className="text-2xl md:text-3xl bg-black/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/30 mb-2 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You scored <span className="font-bold text-yellow-300">1 point</span>!
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            {/* Replace the cross with a more engaging mechanical/error-themed animation */}
            <div className="relative">
              <div className="text-7xl md:text-9xl">⚠️</div>
              <motion.div 
                className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              {/* Mechanical gear effect */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-dashed border-red-500/40"
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            {/* Pulse effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-red-500/40"
              animate={{ 
                scale: [1, 1.8],
                opacity: [0.8, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-red-200 drop-shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {getDynamicText()}
          </motion.h2>
        </>
      )}
      
      <motion.div 
        className={`text-2xl md:text-3xl backdrop-blur-sm px-8 py-5 rounded-2xl border w-full max-w-2xl ${
          score 
            ? 'bg-yellow-500/20 border-yellow-300/50 text-yellow-100' 
            : 'bg-black/40 border-white/20 text-white'
        }`}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            Actual: <span className="font-bold text-yellow-300">{pair.similarity}%</span>
          </div>
          <div className="h-px md:h-auto md:w-px bg-white/30"></div>
          <div>
            Your Guess: <span className="font-bold">{userGuess}%</span>
          </div>
          {/* Only show difference for non-winners */}
          {!score && (
            <>
              <div className="h-px md:h-auto md:w-px bg-white/30"></div>
              <div>
                Difference: <span className="font-bold">{difference}%</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
      
      <motion.div
        className="mt-4 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className={score ? "text-yellow-200/90" : "text-white/80"}>
          {getEncouragementMessage()}
        </p>
      </motion.div>
      
      <motion.div 
        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-6 w-full max-w-2xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          onClick={onPlayAgain}
          className={`font-bold py-5 px-10 rounded-full transition-all text-xl md:text-2xl flex items-center justify-center flex-1 ${
            score 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
              : 'button-tertiary text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={score ? {
            boxShadow: [
              "0 0 15px rgba(245, 158, 11, 0.7)",
              "0 0 30px rgba(245, 158, 11, 0.9)",
              "0 0 15px rgba(245, 158, 11, 0.7)"
            ]
          } : {
            boxShadow: [
              "0 0 15px rgba(17, 153, 142, 0.7)",
              "0 0 30px rgba(17, 153, 142, 0.9)",
              "0 0 15px rgba(17, 153, 142, 0.7)"
            ]
          }}
          transition={{ 
            boxShadow: { 
              duration: 2, 
              repeat: Infinity 
            }
          }}
        >
          <RotateCcw className="mr-3" />
          PLAY AGAIN
        </motion.button>
        <motion.button
          onClick={onGoToHome}
          className={`font-bold py-5 px-10 rounded-full transition-all text-xl md:text-2xl flex items-center justify-center flex-1 ${
            score 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg' 
              : 'button-primary text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={score ? {
            boxShadow: [
              "0 0 15px rgba(124, 58, 237, 0.7)",
              "0 0 30px rgba(124, 58, 237, 0.9)",
              "0 0 15px rgba(124, 58, 237, 0.7)"
            ]
          } : {
            boxShadow: [
              "0 0 15px rgba(37, 117, 252, 0.7)",
              "0 0 30px rgba(37, 117, 252, 0.9)",
              "0 0 15px rgba(37, 117, 252, 0.7)"
            ]
          }}
          transition={{ 
            boxShadow: { 
              duration: 2, 
              repeat: Infinity 
            }
          }}
        >
          <Home className="mr-3" />
          HOME
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;