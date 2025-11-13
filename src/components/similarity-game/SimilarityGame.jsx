import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useGameLogic } from './useGameLogic';
import { 
  playSound, 
  playDramaticSound, 
  playSuspenseSound, 
  playTensionSound, 
  playHeartbeatSound, 
  playSuccess, 
  playFail,
  playFirecrackerSound
} from './audioUtils';
import WelcomeScreen from './WelcomeScreen';
import PlayingScreen from './PlayingScreen';
import CheckingScreen from './CheckingScreen';
import ResultScreen from './ResultScreen';

const SimilarityGame = () => {
  const {
    // State
    state,
    userGuess,
    pair,
    score,
    sound,
    setSound,
    confetti,
    pairs,
    countdown,
    resultType,
    
    // Functions
    startGame,
    changeGuess,
    submitGuess,
    createConfetti,
    playAgain,
    goToHome,
    handleSliderChange,
    audioCtx
  } = useGameLogic();
  
  // Create floating particles for background
  const [floatingParticles, setFloatingParticles] = useState([]);
  
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: 8 + Math.random() * 15,
        delay: Math.random() * 5,
        color: i % 4 === 0 ? 'from-yellow-400' : 
               i % 4 === 1 ? 'from-pink-500' : 
               i % 4 === 2 ? 'from-blue-400' : 'from-purple-500'
      });
    }
    setFloatingParticles(particles);
  }, []);

  // Enhanced submitGuess with sound effects
  const enhancedSubmitGuess = () => {
    submitGuess();
    playDramaticSound(audioCtx, sound);
    
    // Add a little vibration effect if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    
    // Play suspense sound at start
    playSuspenseSound(audioCtx, sound);
    
    setTimeout(() => {
      // Play tension sound as countdown ends
      playTensionSound(audioCtx, sound);
      
      // Add suspense before revealing result
      setTimeout(() => {
        // Play heartbeat sounds during final suspense
        playHeartbeatSound(audioCtx, sound);
        setTimeout(() => playHeartbeatSound(audioCtx, sound), 300);
        setTimeout(() => playHeartbeatSound(audioCtx, sound), 600);
        
        const diff = Math.abs(userGuess - pair.similarity);
        const correct = diff <= 15;
        createConfetti(correct ? 60 : 20);
        if (correct) {
          playSuccess(audioCtx, sound);
          // Play firecracker sounds for win
          setTimeout(() => playFirecrackerSound(audioCtx, sound), 500);
          setTimeout(() => playFirecrackerSound(audioCtx, sound), 1200);
        } else {
          playFail(audioCtx, sound);
        }
      }, 2000);
    }, 3000);
  };

  // Enhanced startGame with sound
  const enhancedStartGame = () => {
    startGame();
    playSound(audioCtx, 700, 0.2, sound);
  };

  // Enhanced playAgain with sound
  const enhancedPlayAgain = () => {
    playAgain();
    playSound(audioCtx, 700, 0.2, sound);
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center select-none transition-all duration-1000 ${
      state === 'result' && resultType === 'win' 
        ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600' 
        : state === 'result' && resultType === 'lose' 
        ? 'bg-gradient-to-br from-indigo-900 via-gray-800 to-black' 
        : state === 'welcome'
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900'
        : 'bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600'
    }`}>
      <style>{`
        @keyframes confettiFall { 0%{transform:translateY(-100vh) rotate(0)}100%{transform:translateY(100vh) rotate(720deg)} }
        @keyframes bounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glow {0%,100%{box-shadow:0 0 20px rgba(255,255,255,.5)}50%{box-shadow:0 0 40px rgba(255,255,255,.9)}}
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-20px) translateX(10px) rotate(180deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
        @keyframes neonGlow {
          0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #06b6d4, 0 0 20px #06b6d4; }
          50% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #06b6d4, 0 0 40px #06b6d4; }
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }
        .progress-gradient {
          background: linear-gradient(90deg, #06b6d4, #0891b2, #0e7490, #155e75, #164e63);
        }
        .button-primary {
          background: linear-gradient(45deg, #0891b2 0%, #0e7490 100%);
          box-shadow: 0 4px 15px rgba(8, 145, 178, 0.4);
        }
        .button-secondary {
          background: linear-gradient(45deg, #06b6d4 0%, #0891b2 100%);
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }
        .button-tertiary {
          background: linear-gradient(45deg, #0891b2 0%, #0e7490 100%);
          box-shadow: 0 4px 15px rgba(8, 145, 178, 0.4);
        }
        .button-win {
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }
        .button-lose {
          background: linear-gradient(45deg, #0f172a, #1e293b);
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.4);
        }
        .shimmer-text {
          background: linear-gradient(to right, #06b6d4, #0891b2, #06b6d4);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }
        .neon-text {
          animation: neonGlow 1.5s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="absolute top-4 right-4 flex space-x-2 z-20">
        <button 
          onClick={() => setSound(!sound)} 
          className="p-3 rounded-full hover:bg-white/20 transition-all glass-effect backdrop-blur-lg"
        >
          {sound ? <Volume2 className="text-white w-6 h-6" /> : <VolumeX className="text-white w-6 h-6" />}
        </button>
        
        {/* Admin Panel Link */}
        <a 
          href="/admin" 
          className="p-3 rounded-full hover:bg-white/20 transition-all glass-effect backdrop-blur-lg flex items-center justify-center"
          title="Admin Panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </a>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-r ${particle.color} to-transparent opacity-30`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Enhanced Confetti */}
      <AnimatePresence>
        {confetti.map(c => (
          <motion.div 
            key={c.id} 
            className={`absolute ${c.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
            style={{ 
              backgroundColor: c.color, 
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
            }}
            initial={{ y: -100, rotate: 0 }}
            animate={{ 
              y: window.innerHeight + 100, 
              rotate: 720,
              x: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{ duration: c.duration, ease: "linear" }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {state === 'welcome' && (
          <WelcomeScreen onStart={enhancedStartGame} pairs={pairs} />
        )}

        {state === 'playing' && pair && (
          <PlayingScreen 
            pair={pair}
            userGuess={userGuess}
            onChangeGuess={changeGuess}
            onSubmitGuess={enhancedSubmitGuess}
            onSliderChange={handleSliderChange}
          />
        )}

        {state === 'checking' && (
          <CheckingScreen countdown={countdown} />
        )}

        {state === 'result' && pair && (
          <ResultScreen 
            pair={pair}
            userGuess={userGuess}
            score={score}
            onPlayAgain={enhancedPlayAgain}
            onGoToHome={goToHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimilarityGame;