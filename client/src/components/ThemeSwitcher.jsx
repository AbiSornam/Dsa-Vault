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
        className="p-2 text-base-content/70 hover:bg-base-200 rounded-lg transition-colors relative group"
        title="Change Theme"
      >
        <Palette size={20} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-base-100 overflow-hidden">
          <span data-theme={currentTheme} className="block h-full w-full rounded-full bg-primary" />
        </span>
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
              className="absolute top-full right-0 mt-2 w-[22rem] sm:w-[26rem] bg-base-100 rounded-xl shadow-lg z-50 overflow-hidden border border-base-300"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 max-h-80 overflow-auto">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      console.log('Theme button clicked:', theme.id);
                      changeTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-base-200 transition-colors text-left border ${
                      currentTheme === theme.id
                        ? 'bg-primary/10 border-primary/40'
                        : 'border-transparent'
                    }`}
                  >
                    {/* Color Preview */}
                    <div data-theme={theme.id} className="flex gap-1">
                      <div className="w-3.5 h-3.5 rounded-full border border-base-300 shadow-sm bg-primary" />
                      <div className="w-3.5 h-3.5 rounded-full border border-base-300 shadow-sm bg-secondary" />
                    </div>
                    
                    {/* Theme Name */}
                    <span className="flex-1 text-xs font-semibold text-base-content truncate">{theme.name}</span>
                    
                    {/* Selected Indicator */}
                    {currentTheme === theme.id && (
                      <Check size={14} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
