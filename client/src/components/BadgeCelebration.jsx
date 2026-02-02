import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Star } from 'lucide-react';

const BadgeCelebration = ({ badges, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    if (badges.length > 1) {
      const timer = setTimeout(() => {
        if (currentIndex < badges.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          handleClose();
        }
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, badges.length]);

  if (!badges || badges.length === 0) return null;

  const currentBadge = badges[currentIndex];
  
  const tierStyles = {
    bronze: {
      gradient: 'from-amber-400 via-orange-400 to-amber-500',
      glow: 'from-amber-400 to-orange-500',
      accent: 'bg-amber-300/80',
      shadow: 'shadow-amber-500/50'
    },
    silver: {
      gradient: 'from-slate-300 via-cyan-200 to-slate-400',
      glow: 'from-slate-300 to-cyan-300',
      accent: 'bg-slate-200/80',
      shadow: 'shadow-slate-400/50'
    },
    gold: {
      gradient: 'from-yellow-300 via-amber-300 to-yellow-400',
      glow: 'from-yellow-300 to-amber-400',
      accent: 'bg-yellow-200/80',
      shadow: 'shadow-yellow-500/50'
    },
    platinum: {
      gradient: 'from-purple-300 via-pink-200 to-purple-400',
      glow: 'from-purple-300 to-pink-300',
      accent: 'bg-purple-200/80',
      shadow: 'shadow-purple-400/50'
    },
    diamond: {
      gradient: 'from-cyan-300 via-blue-400 to-purple-500',
      glow: 'from-cyan-300 to-purple-500',
      accent: 'bg-cyan-200/80',
      shadow: 'shadow-purple-500/50'
    }
  };

  const style = tierStyles[currentBadge.tier];

  return (
    <AnimatePresence>
      {!isClosing && (
        <>
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-pink-900/80 z-50 backdrop-blur-md"
          >
            {/* Animated Stars Background */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                className={`absolute w-${Math.random() > 0.5 ? '1' : '2'} h-${Math.random() > 0.5 ? '1' : '2'} bg-white rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </motion.div>

          {/* Celebration Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 100 }}
            transition={{ type: 'spring', duration: 0.7, bounce: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto">
              {/* Floating Particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    x: Math.cos((i / 15) * Math.PI * 2) * 200,
                    y: Math.sin((i / 15) * Math.PI * 2) * 200,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.3,
                    ease: 'easeOut'
                  }}
                  className={`absolute w-3 h-3 rounded-full pointer-events-none
                    ${i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-yellow-300'}
                  `}
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-6px',
                    marginTop: '-6px'
                  }}
                />
              ))}

              {/* Sparkle Effects */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [1, 0], scale: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${50 + Math.cos((i / 12) * Math.PI * 2) * 150}%`,
                    top: `${50 + Math.sin((i / 12) * Math.PI * 2) * 150}%`
                  }}
                />
              ))}

              {/* Main Badge Card */}
              <motion.div
                className={`relative bg-gradient-to-br ${style.gradient} p-8 rounded-3xl shadow-2xl border-4 border-white/40 backdrop-blur-sm overflow-hidden`}
              >
                {/* Animated Background Circles */}
                <motion.div
                  className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-40 ${style.accent}`}
                  animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className={`absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-30 ${style.accent}`}
                  animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2.5 bg-white/30 hover:bg-white/50 rounded-full transition-all backdrop-blur-sm z-10 border border-white/40"
                >
                  <X className="w-6 h-6 text-white font-bold" />
                </motion.button>

                {/* Content */}
                <div className="text-center space-y-6 relative z-10">
                  {/* Excited Headline */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <motion.h1 
                      className="text-5xl font-black text-white drop-shadow-xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      🎉 Awesome! 🎉
                    </motion.h1>
                    <p className="text-white/95 text-lg font-bold mt-2 drop-shadow-lg">
                      You've unlocked something special!
                    </p>
                  </motion.div>

                  {/* Bouncing Badge Icon */}
                  <motion.div
                    className="flex justify-center relative h-32 items-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.4,
                      type: 'spring',
                      stiffness: 80,
                      damping: 12
                    }}
                  >
                    {/* Pulsing Glow Ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${style.glow} blur-2xl opacity-50`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Badge Icon Container */}
                    <motion.div
                      className="relative text-8xl filter drop-shadow-2xl"
                      animate={{
                        y: [0, -25, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      {currentBadge.icon}
                    </motion.div>

                    {/* Orbiting Stars */}
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={`orbit-${i}`}
                        className="absolute text-2xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{
                          transformOrigin: '0 70px'
                        }}
                      >
                        <span>✨</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Badge Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <div>
                      <h2 className="text-4xl font-black text-white drop-shadow-lg mb-1">
                        {currentBadge.badgeName}
                      </h2>
                      <p className="text-white/90 text-base font-semibold flex items-center justify-center gap-2 drop-shadow">
                        <Star className="w-5 h-5 fill-current" />
                        {currentBadge.description}
                      </p>
                    </div>

                    {/* Achievement Details Box */}
                    <motion.div
                      className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/40 space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/30 rounded-xl p-3">
                          <p className="text-xs text-white/70 font-bold uppercase">Category</p>
                          <p className="text-lg font-black text-white capitalize mt-1">
                            {currentBadge.badgeType?.replace('_', ' ')}
                          </p>
                        </div>
                        <div className={`bg-white/30 rounded-xl p-3`}>
                          <p className="text-xs text-white/70 font-bold uppercase">Tier</p>
                          <p className="text-lg font-black text-white capitalize mt-1">
                            {currentBadge.tier}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Progress Indicator */}
                  {badges.length > 1 && (
                    <motion.div
                      className="flex justify-center gap-2 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {badges.map((_, idx) => (
                        <motion.div
                          key={idx}
                          className={`rounded-full transition-all ${
                            idx === currentIndex
                              ? `bg-white shadow-lg ${style.shadow} w-8 h-3`
                              : idx < currentIndex
                              ? 'bg-white/70 w-3 h-3'
                              : 'bg-white/30 w-3 h-3'
                          }`}
                          animate={idx === currentIndex ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Dismiss Text */}
                  <motion.p
                    className="text-white/80 text-sm font-bold tracking-wide"
                    animate={{ opacity: [0.6, 1, 0.6], y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨ Click to continue ✨
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BadgeCelebration;
