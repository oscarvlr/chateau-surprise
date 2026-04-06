import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import Phase3 from './components/Phase3';
import Phase4 from './components/Phase4';

const App: React.FC = () => {
  const [phase, setPhase] = useState(1);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  
  // Audio Refs
  const waterAudioRef = useRef<HTMLAudioElement | null>(null);
  const paperAudioRef = useRef<HTMLAudioElement | null>(null);
  const pianoAudioRef = useRef<HTMLAudioElement | null>(null);
  const secondPianoAudioRef = useRef<HTMLAudioElement | null>(null);

  // Custom Cursor Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const followX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const followY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const startAmbient = () => {
    if (waterAudioRef.current && !isAudioStarted) {
      waterAudioRef.current.volume = 0;
      waterAudioRef.current.play().catch(e => console.log("Audio play blocked", e));
      
      let start = 0;
      const interval = setInterval(() => {
        if (start >= 0.12) {
          clearInterval(interval);
        } else {
          start += 0.005;
          if (waterAudioRef.current) waterAudioRef.current.volume = start;
        }
      }, 100);
      
      setIsAudioStarted(true);
    }
  };

  const playPaperSound = () => {
    if (paperAudioRef.current) {
      paperAudioRef.current.currentTime = 0;
      paperAudioRef.current.volume = 0.45;
      paperAudioRef.current.play().catch(e => console.log("Paper sound blocked", e));
    }
  };

  const playPianoSound = (vol = 0.5) => {
    if (pianoAudioRef.current) {
      pianoAudioRef.current.currentTime = 0;
      pianoAudioRef.current.volume = vol;
      pianoAudioRef.current.play().catch(e => console.log("Piano sound blocked", e));
    }
  };

  const playSecondPianoSound = () => {
    if (secondPianoAudioRef.current) {
      secondPianoAudioRef.current.currentTime = 0;
      secondPianoAudioRef.current.volume = 0.15;
      secondPianoAudioRef.current.play().catch(e => console.log("Secondary piano sound blocked", e));
    }
  };

  const nextPhase = () => {
    if (phase === 1) startAmbient();
    setPhase(phase + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto font-sans selection:bg-white/20 grain text-white bg-transparent">
      {/* Custom CURSOR SIGNATURE M&O */}
      <motion.div className="custom-cursor hidden md:block" style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}>
        M&O
      </motion.div>
      <motion.div className="custom-cursor-follower hidden md:block" style={{ x: followX, y: followY, translateX: '-50%', translateY: '-50%' }} />

      {/* Audio Elements */}
      <audio ref={waterAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-lake-waves-loop-1197.mp3" loop />
      <audio ref={paperAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-paper-slide-1530.mp3" />
      <audio ref={pianoAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-warm-piano-single-note-2023.mp3" />
      <audio ref={secondPianoAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-soft-piano-note-tone-575.mp3" />

      <AnimatePresence mode="wait">
        {phase === 1 && (
          <Phase1 key="phase1" onNext={nextPhase} />
        )}
        {phase === 2 && (
          <Phase2 key="phase2" onNext={nextPhase} />
        )}
        {phase === 3 && (
          <Phase3 key="phase3" onNext={nextPhase} onOpen={playPaperSound} />
        )}
        {phase === 4 && (
          <Phase4 key="phase4" onReveal={() => playPianoSound(0.4)} onHiddenReveal={playSecondPianoSound} />
        )}
      </AnimatePresence>

      {/* Cinematic SUNNY Background - Now in Bordeaux Setting */}
      <div className="fixed inset-0 -z-10 bg-[#45150D]">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 2.5 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-in-out"
            style={{ 
              backgroundImage: 'url("/chateau_sunny.png")', 
              // Focus Effect: Clear starting from Phase 3
              filter: `blur(${phase >= 3 ? '0px' : '10px'}) saturate(1.1) brightness(0.65)` 
            }}
          />
          {/* Subtle Bordeaux Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#45150D]/85 via-transparent opacity-80 to-[#45150D]/30" />
        </motion.div>
        
        {/* Phase 1 Solid Bordeaux Color */}
        {phase === 1 && (
          <motion.div 
            className="absolute inset-0 bg-[#45150D]"
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
