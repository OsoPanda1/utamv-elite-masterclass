import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),      // Show title
      setTimeout(() => setPhase(2), 2000),     // Show subtitle
      setTimeout(() => setPhase(3), 4500),     // Fade out
      setTimeout(() => onComplete(), 5500),    // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient glow effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 0.3 : 0 }}
              transition={{ duration: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(192,192,192,0.15) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: phase >= 1 ? 1 : 0, 
              y: phase >= 1 ? 0 : 20 
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center z-10"
          >
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 25%, #FFFFFF 50%, #A8A8A8 75%, #D4D4D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 60px rgba(192,192,192,0.3)',
              }}
            >
              MASTER 360
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ 
                opacity: phase >= 1 ? 1 : 0, 
                scaleX: phase >= 1 ? 1 : 0 
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] w-48 md:w-64 mx-auto my-4 md:my-6"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #C0C0C0 50%, transparent 100%)',
              }}
            />
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-display text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.3em] text-silver"
            >
              ELITE 2026
            </motion.h2>
          </motion.div>

          {/* Subtitle message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: phase >= 2 ? 1 : 0, 
              y: phase >= 2 ? 0 : 30 
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mt-12 md:mt-16 text-center z-10 px-4"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              BIENVENIDOS AL MASTER ENTERPRISE
            </p>
            <p className="text-base md:text-lg lg:text-xl text-silver/80 font-light tracking-widest mt-2">
              QUE EMPODERA Y FORJA LOS LÍDERES DEL MAÑANA
            </p>
          </motion.div>

          {/* UTAMV seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: phase >= 2 ? 0.6 : 0, 
              scale: phase >= 2 ? 1 : 0.8 
            }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-20 md:bottom-24"
          >
            <p className="text-xs md:text-sm tracking-[0.5em] text-muted-foreground/50 font-light">
              UTAMV • UNIVERSIDAD TECNOLÓGICA AVANZADA
            </p>
          </motion.div>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-xs tracking-wider text-muted-foreground hover:text-silver transition-colors"
          >
            SALTAR →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
