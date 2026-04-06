import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface Phase1Props {
  onNext: () => void;
}

const Phase1: React.FC<Phase1Props> = ({ onNext }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.8
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      filter: "blur(30px)",
      transition: { duration: 1.8, ease: [0.19, 1, 0.22, 1] }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, letterSpacing: '0.9em' },
    visible: { 
      opacity: 1, 
      y: 0, 
      letterSpacing: '0.7em',
      transition: { duration: 2.5, ease: [0.19, 1, 0.22, 1] } 
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 3.5, ease: [0.19, 1, 0.22, 1] } 
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-50 pt-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.p 
        variants={itemVariants} 
        className="text-[12px] sm:text-[14px] font-medium tracking-[0.9em] uppercase text-white/50 mb-10"
      >
        Pour toi, mon amour
      </motion.p>
      
      <div className="relative group flex flex-col items-center mb-20">
        <motion.h1 
          variants={titleVariants} 
          // Changed text from Oscar & Manon to Joyeux Anniversaire
          className="font-title italic text-6xl sm:text-[120px] leading-tight tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
        >
          Joyeux Anniversaire
        </motion.h1>
        {/* Fine white line separator */}
        <motion.div 
           className="h-[1px] w-32 bg-white/20 mt-10"
           initial={{ width: 0, opacity: 0 }}
           animate={{ width: 220, opacity: 0.3 }}
           transition={{ delay: 3.2, duration: 3 }}
        />
      </div>
      
      <motion.p 
        variants={itemVariants} 
        className="text-lg sm:text-xl font-light tracking-[0.4em] font-serif italic text-white/60 mb-24 max-w-sm sm:max-w-none"
      >
        Ta petite surprise t'attend...
        {/* Removed "Laisse ton coeur etre conquis..." */}
      </motion.p>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02, letterSpacing: '0.8em', backgroundColor: 'rgba(255,255,255,0.08)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="group relative overflow-hidden px-16 py-6 border-[0.5px] border-white/20 rounded-full backdrop-blur-md transition-all duration-1000 bg-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <span className="relative z-10 text-[11px] uppercase tracking-[0.7em] font-medium text-white group-hover:text-white transition-colors duration-1000">Découvrir ta surprise</span>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </motion.button>
    </motion.div>
  );
};

export default Phase1;
