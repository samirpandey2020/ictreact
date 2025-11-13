import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CheckingScreenWithText = ({ countdown }) => {
  // Dynamic suspense texts
  const investigationTexts = [
    "Summoning the AI overlords...",
    "Consulting ancient wisdom...",
    "Analyzing quantum patterns...",
    "Decoding alien transmissions...",
    "Scanning parallel dimensions...",
    "Interrogating digital spirits...",
    "Cracking the cosmic code...",
    "Decrypting universal secrets...",
    "Probing the matrix...",
    "Channeling digital oracles..."
  ];

  const detailTexts = [
    "Examining pixel intensities...",
    "Measuring color distributions...",
    "Calculating edge similarities...",
    "Comparing texture patterns...",
    "Analyzing shape contours...",
    "Evaluating visual harmony...",
    "Processing aesthetic ratios...",
    "Computing beauty algorithms...",
    "Assessing visual resonance...",
    "Quantifying artistic merit..."
  ];

  const progressTexts = [
    "Almost there...",
    "Crunching numbers...",
    "Synthesizing results...",
    "Compiling findings...",
    "Generating insights...",
    "Formulating conclusion...",
    "Finalizing analysis...",
    "Preparing verdict...",
    "Polishing prediction...",
    "Wrapping up..."
  ];

  const [currentText, setCurrentText] = useState(investigationTexts[0]);
  const [textIndex, setTextIndex] = useState(0);

  // Rotate through texts based on countdown
  useEffect(() => {
    if (countdown === 3) {
      // Investigation phase
      const interval = setInterval(() => {
        setTextIndex(prev => {
          const newIndex = (prev + 1) % investigationTexts.length;
          setCurrentText(investigationTexts[newIndex]);
          return newIndex;
        });
      }, 3000);
      setCurrentText(investigationTexts[0]);
      return () => clearInterval(interval);
    } else if (countdown === 2) {
      // Detail phase
      const interval = setInterval(() => {
        setTextIndex(prev => {
          const newIndex = (prev + 1) % detailTexts.length;
          setCurrentText(detailTexts[newIndex]);
          return newIndex;
        });
      }, 2000);
      setCurrentText(detailTexts[0]);
      return () => clearInterval(interval);
    } else if (countdown === 1) {
      // Progress phase
      const interval = setInterval(() => {
        setTextIndex(prev => {
          const newIndex = (prev + 1) % progressTexts.length;
          setCurrentText(progressTexts[newIndex]);
          return newIndex;
        });
      }, 2500);
      setCurrentText(progressTexts[0]);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center space-y-6 text-white z-10 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Suspenseful dark space background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black"
        animate={{ 
          background: [
            'radial-gradient(circle at 30% 30%, #0c1425, #0a0f1a, #000000)',
            'radial-gradient(circle at 70% 70%, #0a0f1a, #080c15, #000000)',
            'radial-gradient(circle at 50% 50%, #0c1425, #0a0f1a, #000000)'
          ],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Suspenseful particle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`suspense-particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
      
      {/* Heartbeat pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-red-500/5"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      />
      
      {/* Tension building waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      {/* Central analysis core */}
      <div className="relative flex items-center justify-center">
        {/* Outer analysis rings */}
        <motion.div
          className="absolute rounded-full border border-cyan-500/40"
          style={{ width: '280px', height: '280px' }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute rounded-full border border-teal-500/30"
          style={{ width: '240px', height: '240px' }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Scanning ring */}
        <motion.div
          className="absolute rounded-full border-2 border-yellow-400/70"
          style={{ width: '200px', height: '200px' }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Analysis core with pulsing effect */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-r from-cyan-600 to-teal-600"
          style={{ width: '120px', height: '120px' }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        
        {/* Scanning lines effect */}
        <motion.div
          className="absolute w-32 h-1 bg-yellow-400/80 rounded-full"
          animate={{
            y: [-60, 60, -60],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        
        <motion.div
          className="absolute w-32 h-1 bg-yellow-400/60 rounded-full"
          animate={{
            y: [-40, 40, -40],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.3,
          }}
        />
        
        {/* Countdown visualization with suspense */}
        {countdown !== null && countdown > 0 && (
          <motion.div
            className="absolute"
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.3, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Visual representation of countdown as scanning circles */}
            <motion.div
              className="rounded-full border-4 border-red-500"
              style={{ width: '70px', height: '70px' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
            />
            
            {/* Additional scanning effect for suspense */}
            <motion.div
              className="absolute rounded-full border-2 border-yellow-400"
              style={{ width: '90px', height: '90px' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 0.2,
              }}
            />
          </motion.div>
        )}
      </div>
      
      {/* Suspenseful energy vortex */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-500/10"
        style={{ 
          width: '500%',
          height: '500%',
          left: '-200%',
          top: '-200%',
        }}
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Additional suspense elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`suspense-glow-${i}`}
            className="absolute rounded-full bg-cyan-500/20"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Dynamic text display */}
      <motion.div
        key={currentText}
        className="text-center max-w-2xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2"
          animate={{ 
            textShadow: [
              "0 0 5px rgba(103, 232, 249, 0.5)",
              "0 0 15px rgba(103, 232, 249, 0.8)",
              "0 0 5px rgba(103, 232, 249, 0.5)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {currentText}
        </motion.h2>
        
        {countdown !== null && countdown > 0 && (
          <motion.p 
            className="text-xl text-cyan-200/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Verdict in <span className="font-bold text-yellow-300">{countdown}</span>...
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CheckingScreenWithText;