import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MinusCircle, PlusCircle } from 'lucide-react';

const PlayingScreen = ({ 
  pair, 
  userGuess, 
  onChangeGuess, 
  onSubmitGuess, 
  onSliderChange 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(userGuess);

  // Motion values for interactive effects
  const sliderX = useMotionValue(0);
  const sliderColor = useTransform(sliderX, [-200, 0, 200], ['#ef4444', '#fbbf24', '#10b981']);

  const handleConfirmGuess = () => {
    setIsSubmitting(true);
    // Add a small delay to allow the animation to start before transitioning
    setTimeout(() => {
      onSubmitGuess();
    }, 1000);
  };

  const handleSliderStart = () => {
    setIsSliding(true);
  };

  const handleSliderChangeInternal = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    onSliderChange(e);
    
    // Update motion value for interactive effects
    const percentage = (value / 100) * 400 - 200; // Map 0-100 to -200 to 200
    sliderX.set(percentage);
  };

  const handleSliderEnd = () => {
    setIsSliding(false);
    sliderX.set(0);
  };

  return (
    <motion.div 
      className="flex flex-col items-center space-y-6 z-10 w-full max-w-6xl px-4 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white/90">How similar are these images?</h2>
        <p className="text-white/70 mt-1">Use the buttons or slider to make your guess</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full justify-items-center">
        <motion.div
          className="relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.img 
            src={pair.img1} 
            className="w-[240px] h-[200px] md:w-[400px] md:h-[320px] object-cover rounded-3xl shadow-2xl glass-effect border-2 border-white/20 relative z-10"
            onError={(e) => {
              e.target.src = 'https://placehold.co/800x600?text=Invalid+Image+URL';
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          />
          {/* Subtle image glow effect */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-md z-0"></div>
        </motion.div>
        
        <motion.div
          className="relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.img 
            src={pair.img2} 
            className="w-[240px] h-[200px] md:w-[400px] md:h-[320px] object-cover rounded-3xl shadow-2xl glass-effect border-2 border-white/20 relative z-10"
            onError={(e) => {
              e.target.src = 'https://placehold.co/800x600?text=Invalid+Image+URL';
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          />
          {/* Subtle image glow effect */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-400/20 to-teal-500/20 blur-md z-0"></div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
        <div className="flex items-center space-x-4 md:space-x-6">
          <motion.button 
            onClick={() => onChangeGuess(-1)} 
            className="p-4 md:p-5 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-700 hover:to-gray-800 glass-effect border border-cyan-500/30 relative shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            disabled={isSubmitting}
          >
            <MinusCircle className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
            {/* Button glow effect */}
            <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm -z-10"></div>
          </motion.button>
          
          <motion.div 
            className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-3 rounded-2xl border border-cyan-500/30 relative shadow-lg"
            key={userGuess}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative z-10">
              {userGuess}%
            </div>
            {/* Percentage box glow effect */}
            <div className="absolute -inset-1 rounded-2xl bg-cyan-500/20 blur-sm -z-10"></div>
          </motion.div>
          
          <motion.button 
            onClick={() => onChangeGuess(1)} 
            className="p-4 md:p-5 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-700 hover:to-gray-800 glass-effect border border-cyan-500/30 relative shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            disabled={isSubmitting}
          >
            <PlusCircle className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
            {/* Button glow effect */}
            <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm -z-10"></div>
          </motion.button>
        </div>

        <div className="w-full max-w-[800px]">
          <div className="flex justify-between text-white font-bold mb-2 text-sm md:text-base">
            <span>0%</span>
            <span>Your Guess: {userGuess}%</span>
            <span>100%</span>
          </div>
          <div className="relative h-7 md:h-8 bg-gray-800/50 rounded-full overflow-hidden glass-effect border border-cyan-500/30">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChangeInternal}
              onMouseDown={handleSliderStart}
              onMouseUp={handleSliderEnd}
              onTouchStart={handleSliderStart}
              onTouchEnd={handleSliderEnd}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={isSubmitting}
            />
            <div className="absolute inset-0 flex items-center">
              <motion.div 
                className="h-full rounded-full"
                style={{ 
                  width: `${sliderValue}%`,
                  background: sliderColor
                }}
              />
            </div>
            <motion.div 
              className="absolute top-1/4 w-5 h-5 rounded-full shadow-lg border-2"
              style={{ 
                left: `calc(${sliderValue}% - 10px)`, 
                transform: 'translateY(-50%)',
                backgroundColor: sliderColor,
                borderColor: '#ffffff'
              }}
              animate={{
                scale: isSliding ? 1.3 : 1,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            {/* Slider track glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-sm"></div>
            
            {/* Interactive particles that appear when sliding */}
            {isSliding && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`slider-particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400"
                    style={{
                      left: `calc(${sliderValue}% - 4px)`,
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.random() * 40 - 20],
                      y: [0, Math.random() * 40 - 20],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        <motion.button 
          onClick={handleConfirmGuess}
          className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-4 text-xl md:text-2xl font-bold rounded-full hover:from-cyan-500 hover:to-teal-500 transition-all shadow-lg border border-cyan-400/30 relative group"
          whileHover={{ scale: !isSubmitting ? 1.05 : 1 }}
          whileTap={{ scale: !isSubmitting ? 0.95 : 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          disabled={isSubmitting}
        >
          {/* Cinematic dimensional effect when submitting */}
          {isSubmitting && (
            <>
              {/* Expanding ripple effects */}
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-500/60"
                animate={{
                  scale: [0, 1.5, 2.5, 3.5],
                  opacity: [0.8, 0.6, 0.3, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-teal-500/40"
                animate={{
                  scale: [0, 1.2, 2.2, 3.2],
                  opacity: [0.7, 0.5, 0.2, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.1
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/30"
                animate={{
                  scale: [0, 1, 1.8, 2.8],
                  opacity: [0.6, 0.4, 0.1, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.2
                }}
              />
              
              {/* Rotating vortex effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-cyan-400/50"
                animate={{
                  scale: [0, 1, 1.5, 2],
                  rotate: [0, 90, 180, 270],
                  opacity: [0, 0.8, 0.4, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut"
                }}
              />
              
              {/* Particle burst effect */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 30 * Math.PI) / 180) * 150],
                    y: [0, Math.sin((i * 30 * Math.PI) / 180) * 150],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}
          
          <div className="absolute -inset-1 rounded-full bg-cyan-500/30 blur-lg -z-10 group-hover:opacity-70 opacity-0 transition-opacity"></div>
          <span className="relative z-10 flex items-center justify-center">
            {isSubmitting ? (
              // Just show a simple animated icon when submitting
              <motion.div
                className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                CONFIRM GUESS
                <motion.span
                  className="ml-2"
                  animate={{ 
                    x: [0, 5, 0],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.span>
              </>
            )}
          </span>
        </motion.button>
      </div>
      
      {/* Subtle particle effects in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/10"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PlayingScreen;