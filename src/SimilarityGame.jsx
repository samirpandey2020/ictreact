import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  MinusCircle,
  PlusCircle,
  Zap,
  Home,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL, API_ENDPOINTS } from './config';

const KioskSimilarityGame = () => {
  const [state, setState] = useState('welcome');
  const [userGuess, setUserGuess] = useState(50);
  const [pair, setPair] = useState(null);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState(true);
  const [confetti, setConfetti] = useState([]);
  const [pairs, setPairs] = useState([]);
  const audioCtx = useRef(null);

  // Load pairs from backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}${API_ENDPOINTS.PAIRS}`)
      .then(response => response.json())
      .then(data => {
        setPairs(data);
      })
      .catch(error => {
        console.error('Error fetching pairs:', error);
        // Fallback to localStorage if API is not available
        const savedPairs = localStorage.getItem('similarityPairs');
        if (savedPairs) {
          setPairs(JSON.parse(savedPairs));
        } else {
          // Default pairs if none exist
          const defaultPairs = [
          //   { id: '1', img1: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800', img2: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=800', similarity: 85 },
          //   { id: '2', img1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', img2: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', similarity: 45 },
          //   { id: '3', img1: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800', img2: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', similarity: 90 },
          //   { id: '4', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 },
          //   { id: '5', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 },
          //   { id: '6', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 },
          //   { id: '7', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 },
          //   { id: '8', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 },
          //   { id: '9', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 },
          //   { id: '10', img1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', img2: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800', similarity: 30 }
          ];
          setPairs(defaultPairs);
        }
      });
  }, []);

  const playSound = (freq, duration = 0.2) => {
    if (!sound) return;
    if (!audioCtx.current) {
      const AudioContextClass = window.AudioContext || window["webkitAudioContext"];
      audioCtx.current = new AudioContextClass();
    }

    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.2;
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playSuccess = () => [523, 659, 783].forEach((f, i) => setTimeout(() => playSound(f, 0.15), i * 150));
  const playFail = () => playSound(220, 0.5);

  const randomPair = () => pairs[Math.floor(Math.random() * pairs.length)];

  const startGame = () => {
    if (pairs.length === 0) return;
    playSound(700);
    setPair(randomPair());
    setUserGuess(50);
    setScore(0);
    setState('playing');
  };

  const changeGuess = (diff) => {
    playSound(900);
    setUserGuess(v => Math.max(0, Math.min(100, v + diff)));
  };

  const submitGuess = () => {
    setState('checking');
    playSound(400);
    setTimeout(() => {
      const diff = Math.abs(userGuess - pair.similarity);
      const correct = diff <= 15;
      setScore(correct ? 1 : 0);
      correct ? playSuccess() : playFail();
      createConfetti(correct ? 60 : 20);
      setState('result');
      // Removed automatic next round
    }, 1000);
  };

  const createConfetti = (count) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        duration: 3 + Math.random() * 2
      });
    }
    setConfetti(arr);
    setTimeout(() => setConfetti([]), 4000);
  };

  const playAgain = () => {
    playSound(700);
    setPair(randomPair());
    setUserGuess(50);
    setScore(0);
    setState('playing');
  };

  const goToHome = () => {
    setState('welcome');
  };

  // Handle slider change with 1-step increments
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setUserGuess(value);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600 flex flex-col justify-center items-center select-none">
      <style>{`
        @keyframes confettiFall { 0%{transform:translateY(-100vh) rotate(0)}100%{transform:translateY(100vh) rotate(720deg)} }
        @keyframes bounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glow {0%,100%{box-shadow:0 0 20px rgba(255,255,255,.5)}50%{box-shadow:0 0 40px rgba(255,255,255,.9)}}
        .glass-effect {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .progress-gradient {
          background: linear-gradient(90deg, #ff416c, #ff4b2b, #f8c62c, #8bc34a, #2196f3);
        }
        .button-primary {
          background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
          box-shadow: 0 4px 15px rgba(37, 117, 252, 0.4);
        }
        .button-secondary {
          background: linear-gradient(45deg, #ff416c 0%, #ff4b2b 100%);
          box-shadow: 0 4px 15px rgba(255, 65, 108, 0.4);
        }
        .button-tertiary {
          background: linear-gradient(45deg, #11998e 0%, #38ef7d 100%);
          box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
        }
      `}</style>

      <button onClick={() => setSound(!sound)} className="absolute top-6 right-6 p-4 rounded-full hover:bg-white/20 transition-all z-10 glass-effect">
        {sound ? <Volume2 className="text-white w-8 h-8" /> : <VolumeX className="text-white w-8 h-8" />}
      </button>

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map(c => (
          <motion.div 
            key={c.id} 
            className="absolute w-4 h-4 rounded-sm"
            style={{ 
              backgroundColor: c.color, 
              left: `${c.left}%` 
            }}
            initial={{ y: -100, rotate: 0 }}
            animate={{ y: window.innerHeight + 100, rotate: 720 }}
            transition={{ duration: c.duration, ease: "linear" }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {state === 'welcome' && (
          <motion.div 
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-32 h-32 text-yellow-300 mx-auto mb-6 drop-shadow-lg" />
            </motion.div>
            <motion.h1 
              className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 mb-8 drop-shadow-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              SIMILARITY SHOWDOWN
            </motion.h1>
            <motion.button 
              onClick={startGame} 
              className="button-primary text-white px-12 py-5 text-2xl md:text-3xl rounded-full font-bold hover:scale-105 transition-all shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(37, 117, 252, 0.5)",
                  "0 0 40px rgba(37, 117, 252, 0.9)",
                  "0 0 20px rgba(37, 117, 252, 0.5)"
                ]
              }}
              transition={{ 
                boxShadow: { 
                  duration: 2, 
                  repeat: Infinity 
                }
              }}
              disabled={pairs.length === 0}
            >
              {pairs.length === 0 ? "NO IMAGES" : "TAP TO START"}
            </motion.button>
            <motion.div 
              className="mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a 
                href="/admin" 
                className="text-white/80 hover:text-white underline transition-colors text-lg"
              >
                Admin Panel
              </a>
            </motion.div>
          </motion.div>
        )}

        {state === 'playing' && pair && (
          <motion.div 
            className="flex flex-col items-center space-y-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.img 
                src={pair.img1} 
                className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] object-cover rounded-3xl shadow-2xl glass-effect border-2 border-white/20"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/800x600?text=Invalid+Image+URL';
                }}
              />
              <motion.img 
                src={pair.img2} 
                className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] object-cover rounded-3xl shadow-2xl glass-effect border-2 border-white/20"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/800x600?text=Invalid+Image+URL';
                }}
              />
            </div>

            <div className="flex items-center space-x-6 md:space-x-8">
              <motion.button 
                onClick={() => changeGuess(-1)} 
                className="p-5 md:p-6 bg-white/20 rounded-full hover:bg-white/30 glass-effect border border-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MinusCircle className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.button>
              <motion.div 
                className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg bg-black/20 px-6 py-3 rounded-2xl"
                key={userGuess}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {userGuess}%
              </motion.div>
              <motion.button 
                onClick={() => changeGuess(1)} 
                className="p-5 md:p-6 bg-white/20 rounded-full hover:bg-white/30 glass-effect border border-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PlusCircle className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.button>
            </div>

            <div className="w-[280px] md:w-[800px]">
              <div className="flex justify-between text-white font-bold mb-2">
                <span>0%</span>
                <span>{userGuess}%</span>
                <span>100%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={userGuess}
                onChange={handleSliderChange}
                className="w-full h-8 md:h-10 bg-white/20 rounded-full overflow-hidden glass-effect border border-white/30 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>

            <motion.button 
              onClick={submitGuess} 
              className="button-secondary text-white px-12 py-5 text-2xl md:text-3xl rounded-full font-bold hover:scale-105 transition-all shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONFIRM GUESS
            </motion.button>
          </motion.div>
        )}

        {state === 'checking' && (
          <motion.div 
            className="flex flex-col items-center space-y-6 text-white z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-24 h-24 text-yellow-300 drop-shadow-lg" />
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold bg-black/20 px-8 py-4 rounded-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Checking...
            </motion.h2>
          </motion.div>
        )}

        {state === 'result' && pair && (
          <motion.div 
            className="flex flex-col items-center text-center text-white space-y-6 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {score ? (
              <>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Trophy className="w-24 h-24 md:w-32 md:h-32 text-yellow-300 drop-shadow-lg" />
                </motion.div>
                <motion.h2 
                  className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  GREAT JOB! 🎉
                </motion.h2>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: 2
                  }}
                >
                  <div className="text-6xl md:text-8xl">❌</div>
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold text-red-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  TRY AGAIN!
                </motion.h2>
              </>
            )}
            <motion.div 
              className="text-2xl md:text-3xl bg-black/20 px-6 py-3 rounded-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Actual: <span className="font-bold text-yellow-300">{pair.similarity}%</span> | Your Guess: <span className="font-bold">{userGuess}%</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={playAgain}
                className="button-tertiary text-white font-bold py-4 px-8 rounded-full transition-all text-lg md:text-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="mr-2" />
                PLAY AGAIN
              </motion.button>
              <motion.button
                onClick={goToHome}
                className="button-primary text-white font-bold py-4 px-8 rounded-full transition-all text-lg md:text-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="mr-2" />
                HOME
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KioskSimilarityGame;