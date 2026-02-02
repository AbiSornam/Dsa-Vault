import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Trophy, Target, Brain, Zap, TrendingUp, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Character Components
const CloudCharacter = ({ color, size = 100, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -8, 0, -5, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="relative inline-block"
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      {/* Cloud body */}
      <circle cx="50" cy="45" r="25" fill={color} />
      <circle cx="35" cy="50" r="20" fill={color} />
      <circle cx="65" cy="50" r="20" fill={color} />
      <circle cx="30" cy="35" r="15" fill={color} />
      <circle cx="70" cy="35" r="15" fill={color} />
      
      {/* Eyes */}
      <circle cx="40" cy="40" r="5" fill="white" />
      <circle cx="60" cy="40" r="5" fill="white" />
      <circle cx="42" cy="40" r="3" fill="black" />
      <circle cx="62" cy="40" r="3" fill="black" />
      
      {/* Arms */}
      <motion.line
        animate={{ rotate: [0, 20, 0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="25" y1="50" x2="10" y2="55"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '25px 50px' }}
      />
      <motion.line
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="75" y1="50" x2="90" y2="55"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '75px 50px' }}
      />
      
      {/* Legs */}
      <motion.line
        animate={{ rotate: [0, 25, 0, -25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="40" y1="70" x2="35" y2="85"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '40px 70px' }}
      />
      <motion.line
        animate={{ rotate: [0, -25, 0, 25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="60" y1="70" x2="65" y2="85"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '60px 70px' }}
      />
    </svg>
  </motion.div>
);

const DropletCharacter = ({ color, size = 100, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -8, 0, -5, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="relative inline-block"
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      {/* Droplet body */}
      <path d="M 50 20 Q 30 40, 30 60 Q 30 80, 50 85 Q 70 80, 70 60 Q 70 40, 50 20 Z" fill={color} />
      
      {/* Eyes */}
      <circle cx="42" cy="50" r="4" fill="white" />
      <circle cx="58" cy="50" r="4" fill="white" />
      <circle cx="43" cy="50" r="2.5" fill="black" />
      <circle cx="59" cy="50" r="2.5" fill="black" />
      
      {/* Nose */}
      <circle cx="50" cy="58" r="2" fill="rgba(0,0,0,0.3)" />
      
      {/* Arms */}
      <motion.line
        animate={{ rotate: [0, 20, 0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="28" y1="55" x2="15" y2="60"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '28px 55px' }}
      />
      <motion.line
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="72" y1="55" x2="85" y2="60"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '72px 55px' }}
      />
      
      {/* Legs */}
      <motion.line
        animate={{ rotate: [0, 25, 0, -25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="42" y1="82" x2="38" y2="95"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '42px 82px' }}
      />
      <motion.line
        animate={{ rotate: [0, -25, 0, 25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="58" y1="82" x2="62" y2="95"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '58px 82px' }}
      />
    </svg>
  </motion.div>
);

const TriangleCharacter = ({ color, size = 100, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -8, 0, -5, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="relative inline-block"
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      {/* Triangle body */}
      <path d="M 50 20 L 80 75 L 20 75 Z" fill={color} />
      
      {/* Eyes */}
      <circle cx="42" cy="50" r="5" fill="white" />
      <circle cx="58" cy="50" r="5" fill="white" />
      <circle cx="43" cy="50" r="3" fill="black" />
      <circle cx="59" cy="50" r="3" fill="black" />
      
      {/* Nose */}
      <circle cx="50" cy="60" r="2" fill="rgba(0,0,0,0.3)" />
      
      {/* Arms */}
      <motion.line
        animate={{ rotate: [0, 20, 0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="25" y1="60" x2="10" y2="65"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '25px 60px' }}
      />
      <motion.line
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="75" y1="60" x2="90" y2="65"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '75px 60px' }}
      />
      
      {/* Legs */}
      <motion.line
        animate={{ rotate: [0, 25, 0, -25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="40" y1="75" x2="35" y2="90"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '40px 75px' }}
      />
      <motion.line
        animate={{ rotate: [0, -25, 0, 25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="60" y1="75" x2="65" y2="90"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '60px 75px' }}
      />
    </svg>
  </motion.div>
);

const MonsterCharacter = ({ color, size = 100, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -8, 0, -5, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="relative inline-block"
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      {/* Monster body */}
      <circle cx="50" cy="50" r="30" fill={color} />
      <circle cx="35" cy="50" r="15" fill={color} />
      <circle cx="65" cy="50" r="15" fill={color} />
      
      {/* Eyes */}
      <circle cx="42" cy="45" r="5" fill="white" />
      <circle cx="62" cy="45" r="5" fill="white" />
      <circle cx="43" cy="45" r="3" fill="black" />
      <circle cx="63" cy="45" r="3" fill="black" />
      
      {/* Mouth with teeth */}
      <path d="M 35 58 Q 50 68, 65 58" stroke="black" strokeWidth="2" fill="none" />
      <line x1="40" y1="58" x2="40" y2="63" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="62" x2="50" y2="67" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="58" x2="60" y2="63" stroke="white" strokeWidth="3" strokeLinecap="round" />
      
      {/* Arms - waving */}
      <motion.path
        animate={{ rotate: [0, 30, 0, -30, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        d="M 22 50 Q 15 45, 10 50"
        stroke="black" strokeWidth="3" fill="none" strokeLinecap="round"
        style={{ transformOrigin: '22px 50px' }}
      />
      <motion.line
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="78" y1="50" x2="90" y2="55"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '78px 50px' }}
      />
      
      {/* Legs */}
      <motion.line
        animate={{ rotate: [0, 25, 0, -25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="40" y1="75" x2="35" y2="90"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '40px 75px' }}
      />
      <motion.line
        animate={{ rotate: [0, -25, 0, 25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="60" y1="75" x2="65" y2="90"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '60px 75px' }}
      />
    </svg>
  </motion.div>
);

const StarCharacter = ({ color, size = 100, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -8, 0, -5, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="relative inline-block"
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      {/* Star body with spikes */}
      <circle cx="50" cy="45" r="22" fill={color} />
      <polygon points="50,15 54,30 50,25 46,30" fill={color} />
      <polygon points="72,35 62,42 67,40 65,48" fill={color} />
      <polygon points="72,55 62,50 67,52 65,45" fill={color} />
      <polygon points="28,35 38,42 33,40 35,48" fill={color} />
      <polygon points="28,55 38,50 33,52 35,45" fill={color} />
      <polygon points="50,68 54,58 50,62 46,58" fill={color} />
      
      {/* Eyes */}
      <circle cx="42" cy="42" r="4" fill="white" />
      <circle cx="58" cy="42" r="4" fill="white" />
      <circle cx="43" cy="42" r="2.5" fill="black" />
      <circle cx="59" cy="42" r="2.5" fill="black" />
      
      {/* Mouth */}
      <path d="M 42 52 Q 50 56, 58 52" stroke="black" strokeWidth="2" fill="none" />
      
      {/* Arms */}
      <motion.line
        animate={{ rotate: [0, 20, 0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="28" y1="48" x2="15" y2="53"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '28px 48px' }}
      />
      <motion.line
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="72" y1="48" x2="85" y2="53"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '72px 48px' }}
      />
      
      {/* Legs */}
      <motion.line
        animate={{ rotate: [0, 25, 0, -25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="42" y1="65" x2="38" y2="80"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '42px 65px' }}
      />
      <motion.line
        animate={{ rotate: [0, -25, 0, 25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="58" y1="65" x2="62" y2="80"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '58px 65px' }}
      />
    </svg>
  </motion.div>
);

const CircleCharacter = ({ color, size = 100, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -8, 0, -5, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className="relative inline-block"
    style={{ width: size, height: size }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" className="overflow-visible">
      {/* Circle body */}
      <circle cx="50" cy="45" r="28" fill={color} />
      
      {/* Eyes */}
      <circle cx="40" cy="42" r="5" fill="white" />
      <circle cx="60" cy="42" r="5" fill="white" />
      <circle cx="42" cy="42" r="3" fill="black" />
      <circle cx="62" cy="42" r="3" fill="black" />
      
      {/* Smile */}
      <path d="M 38 52 Q 50 58, 62 52" stroke="black" strokeWidth="2" fill="none" />
      
      {/* Arms */}
      <motion.line
        animate={{ rotate: [0, 20, 0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="22" y1="45" x2="8" y2="50"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '22px 45px' }}
      />
      <motion.line
        animate={{ rotate: [0, -20, 0, 20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="78" y1="45" x2="92" y2="50"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '78px 45px' }}
      />
      
      {/* Legs */}
      <motion.line
        animate={{ rotate: [0, 25, 0, -25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="40" y1="70" x2="35" y2="85"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '40px 70px' }}
      />
      <motion.line
        animate={{ rotate: [0, -25, 0, 25, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
        x1="60" y1="70" x2="65" y2="85"
        stroke="black" strokeWidth="3" strokeLinecap="round"
        style={{ transformOrigin: '60px 70px' }}
      />
    </svg>
  </motion.div>
);

const SuperpowerCard = ({ icon: Icon, title, to }) => (
  <Link to={to}>
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white border-2 border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <Icon size={24} className="text-brand group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <ArrowRight size={20} className="text-gray-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  </Link>
);

const FAQModal = ({ question, answer, onClose, character }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-2xl"
      >
        ✕
      </button>

      {/* Avatar and Question */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
        <h3 className="text-xl font-bold text-gray-900 pt-1">{question}</h3>
      </div>

      {/* Answer Text */}
      <p className="text-gray-700 leading-relaxed mb-8 text-base">
        {answer}
      </p>

      {/* Learn More Button */}
      <button
        onClick={onClose}
        className="w-full px-8 py-3 bg-brand text-white rounded-full font-bold hover:bg-purple-700 transition mb-4"
      >
        Learn More
      </button>

      {/* Character */}
      <div className="absolute bottom-2 right-6 pointer-events-none">
        {character}
      </div>
    </motion.div>
  </motion.div>
);

const FAQCard = ({ question, answer, character, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all max-w-xs"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
            <h3 className="text-lg font-semibold text-gray-800 pt-0.5">{question}</h3>
          </div>
          <div className="text-2xl text-brand font-bold flex-shrink-0 hover:scale-110 transition-transform">+</div>
        </div>
      </motion.div>

      {isOpen && (
        <FAQModal
          question={question}
          answer={answer}
          character={character}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Animated Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [-100, 1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0"
        >
          <div className="w-32 h-20 bg-white/40 rounded-full blur-sm"></div>
        </motion.div>
        <motion.div
          animate={{ x: [-200, 1600] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 left-0"
        >
          <div className="w-40 h-24 bg-white/30 rounded-full blur-sm"></div>
        </motion.div>
        <motion.div
          animate={{ x: [-150, 1550] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-60 left-0"
        >
          <div className="w-36 h-22 bg-white/35 rounded-full blur-sm"></div>
        </motion.div>
        <motion.div
          animate={{ x: [-180, 1580] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute top-96 left-0"
        >
          <div className="w-44 h-26 bg-white/25 rounded-full blur-sm"></div>
        </motion.div>
      </div>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            📚
          </div>
          <span className="font-bold text-2xl text-gray-800">DSA Vault</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/blog" className="text-brand font-semibold hover:text-purple-700 transition hidden md:block">
            Blog
          </Link>
          <Link to="/whats-new" className="text-brand font-semibold hover:text-purple-700 transition hidden md:block">
            What's New?
          </Link>
          <Link 
            to="/register"
            className="px-8 py-3 rounded-full bg-brand text-white font-bold hover:bg-purple-700 transition shadow-lg"
          >
            Get Started For Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Interview Panic Stops Here. Meet 📚 DSA Vault.
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Get instant, <span className="font-bold">AI-powered coding support</span> the moment you need it. 
              DSA Vault has <span className="font-bold">smart tracking, personalized insights tailored to your learning journey</span> with 
              intelligent reminders and guidance. Code confidently, with <span className="font-bold">the only DSA learning companion you'll ever need.</span>
            </p>

            <Link 
              to="/register"
              className="inline-block px-10 py-4 rounded-full bg-brand text-white font-bold text-lg hover:bg-purple-700 transition shadow-xl"
            >
              Get Started For Free
            </Link>

            <p className="text-sm text-gray-600 flex items-center gap-2">
              Available on: <span className="text-2xl">🖥️ 📱</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Orange gradient background blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-orange-200 to-pink-200 rounded-[8rem] transform rotate-6 scale-110 blur-2xl opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-pink-300 via-orange-200 to-orange-300 rounded-[8rem] transform -rotate-6 scale-105 blur-xl opacity-50"></div>
              
              {/* Mock Phone Frames */}
              <div className="absolute right-0 top-0 w-80 bg-white rounded-[3rem] shadow-2xl border-8 border-gray-900 p-6 transform -rotate-6 z-10">
                <div className="w-20 h-6 bg-gray-900 rounded-full mx-auto mb-4"></div>
                <div className="bg-gradient-to-b from-purple-100 to-blue-100 rounded-3xl h-full p-6 space-y-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-orange-400 rounded-full"></div>
                      <div className="text-sm font-semibold">Daily Challenge</div>
                    </div>
                    <div className="text-xs text-gray-600">Binary Tree Traversal</div>
                    <div className="flex gap-2 mt-3">
                      <TriangleCharacter color="#5BA3E0" size={40} delay={0} />
                      <TriangleCharacter color="#7CBAF0" size={35} delay={0.2} />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="text-xs text-gray-600 mb-2">Your Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand rounded-full h-2 w-3/4"></div>
                    </div>
                    <div className="text-xs font-semibold mt-2">75% Complete</div>
                  </div>
                  <div className="bg-white rounded-2xl p-3 shadow-sm">
                    <div className="text-xs text-gray-600">Next Review</div>
                    <div className="text-sm font-semibold">Linked Lists</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute left-0 top-20 w-80 bg-white rounded-[3rem] shadow-2xl border-8 border-gray-900 p-6 transform rotate-6 z-10">
                <div className="w-20 h-6 bg-gray-900 rounded-full mx-auto mb-4"></div>
                <div className="bg-gradient-to-b from-orange-100 to-pink-100 rounded-3xl h-full p-6 space-y-4 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">🏆</div>
                    <div className="font-bold text-2xl text-gray-800">Badge Earned!</div>
                    <div className="text-lg text-gray-600 mt-2">Array Master</div>
                    <div className="mt-4 flex justify-center gap-2">
                      <CircleCharacter color="#FFA94D" size={50} delay={0} />
                      <StarCharacter color="#FF8FA3" size={50} delay={0.3} />
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-2xl p-3 shadow-sm mt-4">
                    <div className="text-xs text-gray-600 text-center">23 problems solved</div>
                    <div className="text-sm font-semibold text-center mt-1">Keep going! 🚀</div>
                  </div>
                </div>
              </div>
              
              {/* Badge Icon Overlay */}
              <div className="absolute bottom-10 right-10 z-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 bg-purple-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
                >
                  <Trophy size={40} className="text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Personalization Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          {/* Scrolling DSA Terms Marquee */}
          <div className="w-full bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-4 mb-16 overflow-hidden">
            <motion.div
              animate={{ x: [-2000, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-12 whitespace-nowrap text-lg"
            >
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="text-purple-600 font-bold">ARRAYS</span>
                  <span className="text-pink-600 font-semibold">LINKED LISTS</span>
                  <span className="text-orange-600 font-bold">BINARY TREES</span>
                  <span className="text-blue-600 font-semibold">GRAPHS</span>
                  <span className="text-green-600 font-bold">DYNAMIC PROGRAMMING</span>
                  <span className="text-purple-700 font-semibold">SORTING</span>
                  <span className="text-pink-700 font-bold">RECURSION</span>
                  <span className="text-orange-700 font-semibold">HASH MAPS</span>
                  <span className="text-blue-700 font-bold">STACKS & QUEUES</span>
                  <span className="text-green-700 font-semibold">ALGORITHMS</span>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center px-6">
            DSA Learning isn't one-size-fits-all.<br />
            Your support shouldn't be, either.
          </h2>

          {/* Animated Characters Row */}
          <div className="relative h-48 overflow-hidden my-16 bg-gradient-to-r from-orange-50 via-purple-50 to-blue-50">
            <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-4 px-4">
              <CloudCharacter color="#FF9B71" size={90} delay={0} />
              <CloudCharacter color="#FFB399" size={60} delay={0.2} />
              <DropletCharacter color="#B8A6E5" size={80} delay={0.1} />
              <DropletCharacter color="#D0C4F0" size={55} delay={0.3} />
              <TriangleCharacter color="#5BA3E0" size={95} delay={0.15} />
              <TriangleCharacter color="#7CBAF0" size={65} delay={0.4} />
              <MonsterCharacter color="#6FCF97" size={90} delay={0.25} />
              <StarCharacter color="#FF8FA3" size={85} delay={0.35} />
              <CircleCharacter color="#FFA94D" size={100} delay={0.5} />
              <CloudCharacter color="#FFB399" size={70} delay={0.45} />
              <CircleCharacter color="#FF9B71" size={65} delay={0.6} />
            </div>
          </div>

          <p className="text-xl text-gray-700 mt-12 max-w-3xl mx-auto text-center px-6">
            DSA Vault learns and remembers what matters: your <span className="font-bold">problem-solving patterns</span>, <span className="font-bold">difficulty preferences</span>, and <span className="font-bold">past victories</span>
          </p>
        </motion.div>

        {/* Superpowers Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-gradient-to-br from-purple-200 via-purple-100 to-blue-100 rounded-[4rem] p-12 md:p-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            What Coding Superpower<br />Do You Need Today?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <SuperpowerCard 
              icon={BookOpen}
              title="Learn a new data structure"
              to="/problems"
            />
            <SuperpowerCard 
              icon={Brain}
              title="Get AI-powered problem hints"
              to="/register"
            />
            <SuperpowerCard 
              icon={Target}
              title="Practice algorithm patterns"
              to="/problems"
            />
            <SuperpowerCard 
              icon={TrendingUp}
              title="Track my progress journey"
              to="/dashboard"
            />
            <SuperpowerCard 
              icon={Trophy}
              title="Earn achievement badges"
              to="/badges"
            />
            <SuperpowerCard 
              icon={Zap}
              title="Get revision reminders"
              to="/register"
            />
          </div>

          <div className="mt-12 text-center relative">
            <motion.div
              className="absolute bottom-0 left-20 hidden lg:block"
            >
              <CloudCharacter color="#FF9B71" size={100} delay={0} />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full shadow-2xl relative z-10"
            >
              <div className="w-full h-full flex items-center justify-center text-5xl">
                🎯
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 right-20 hidden lg:block"
            >
              <MonsterCharacter color="#6FCF97" size={100} delay={0.3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section - Replace FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          <div className="text-center mb-16">
            <p className="text-gray-600 text-lg mb-4">Coding interviews are tough. DSA Vault makes them easier.</p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              One App for All Your<br />DSA Learning Needs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Orange Card - 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-8 text-white overflow-hidden relative"
            >
              {/* Decorative orange bar on left */}
              <div className="absolute left-0 top-0 w-2 h-full bg-orange-600"></div>
              
              <div className="relative z-10">
                {/* Chat bubbles preview */}
                <div className="mb-8 space-y-3">
                  <div className="bg-purple-200 text-gray-800 rounded-2xl p-4 text-sm max-w-xs">
                    <p className="font-semibold mb-1">🤔 Why is binary search O(log n)?</p>
                    <p className="text-xs">I'm confused about the time complexity...</p>
                  </div>
                  <div className="bg-white text-gray-800 rounded-2xl p-4 text-sm max-w-sm ml-8">
                    <p>Great question! Binary search eliminates half the search space with each iteration. Since we keep dividing by 2, we need log₂(n) iterations to process n elements.</p>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-3">24/7 AI-Powered Support</h3>
                <p className="text-white/90 leading-relaxed">
                  Real-time, AI-backed hints and explanations tailored to <span className="font-bold">your learning style</span>—available whenever you need it (even at 3am during interview prep!).
                </p>
              </div>
            </motion.div>

            {/* Purple Card - Smart Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-300 to-purple-400 rounded-3xl p-8 text-gray-900 overflow-hidden"
            >
              {/* Preview content */}
              <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900">Array Fundamentals</h4>
                  <span className="text-2xl">+</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete in 20 min • Easy Level</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-700">Master sorting algorithms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-gray-700">Learn searching techniques</span>
                  </div>
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-3">Smart, Adaptive Tracking</h3>
              <p className="text-gray-800 leading-relaxed">
                DSA Vault learns your patterns and <span className="font-bold">grows with you</span>. Track problems solved, topics mastered, and interview readiness—all in one place.
              </p>
            </motion.div>

            {/* Yellow Card - Personalized Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl p-8 text-gray-900 overflow-hidden"
            >
              {/* Preview cards */}
              <div className="mb-8 space-y-2">
                <div className="bg-white rounded-xl p-3 shadow-md flex items-center justify-between">
                  <span className="text-sm font-semibold">Two Pointers Approach</span>
                  <span className="text-lg">→</span>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-md flex items-center justify-between">
                  <span className="text-sm font-semibold">🌱 Graph Traversal Tip</span>
                  <span className="text-lg">→</span>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-md flex items-center justify-between">
                  <span className="text-sm font-semibold">🎯 Quick Sort Practice</span>
                  <span className="text-lg">→</span>
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-3">Tips Tailored Just for You</h3>
              <p className="text-gray-800 leading-relaxed">
                No more endless LeetCode scrolling. DSA Vault gives you <span className="font-bold">helpful, personalized tips</span>—so you can prepare with confidence (and way less guesswork).
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link 
              to="/register" 
              className="inline-block px-12 py-4 bg-brand text-white rounded-full font-bold text-lg hover:bg-purple-700 transition shadow-xl"
            >
              Get Started For Free
            </Link>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-white border border-gray-200 rounded-[3rem] p-16 text-center shadow-xl"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to ace your interviews?</h2>
          <p className="text-xl text-gray-700 mb-8">Join thousands of developers mastering DSA with confidence.</p>
          <Link 
            to="/register" 
            className="inline-block px-12 py-5 bg-brand text-white rounded-full font-bold text-lg hover:bg-purple-700 transition shadow-xl"
          >
            Start Your Journey Today
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-orange-50">
        {/* Cute character strip */}
        <div className="relative h-28 overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center gap-3 md:gap-5 pb-2">
            <CloudCharacter color="#FF9B71" size={70} delay={0} />
            <TriangleCharacter color="#5BA3E0" size={60} delay={0.2} />
            <StarCharacter color="#FF8FA3" size={60} delay={0.1} />
            <CircleCharacter color="#FFD166" size={85} delay={0.3} />
            <MonsterCharacter color="#6FCF97" size={60} delay={0.25} />
            <CircleCharacter color="#FFA94D" size={70} delay={0.35} />
            <DropletCharacter color="#D0C4F0" size={60} delay={0.4} />
          </div>
          <div className="absolute inset-0 bg-white/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Newsletter */}
            <div>
              <p className="text-gray-800 text-lg mb-6">Stay in the loop with DSA Vault updates.</p>
              <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden max-w-sm">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-5 py-3 outline-none text-gray-700"
                />
                <button className="px-6 py-3 bg-brand text-white font-semibold rounded-full m-1">
                  Sign up
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-4 text-brand font-semibold justify-items-start md:justify-items-center">
              <Link to="/blog" className="hover:text-purple-700 transition">Blog</Link>
              <Link to="/privacy" className="hover:text-purple-700 transition">Privacy Policy</Link>
              <Link to="/pricing" className="hover:text-purple-700 transition">Pricing</Link>
              <Link to="/terms" className="hover:text-purple-700 transition">Terms of Service</Link>
              <Link to="/roadmap" className="hover:text-purple-700 transition">Product Roadmap</Link>
              <Link to="/support" className="hover:text-purple-700 transition">Support</Link>
            </div>

            {/* Get the App */}
            <div className="text-right md:text-left">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Get the App</h4>
              <div className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-4 py-2">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                📚
              </div>
              <span className="font-bold text-gray-900 text-2xl">DSA Vault</span>
            </div>
            <p className="text-sm text-gray-600">© 2026 DSA Vault</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
