import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Phase3Props {
  onNext: () => void;
  onOpen: () => void;
}

const Phase3: React.FC<Phase3Props> = ({ onNext, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen();
      setTimeout(onNext, 4500);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-transparent px-8 relative z-50 overflow-hidden pt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 2.5 }}
    >
      <div className="relative w-80 h-64 sm:w-[500px] sm:h-[350px] cursor-pointer transition-all duration-1200 group" onClick={handleOpen}>
        
        {/* ENVELOPE BODY (Antique Parchment Texture) */}
        <motion.div 
          className="absolute inset-0 bg-[#E9E4D4] rounded-sm shadow-[0_50px_150px_rgba(0,0,0,0.6)] flex items-center justify-center border-t border-l border-white/20 z-20 overflow-hidden deckle-edge"
          style={{ 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4), inset 0 0 60px rgba(0,0,0,0.03)'
          }}
          layoutId="envelope"
        >
          {/* Subtle paper stains */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #8B4513 0%, transparent 70%)', filter: 'blur(40px)' }} />
          
          <div className="flex flex-col items-center space-y-10 relative z-10">
             <p className="text-[#8B4513]/40 font-medium tracking-[1em] text-[13px] uppercase font-sans">
               {/* Changed 'à toi' to 'pour toi' */}
               pour toi, mon amour
             </p>
             <p className="text-[#5D4037] font-title italic text-6xl md:text-8xl drop-shadow-sm leading-tight tracking-tighter">Manon</p>
             <div className="h-[0.5px] w-24 bg-[#8B4513]/10" />
          </div>
        </motion.div>

        {/* FLAP */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/2 bg-[#EFE9D9] origin-top z-30 shadow-md border-b-[0.5px] border-[#8B4513]/10 overflow-hidden deckle-edge"
          style={{ 
            perspective: 2000, 
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")'
          }}
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, zIndex: 10, filter: "brightness(0.92)" } : { rotateX: 0 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        >
           <div className="w-full h-full flex items-end justify-center pb-8 overflow-visible">
              {!isOpen && (
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-[#A50000] via-[#8B0000] to-[#550000] flex items-center justify-center relative shadow-xl transform group-hover:scale-[1.08] transition-transform duration-1000"
                  style={{ 
                    borderRadius: '45% 55% 52% 48% / 50% 48% 52% 50%',
                    border: '1.5px solid rgba(255,255,255,0.1)'
                  }}
                >
                   <div className="absolute inset-0 rounded-full shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.5),inset_2px_2px_5px_rgba(255,255,255,0.2)] opacity-60" />
                   <span 
                     className="text-[#600000] font-title italic text-5xl relative z-10 select-none opacity-90"
                     style={{ 
                       textShadow: '1px 1px 1px rgba(255,255,255,0.1), -1.5px -1.5px 2px rgba(0,0,0,0.8)',
                       filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))'
                     }}
                   >
                     M
                   </span>
                </motion.div>
              )}
           </div>
        </motion.div>

        {/* LETTER */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 bg-[#F5F1E6] shadow-3xl mx-4 z-10 p-16 flex flex-col items-center justify-center text-[#5D4037] deckle-edge rounded-sm border border-white/5"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -230, opacity: 1, scale: 1.05 }}
              transition={{ delay: 1.5, duration: 2.2, ease: "easeOut" }}
            >
              <div className="w-full h-[0.5px] bg-[#8B4513]/10 mb-12" />
              <p className="uppercase tracking-[1.4em] text-[10px] text-[#8B4513]/40 mb-10 font-semibold leading-none font-sans">Invitation Privée</p>
              <p className="font-title italic text-5xl text-[#5D4037] leading-tight px-4 drop-shadow-xs">Un moment unique</p>
              <div className="w-full h-[0.5px] bg-[#8B4513]/10 mt-12" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.p 
        className="mt-40 text-white tracking-[1.2em] uppercase text-[12px] font-medium drop-shadow-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5 }}
      >
        L'élégance de ton attente
      </motion.p>
    </motion.div>
  );
};

export default Phase3;
