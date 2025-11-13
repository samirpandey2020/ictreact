import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config';

export const useGameLogic = () => {
  const [state, setState] = useState('welcome');
  const [userGuess, setUserGuess] = useState(50);
  const [pair, setPair] = useState(null);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState(true);
  const [confetti, setConfetti] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [resultType, setResultType] = useState(null); // 'win' or 'lose'
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
          const defaultPairs = [];
          setPairs(defaultPairs);
        }
      });
  }, []);

  const randomPair = () => pairs[Math.floor(Math.random() * pairs.length)];

  const startGame = () => {
    if (pairs.length === 0) return;
    setPair(randomPair());
    setUserGuess(50);
    setScore(0);
    setState('playing');
    
    // Add a little vibration effect if supported
    if (navigator.vibrate) {
      navigator.vibrate([100]);
    }
  };

  const changeGuess = (diff) => {
    setUserGuess(v => Math.max(0, Math.min(100, v + diff)));
    
    // Add a little vibration effect if supported
    if (navigator.vibrate && Math.abs(diff) > 1) {
      navigator.vibrate([50]);
    }
  };

  const submitGuess = () => {
    setState('checking');
    
    // Start dramatic countdown
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 800);
    
    setTimeout(() => {
      const diff = Math.abs(userGuess - pair.similarity);
      const correct = diff <= 15;
      setScore(correct ? 1 : 0);
      setResultType(correct ? 'win' : 'lose');
      
      setTimeout(() => {
        setState('result');
        setCountdown(null);
      }, 2000);
    }, 3000);
  };

  const createConfetti = (count) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        duration: 3 + Math.random() * 2,
        size: Math.random() * 10 + 5,
        shape: Math.random() > 0.5 ? 'circle' : 'square'
      });
    }
    setConfetti(arr);
    setTimeout(() => setConfetti([]), 4000);
  };

  const playAgain = () => {
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

  return {
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
  };
};