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
  
  const frequencies = [523, 659, 783, 1046];
  frequencies.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.15);
    osc.stop(ctx.currentTime + i * 0.15 + 0.4);
  });
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
  
  // Create multiple bursts for firecracker effect
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Random frequency for varied explosion sounds
      const freq = 200 + Math.random() * 800;
      osc.frequency.value = freq;
      osc.type = 'sawtooth';
      
      // Quick attack and decay for sharp burst
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }, i * 150);
  }
};
