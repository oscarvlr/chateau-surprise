import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Phase4Props {
  onReveal: () => void;
  onHiddenReveal: () => void;
}

const Phase4: React.FC<Phase4Props> = ({ onReveal, onHiddenReveal }) => {
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onReveal();
    }, 2800);

    // Auto-scroll to details after they are revealed
    const scrollTimer = setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
    };
  }, [onReveal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onHiddenReveal();
    }, 11000); 
    return () => clearTimeout(timer);
  }, [onHiddenReveal]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[120vh] bg-transparent px-8 text-white relative overflow-visible font-serif py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4.5, ease: "easeOut" }}
    >
      {/* Background Initials Watermark */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
        initial={{ opacity: 0.0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 10, delay: 1 }}
      >
        <span 
          className="font-title italic text-white text-[320px] md:text-[650px] blur-[3px]"
          style={{ letterSpacing: '-0.04em' }}
        >
          M & O
        </span>
      </motion.div>

      <div className="relative flex flex-col items-center z-50 w-full max-w-4xl">
        <motion.div 
          className="w-full glass rounded-3xl shadow-[0_60px_200px_rgba(0,0,0,0.6)] p-12 md:p-24 flex flex-col items-center text-center space-y-16 relative overflow-hidden deckle-edge"
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 3.5, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Internal White Border */}
          <div className="absolute inset-8 border-[0.5px] border-white/10 rounded-2xl pointer-events-none" />

          {/* Header */}
          <div className="space-y-10 flex flex-col items-center z-10 w-full pt-4">
            <motion.p 
              className="text-[12px] font-medium tracking-[1.4em] text-white/30 uppercase"
              initial={{ opacity: 0, letterSpacing: '1.6em' }}
              animate={{ opacity: 1, letterSpacing: '1.4em' }}
              transition={{ delay: 3.5, duration: 3.5 }}
            >
              TON INVITATION
            </motion.p>
            <div className="h-[0.5px] w-28 bg-white/15" />
            <motion.h4 
              className="font-title italic text-6xl md:text-8xl text-white leading-tight mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 3.5 }}
            >
              Pour tes 25 ans
            </motion.h4>
          </div>

          <div className="space-y-8 z-10 w-full">
            <motion.p 
              className="text-2xl md:text-3xl font-light tracking-[0.05em] text-white/60 italic leading-relaxed px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.8, duration: 3.5 }}
            >
              Pour un moment hors du temps,<br />
              sur les eaux douces du Domaine.
            </motion.p>
          </div>

          {/* Details Grid */}
          <div 
            ref={detailsRef}
            className="grid grid-cols-2 gap-x-12 gap-y-16 w-full pt-10 z-10 scroll-mt-20"
          >
            <Detail label="Date" value="09 Mai 2026" delay={6.5} />
            <Detail label="Heure" value="13:00" delay={6.8} />
            <Detail label="Lieu" value="Chantilly" delay={7.1} />
            <Detail label="Dress Code" value="Casual Chic" delay={7.4} />
          </div>

          {/* Closing Sentiment */}
          <motion.div 
            className="pt-24 z-10 space-y-20 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 8.5, duration: 4 }}
          >
            <p className="font-title italic text-4xl text-white/90 leading-tight">
              "J'ai hâte de partager<br />cet instant à tes côtés."
            </p>
            
            <div className="flex flex-col items-center space-y-12">
               <span className="font-title text-5xl italic text-white/40 tracking-[0.4em] select-none">M & O</span>
               
               {/* PS - Moved here: Just under the M&O signature */}
               <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 11, duration: 4, ease: "easeInOut" }}
                >
                  <div className="h-[30px] w-[0.5px] bg-gradient-to-b from-white/20 to-transparent mb-8" />
                  <p className="text-[11px] italic tracking-[0.35em] text-white/30 font-semibold uppercase text-center px-10 leading-relaxed max-w-sm">
                    PS : Je crois que ce sera l'un de nos plus beaux souvenirs.
                  </p>
                </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Atmosphere Scroll Line at bottom */}
        <div className="mt-20 h-[60px] w-[0.5px] bg-white/10" />
      </div>
    </motion.div>
  );
};

const Detail = ({ label, value, delay }: { label: string, value: string, delay: number }) => (
  <motion.div 
    className="flex flex-col space-y-6 items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
  >
    <span className="text-[11px] uppercase tracking-[1em] text-white/30 font-bold">{label}</span>
    <span className="text-sm font-medium tracking-[0.25em] text-white/80">{value}</span>
  </motion.div>
);

export default Phase4;
