import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface Phase2Props {
  onNext: () => void;
}

const Phase2: React.FC<Phase2Props> = ({ onNext }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      y: -30,
      filter: "blur(20px)",
      transition: { duration: 1 }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } 
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen text-center px-6 max-w-6xl mx-auto relative z-50 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col items-center space-y-12 md:space-y-16">
        
        <motion.p variants={textVariants} className="text-[12px] md:text-[14px] font-medium tracking-[0.9em] uppercase text-white/50 font-sans">
          {/* Changed 'une attention' to 'un cadeau unique' */}
          un cadeau unique, pour tes 25 ans
        </motion.p>
        
        <div className="space-y-8 flex flex-col items-center">
          <motion.h2 
            variants={textVariants} 
            className="text-5xl md:text-[90px] font-title italic text-white leading-[1.05] max-w-4xl tracking-tighter"
          >
            Un pique-nique privé sur l'eau,<br />
            au pied du château.
          </motion.h2>

          <motion.div 
             className="h-[0.5px] w-32 bg-white/30 mx-auto"
             initial={{ width: 0, opacity: 0 }}
             animate={{ width: 180, opacity: 0.3 }}
             transition={{ delay: 1.5, duration: 2 }}
          />
          
          <motion.p 
            variants={textVariants} 
            className="text-3xl md:text-[42px] font-serif italic text-white/80 mt-10 leading-snug"
          >
            Au Domaine de Chantilly.
          </motion.p>
          
          <motion.p 
            variants={textVariants} 
            className="text-[12px] font-medium tracking-[0.7em] text-white/30 uppercase font-sans"
          >
            Juste toi et moi.
          </motion.p>
        </div>

        <motion.div 
          variants={textVariants}
          className="pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2, letterSpacing: '0.8em', backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="group relative overflow-hidden px-14 py-6 border-[0.5px] border-white/40 rounded-full backdrop-blur-xl bg-white/5 shadow-2xl text-white font-semibold"
          >
            <span className="relative z-10 text-[12px] uppercase tracking-[0.6em]">Découvrir ton invitation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Phase2;
