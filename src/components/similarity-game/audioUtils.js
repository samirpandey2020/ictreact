export const initializeAudioContext = (audioCtxRef) => {
  if (!audioCtxRef.current) {
    const AudioContextClass = window.AudioContext || window["webkitAudioContext"];
    audioCtxRef.current = new AudioContextClass();
  }
  return audioCtxRef.current;
};

export const playSound = (audioCtxRef, freq, duration = 0.2, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'sine';
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.value = 0.1;
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playSuspenseSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 1.8);
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1.8);
};

export const playDramaticSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.8);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.8);
};

export const playSuccess = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);

  // Function to create a short burst of noise (firecracker)
  const createFirecracker = (delay = 0) => {
    const bufferSize = ctx.sampleRate * 0.3; // 0.3 sec of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Create a gain envelope for a sharp burst
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.25);

    // Add a lowpass filter to simulate muffled explosion
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800 + Math.random() * 1200, ctx.currentTime + delay);

    // Connect nodes
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Play
    noise.start(ctx.currentTime + delay);
    noise.stop(ctx.currentTime + delay + 0.3);
  };

  // Fire several bursts randomly like a firecracker sequence
  for (let i = 0; i < 5; i++) {
    createFirecracker(i * (0.1 + Math.random() * 0.15));
  }
};

export const playFail = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.8);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.8);
};

export const playHeartbeatSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 60;
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.4);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
};

export const playTensionSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 1.2);
  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1.2);
};

export const playWhisperSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.value = 300;
  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.6);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.6);
};

export const playFirecrackerSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  // Create a more realistic firecracker blast sound
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // Start with a low frequency and rapidly sweep to high frequency (blast effect)
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
  
  // Use a noise-like waveform for more realistic explosion
  osc.type = 'sawtooth';
  
  // Rapid attack and decay for sharp blast
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
  
  // Add a secondary "crack" sound for more realism
  setTimeout(() => {
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.frequency.setValueAtTime(600, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    osc2.type = 'square';
    
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start(ctx.currentTime);
    osc2.stop(ctx.currentTime + 0.3);
  }, 100);
};


// Replace / add in your audioUtils.js
export const playBoom3D = (audioCtxRef, soundEnabled = true, opts = {}) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);

  const {
    count = 3,            // how many booms in the sequence
    spread = 4,           // stereo/3d spread (meters)
    subGain = 1.0,        // sub bass level
    noiseGain = 0.9,      // noise burst level
    crackGain = 0.6,      // high-frequency crack level
    roomSize = 0.6,       // reverb strength 0..1
    startDelay = 0        // initial delay
  } = opts;

  // --- helpers ---
  const createNoiseBuffer = (duration = 0.25) => {
    const length = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      // shaped noise: strong then quick drop
      const env = 1 - i / length;
      data[i] = (Math.random() * 2 - 1) * env;
    }
    return buffer;
  };

  // Simple reverb using multiple short delays + feedback (no external IR)
  const makeSimpleReverb = (mix = 0.5) => {
    const input = ctx.createGain();
    const output = ctx.createGain();
    const dry = ctx.createGain();
    const wet = ctx.createGain();
    dry.gain.value = 1 - mix;
    wet.gain.value = mix;

    // Parallel small delays to emulate early reflections
    const delays = [0.012, 0.03, 0.045, 0.07];
    delays.forEach((d, i) => {
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = d;
      const fb = ctx.createGain();
      fb.gain.value = 0.25 * (roomSize + 0.2) * (1 - i * 0.06); // smaller later
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 4000 - i * 600; // darker later reflections

      input.connect(delay);
      delay.connect(filter);
      filter.connect(fb);
      fb.connect(delay); // feedback loop
      filter.connect(wet);
    });

    input.connect(dry);
    dry.connect(output);
    wet.connect(output);

    return { input, output, setMix: (m) => { wet.gain.value = m; dry.gain.value = 1 - m; } };
  };

  const reverb = makeSimpleReverb(roomSize);

  // connect reverb output to destination
  reverb.output.connect(ctx.destination);

  // Play one layered boom at position (x,y,z) with baseDelay
  const playSingleBoom = (x = 0, y = 0, z = -1, baseDelay = 0, intensity = 1) => {
    const t0 = ctx.currentTime + baseDelay;

    // --- Panner (HRTF) ---
    const panner = ctx.createPanner();
    // Use modern parameter methods if available
    if (typeof panner.positionX !== 'undefined') {
      panner.positionX.setValueAtTime(x, t0);
      panner.positionY.setValueAtTime(y, t0);
      panner.positionZ.setValueAtTime(z, t0);
    } else {
      panner.setPosition(x, y, z);
    }
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 100;
    panner.rolloffFactor = 1.2;

    // Connect panner into reverb input (so reverb is spatial too)
    panner.connect(reverb.input);

    // --- Sub bass oscillator (deep boom body) ---
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    const subGainNode = ctx.createGain();
    subGainNode.gain.setValueAtTime(0, t0);
    // low frequency randomized for variation
    const subFreq = 40 + Math.random() * 30; // 40-70 Hz
    subOsc.frequency.setValueAtTime(subFreq, t0);
    subOsc.connect(subGainNode);
    subGainNode.connect(panner);

    // quick, punchy envelope for sub (linear)
    subGainNode.gain.linearRampToValueAtTime(0.0001, t0); // ensure immediate set
    subGainNode.gain.linearRampToValueAtTime(subGain * intensity * 0.9, t0 + 0.002);
    subGainNode.gain.linearRampToValueAtTime(0.0, t0 + 0.28); // short decay

    subOsc.start(t0);
    subOsc.stop(t0 + 0.32);

    // --- Noise burst (main explosive body) ---
    const noiseBuffer = createNoiseBuffer(0.28);
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

    const noiseGain = ctx.createGain();
    // immediate up, fast linear decay (no soft ramp)
    noiseGain.gain.setValueAtTime(noiseGain.value || 0.0001, t0);
    noiseGain.gain.linearRampToValueAtTime(noiseGain.value || 0.0001, t0); // ensure scheduled
    noiseGain.gain.linearRampToValueAtTime(noiseGain * intensity * 0.9, t0 + 0.001);
    noiseGain.gain.linearRampToValueAtTime(0.0, t0 + 0.25);

    // band shaping: one lowpass for body + one bandpass for mid crack energy
    const lowLP = ctx.createBiquadFilter();
    lowLP.type = 'lowpass';
    lowLP.frequency.setValueAtTime(1200, t0);

    noiseSrc.connect(lowLP);
    lowLP.connect(noiseGain);
    noiseGain.connect(panner);

    noiseSrc.start(t0);
    noiseSrc.stop(t0 + 0.28);

    // --- High crack / snap (short) ---
    const crackBuffer = createNoiseBuffer(0.06);
    const crackSrc = ctx.createBufferSource();
    crackSrc.buffer = crackBuffer;

    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(0.0001, t0);
    crackGain.gain.linearRampToValueAtTime(crackGain * intensity * 0.8, t0 + 0.001);
    crackGain.gain.linearRampToValueAtTime(0.0, t0 + 0.06);

    // highpass to keep it sharp
    const crackHP = ctx.createBiquadFilter();
    crackHP.type = 'highpass';
    crackHP.frequency.setValueAtTime(1600, t0);

    crackSrc.connect(crackHP);
    crackHP.connect(crackGain);
    crackGain.connect(panner);

    crackSrc.start(t0 + 0.012); // slightly after main hit
    crackSrc.stop(t0 + 0.08);

    // Clean up: stop nodes will let GC reclaim; reverb has internal feedback but small.
  };

  // Sequence: play `count` booms with slight random 3D positions and timing
  for (let i = 0; i < count; i++) {
    const delay = startDelay + i * (0.18 + Math.random() * 0.12); // spacing
    const x = (Math.random() - 0.5) * spread; // left/right
    const y = (Math.random() - 0.3) * 1.5;     // small up/down
    const z = -1 - Math.random() * 6;         // in front (negative z)
    const intensity = 0.8 + Math.random() * 0.6;
    playSingleBoom(x, y, z, delay, intensity);
  }
};

// New winning sound - "wooo" then continuous firecracker bursts
export const playWinSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  // Create the ascending "wooo" sound (rocket launch)
  const createRocketLaunch = () => {
    const t0 = ctx.currentTime;
    
    // Oscillator for the main "wooo" sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Start at low frequency and rapidly sweep up (like a rocket)
    osc.frequency.setValueAtTime(100, t0);
    osc.frequency.exponentialRampToValueAtTime(800, t0 + 0.4);
    
    // Quick attack and decay envelope
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.4, t0 + 0.02); // Sharp attack
    gain.gain.exponentialRampToValueAtTime(0.3, t0 + 0.2); // Slight decay during ascent
    gain.gain.exponentialRampToValueAtTime(0.01, t0 + 0.4); // Quick fade
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(t0);
    osc.stop(t0 + 0.4);
    
    // Add some white noise for rocket engine effect
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      // Apply envelope that follows the oscillator
      const env = Math.exp(-i / (bufferSize * 0.8)); // Exponential decay
      data[i] = (Math.random() * 2 - 1) * env * 0.3; // Lower volume
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, t0);
    noiseGain.gain.linearRampToValueAtTime(0.15, t0 + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t0 + 0.4);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, t0);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noise.start(t0);
    noise.stop(t0 + 0.4);
  };
  
  // Create continuous firecracker bursts
  const createFirecrackerSequence = (delay) => {
    const startTime = ctx.currentTime + delay;
    
    // Create multiple firecrackers with random timing
    for (let i = 0; i < 8; i++) {
      // Randomize timing for natural firecracker effect
      const firecrackerDelay = startTime + i * 0.15 + Math.random() * 0.1;
      
      // Each firecracker has random characteristics
      const createSingleFirecracker = () => {
        // Main pop sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        // Random frequency for variety
        const frequency = 80 + Math.random() * 120;
        osc.frequency.setValueAtTime(frequency, firecrackerDelay);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.3, firecrackerDelay + 0.15);
        
        // Sharp attack and quick decay
        gain.gain.setValueAtTime(0, firecrackerDelay);
        gain.gain.linearRampToValueAtTime(0.4 + Math.random() * 0.3, firecrackerDelay + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.01, firecrackerDelay + 0.15);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(firecrackerDelay);
        osc.stop(firecrackerDelay + 0.15);
        
        // Add noise burst for crackling effect
        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let j = 0; j < bufferSize; j++) {
          // Create crackling noise
          const env = Math.pow(1 - (j / bufferSize), 2);
          data[j] = (Math.random() * 2 - 1) * env;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, firecrackerDelay);
        noiseGain.gain.linearRampToValueAtTime(0.2 + Math.random() * 0.2, firecrackerDelay + 0.01);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, firecrackerDelay + 0.12);
        
        // Filter for brightness
        const highpass = ctx.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.setValueAtTime(500 + Math.random() * 1000, firecrackerDelay);
        
        noise.connect(highpass);
        highpass.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noise.start(firecrackerDelay);
        noise.stop(firecrackerDelay + 0.12);
      };
      
      // Slightly stagger each firecracker
      setTimeout(createSingleFirecracker, i * 50 + Math.random() * 30);
    }
  };
  
  // Play the sequence: rocket launch followed by continuous firecrackers
  createRocketLaunch();
  setTimeout(() => createFirecrackerSequence(0), 400); // Firecrackers 400ms after launch starts
};

// New losing sound - sad "booing" effect
export const playLoseSound = (audioCtxRef, soundEnabled = true) => {
  if (!soundEnabled) return;
  const ctx = initializeAudioContext(audioCtxRef);
  
  // Create a descending, sad tone
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  
  // Start at a higher frequency and slide down (sad trombone effect)
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 1.2);
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1.2);
  
  // Add some noise for a breathy, disappointed effect
  const bufferSize = ctx.sampleRate * 1.0;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    // Apply envelope to make it fade out
    const env = 1 - (i / bufferSize);
    // Add some randomness for breathiness
    data[i] = (Math.random() * 0.5 - 0.25) * env;
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, ctx.currentTime);
  noiseGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0);
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(500, ctx.currentTime);
  
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 1.0);
};
