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
import KioskSimilarityGame from './components/similarity-game/SimilarityGame';

export default KioskSimilarityGame;