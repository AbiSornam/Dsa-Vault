import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative group"
        title="Change Theme"
      >
        <Palette size={20} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800" 
          style={{ backgroundColor: themes[currentTheme].colors.primary }}
        />
      </button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 overflow-hidden border border-slate-200 dark:border-slate-700"
            >
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    console.log('Theme button clicked:', key);
                    changeTheme(key);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left ${
                    currentTheme === key ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500' : ''
                  }`}
                >
                  {/* Color Preview */}
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-600 shadow-sm"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-white dark:border-slate-600 shadow-sm"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                  </div>
                  
                  {/* Theme Name */}
                  <span className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100">{theme.name}</span>
                  
                  {/* Selected Indicator */}
                  {currentTheme === key && (
                    <Check size={16} className="text-indigo-500" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
