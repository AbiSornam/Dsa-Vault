import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BadgeNotification = ({ badges, onClose }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-24 right-6 z-50 max-w-md"
      >
        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-2xl shadow-2xl">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  New Badge{badges.length > 1 ? 's' : ''} Earned! 🎉
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-base-200 rounded-lg transition-colors"
                >
                <X className="w-4 h-4 text-base-content/60" />
              </button>
            </div>

            <div className="space-y-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-base-200 rounded-xl"
                >
                  <div className="text-4xl">{badge.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-base-content">
                      {badge.badgeName}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {badge.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/badges"
              onClick={onClose}
              className="mt-4 block text-center py-2 px-4 bg-primary hover:bg-primary/90 text-primary-content rounded-lg font-medium transition-colors"
            >
              View All Badges
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BadgeNotification;
