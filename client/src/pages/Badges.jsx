import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, TrendingUp, X, RefreshCw, Sparkles, Star, Zap } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Badges = () => {
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [filter, setFilter] = useState('all'); // all, earned, locked
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await api.get('/badges');
      setBadges(response.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
      toast.error('Failed to load badges');
    } finally {
      setLoading(false);
    }
  };

  const checkNewBadges = async () => {
    setChecking(true);
    try {
      const response = await api.post('/badges/trigger');
      if (response.data.badges && response.data.badges.length > 0) {
        // Navigate to first badge earned with celebration page
        fetchBadges(); // Refresh the list
        navigate('/badge-earned', { state: { badge: response.data.badges[0] } });
      } else {
        toast.success('All badges checked! No new badges earned yet.');
      }
    } catch (error) {
      console.error('Error checking badges:', error);
      toast.error('Failed to check badges');
    } finally {
      setChecking(false);
    }
  };

  const filteredBadges = badges.filter(badge => {
    if (filter === 'earned') return !badge.locked;
    if (filter === 'locked') return badge.locked;
    return true;
  });

  const earnedCount = badges.filter(b => !b.locked).length;
  const totalCount = badges.length;
  const progressPercentage = totalCount > 0 ? (earnedCount / totalCount) * 100 : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-8 shadow-2xl"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-white">Achievement Gallery</h1>
                </div>
                <p className="text-white/90 text-lg">
                  Unlock badges as you master data structures and algorithms
                </p>
              </div>

              <motion.button
                onClick={checkNewBadges}
                disabled={checking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
              >
                <RefreshCw className={`w-5 h-5 ${checking ? 'animate-spin' : ''}`} />
                {checking ? 'Checking...' : 'Check New Badges'}
              </motion.button>
            </div>

            {/* Progress Section */}
            <div className="relative z-10 mt-8 bg-white/20 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-2xl">{earnedCount} / {totalCount}</h3>
                  <p className="text-white/80 text-sm">Badges Collected</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-3xl">{Math.round(progressPercentage)}%</p>
                  <p className="text-white/80 text-sm">Complete</p>
                </div>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-300 to-white rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              icon={<Award className="w-4 h-4" />}
              label="All Badges"
              count={totalCount}
            />
            <FilterButton
              active={filter === 'earned'}
              onClick={() => setFilter('earned')}
              icon={<Star className="w-4 h-4" />}
              label="Earned"
              count={earnedCount}
            />
            <FilterButton
              active={filter === 'locked'}
              onClick={() => setFilter('locked')}
              icon={<Lock className="w-4 h-4" />}
              label="Locked"
              count={totalCount - earnedCount}
            />
          </div>

          {/* Badge Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="h-64 bg-white/60 backdrop-blur-sm rounded-3xl animate-pulse border-2 border-orange-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredBadges.map((badge, index) => (
                  <BadgeCard
                    key={badge.badgeId || badge._id}
                    badge={badge}
                    index={index}
                    onClick={() => setSelectedBadge(badge)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {filteredBadges.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-orange-200"
            >
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 font-semibold">No badges found in this category.</p>
            </motion.div>
          )}
        </div>

        {/* Badge Detail Modal */}
        <AnimatePresence>
          {selectedBadge && (
            <BadgeDetailModal
              badge={selectedBadge}
              onClose={() => setSelectedBadge(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const FilterButton = ({ active, onClick, icon, label, count }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md ${
      active
        ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-lg'
        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300'
    }`}
  >
    {icon}
    <span>{label}</span>
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
      active ? 'bg-white/30' : 'bg-gray-100'
    }`}>
      {count}
    </span>
  </motion.button>
);

const BadgeCard = ({ badge, index, onClick }) => {
  const navigate = useNavigate();
  const tierColors = {
    bronze: 'from-amber-700 via-amber-600 to-amber-800',
    silver: 'from-slate-400 via-slate-300 to-slate-500',
    gold: 'from-yellow-400 via-yellow-300 to-yellow-500',
    platinum: 'from-purple-400 via-purple-300 to-purple-500',
    diamond: 'from-cyan-400 via-blue-400 to-blue-600'
  };

  const tierGlow = {
    bronze: 'shadow-amber-500/50',
    silver: 'shadow-slate-400/50',
    gold: 'shadow-yellow-400/50',
    platinum: 'shadow-purple-400/50',
    diamond: 'shadow-blue-400/50'
  };

  const handleCardClick = () => {
    if (!badge.locked) {
      // Navigate to full page celebration for earned badges
      navigate('/badge-earned', { state: { badge } });
    } else {
      // Show modal for locked badges
      onClick();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={handleCardClick}
      className={`relative bg-white/90 backdrop-blur-md p-6 rounded-3xl border-2 transition-all cursor-pointer overflow-hidden ${
        badge.locked
          ? 'border-gray-200 shadow-md'
          : `border-orange-200 shadow-xl ${!badge.locked && tierGlow[badge.tier]}`
      }`}
    >
      {/* Animated Background for Unlocked Badges */}
      {!badge.locked && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 bg-gradient-to-br ${tierColors[badge.tier]} blur-3xl`}
        />
      )}

      {/* Tier Badge */}
      <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${tierColors[badge.tier]} shadow-lg z-10`}>
        {badge.tier.toUpperCase()}
      </div>

      {/* Sparkles for Unlocked */}
      {!badge.locked && (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-3 left-3 z-10"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </motion.div>
      )}

      {/* Badge Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-8">
        <motion.div
          whileHover={!badge.locked ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className={`text-7xl mb-4 ${badge.locked ? 'grayscale opacity-40' : 'drop-shadow-2xl'}`}
        >
          {badge.locked ? '🔒' : badge.icon}
        </motion.div>
        
        <h3 className={`font-bold text-lg mb-2 ${
          badge.locked ? 'text-gray-400' : 'text-gray-800'
        }`}>
          {badge.badgeName}
        </h3>
        
        <p className={`text-xs mb-4 line-clamp-2 ${
          badge.locked ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {badge.description}
        </p>

        {/* Progress Bar for Locked Badges */}
        {badge.locked && badge.progress !== undefined && (
          <div className="w-full mt-auto">
            <div className="flex justify-between text-xs text-gray-600 mb-2 font-semibold">
              <span>Progress</span>
              <span>{Math.round(badge.progress)}%</span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${badge.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-400"
              />
            </div>
          </div>
        )}

        {/* Earned Date for Unlocked Badges */}
        {!badge.locked && badge.earnedAt && (
          <div className="mt-4 px-3 py-1.5 bg-green-100 rounded-lg">
            <p className="text-xs text-green-700 font-bold">
              Earned {new Date(badge.earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const BadgeDetailModal = ({ badge, onClose }) => {
  const tierColors = {
    bronze: 'from-amber-700 via-amber-600 to-amber-800',
    silver: 'from-slate-400 via-slate-300 to-slate-500',
    gold: 'from-yellow-400 via-yellow-300 to-yellow-500',
    platinum: 'from-purple-400 via-purple-300 to-purple-500',
    diamond: 'from-cyan-400 via-blue-400 to-blue-600'
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 max-w-lg w-full z-50 shadow-2xl border-2 border-orange-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center">
          {/* Badge Icon */}
          <motion.div
            animate={!badge.locked ? {
              rotate: [0, -5, 5, -5, 5, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ duration: 0.5 }}
            className={`text-9xl mb-6 ${badge.locked ? 'grayscale opacity-50' : ''}`}
          >
            {badge.locked ? '🔒' : badge.icon}
          </motion.div>

          {/* Badge Name */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {badge.badgeName}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {badge.description}
          </p>

          {/* Info Cards */}
          <div className="flex gap-4 justify-center mb-6">
            <div className="px-6 py-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl border-2 border-orange-200">
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Type</p>
              <p className="text-sm font-bold text-gray-800 capitalize mt-1">
                {badge.badgeType?.replace('_', ' ')}
              </p>
            </div>
            <div className={`px-6 py-3 bg-gradient-to-br ${tierColors[badge.tier]} rounded-xl border-2 border-white/50`}>
              <p className="text-xs text-white font-bold uppercase tracking-wider">Tier</p>
              <p className="text-sm font-bold text-white capitalize mt-1">
                {badge.tier}
              </p>
            </div>
          </div>

          {/* Status Section */}
          {!badge.locked && badge.earnedAt && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                <p className="text-green-700 font-bold">Achievement Unlocked!</p>
              </div>
              <p className="text-green-600 text-sm">
                Earned on {new Date(badge.earnedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}

          {badge.locked && badge.progress !== undefined && (
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200">
              <p className="text-gray-700 text-sm font-bold mb-3">
                {Math.round(badge.progress)}% Complete
              </p>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-400"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Keep going! You're making great progress.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Badges;
