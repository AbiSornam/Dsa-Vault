import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Download, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

const BadgeEarned = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const badge = location.state?.badge;
  const cardRef = useRef(null);

  if (!badge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <p className="text-base-content mb-4">No badge to display</p>
          <button
            onClick={() => navigate('/badges')}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-content rounded-lg"
          >
            Back to Badges
          </button>
        </div>
      </div>
    );
  }

  const tierGradients = {
    bronze: 'from-amber-600 via-amber-500 to-yellow-400',
    silver: 'from-slate-400 via-slate-300 to-gray-200',
    gold: 'from-yellow-500 via-yellow-400 to-amber-300',
    platinum: 'from-gray-300 via-gray-100 to-white',
    diamond: 'from-cyan-400 via-blue-500 to-purple-600'
  };

  const tierEmoji = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
    diamond: '👑'
  };

  const sanitizeOklchColors = (doc) => {
    const elements = doc.querySelectorAll('*');
    elements.forEach((el) => {
      const style = doc.defaultView.getComputedStyle(el);

      if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
        el.style.backgroundColor = '#0f172a';
      }

      if (style.color && style.color.includes('oklch')) {
        el.style.color = '#ffffff';
      }

      if (style.borderColor && style.borderColor.includes('oklch')) {
        el.style.borderColor = '#ffffff';
      }

      if (style.backgroundImage && style.backgroundImage.includes('oklch')) {
        el.style.backgroundImage = 'none';
      }
    });
  };

  const handleDownloadImage = async () => {
    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#0f172a',
        scale: 2,
        onclone: (doc) => sanitizeOklchColors(doc),
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${badge.badgeName}-badge.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleShare = async () => {
    try {
      const element = cardRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#0f172a',
        scale: 2,
        onclone: (doc) => sanitizeOklchColors(doc),
      });
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `${badge.badgeName}-badge.png`, { type: 'image/png' });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: 'My Achievement Badge',
            text: `I just earned the ${badge.badgeName} badge on CodeIntuit!`
          });
        } else {
          alert('Share functionality not supported on this device');
        }
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            animate={{
              y: [0, -300],
              opacity: [0, 1, 0],
              x: Math.random() * 400 - 200,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/badges')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-base-100 hover:bg-base-200 text-base-content rounded-lg transition-all z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12 z-10 relative"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-black text-white mb-2 flex items-center justify-center gap-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy className="w-12 h-12 text-yellow-400" />
          Congratulations!
        </motion.h1>
        <p className="text-xl text-slate-400">You've unlocked a new achievement</p>
      </motion.div>

      {/* Badge Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          delay: 0.4,
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
        className={`relative bg-gradient-to-br ${tierGradients[badge.tier]} p-12 rounded-3xl shadow-2xl border-4 border-white max-w-md z-10`}
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${tierGradients[badge.tier]} rounded-3xl blur-2xl opacity-30 -z-10`}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Tier Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
        >
          <span className="text-2xl mr-2">{tierEmoji[badge.tier]}</span>
          <span className="font-bold text-white uppercase tracking-widest text-sm">
            {badge.tier}
          </span>
        </motion.div>

        {/* Badge Icon with Float Animation */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-9xl filter drop-shadow-lg">{badge.icon}</div>
        </motion.div>

        {/* Badge Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-black text-white drop-shadow-md">
            {badge.badgeName}
          </h2>
          <p className="text-white/95 text-lg font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            {badge.description}
          </p>

          {/* Type & Tier Info */}
          <div className="flex gap-4 justify-center pt-4">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
              <p className="text-xs text-white/70 font-medium mb-1">Type</p>
              <p className="text-white font-bold capitalize">
                {badge.badgeType?.replace('_', ' ')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
              <p className="text-xs text-white/70 font-medium mb-1">Earned</p>
              <p className="text-white font-bold">
                {new Date(badge.earnedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex gap-4 mt-12 z-10 flex-wrap justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadImage}
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          <Download className="w-5 h-5" />
          Download Badge
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          <Share2 className="w-5 h-5" />
          Share Achievement
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/badges')}
          className="flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          View All Badges
        </motion.button>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: [
                'rgba(99, 102, 241, 0.6)',
                'rgba(168, 85, 247, 0.6)',
                'rgba(236, 72, 153, 0.6)',
              ][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 200 - 100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BadgeEarned;
