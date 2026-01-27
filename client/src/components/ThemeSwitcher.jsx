import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredThemes = Object.entries(themes).filter(([key, theme]) =>
    theme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Theme Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative group"
        title="Change Theme"
      >
        <Palette size={20} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white" 
          style={{ backgroundColor: themes[currentTheme].colors.primary }}
        />
      </button>

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Choose Your Theme</h2>
                    <p className="text-sm text-slate-500 mt-1">Pick from 32+ beautiful themes</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-slate-600" />
                  </button>
                </div>

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search themes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>

              {/* Theme Grid */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredThemes.map(([key, theme]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        changeTheme(key);
                        setIsOpen(false);
                      }}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        currentTheme === key
                          ? 'border-indigo-500 shadow-lg'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Selected Indicator */}
                      {currentTheme === key && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}

                      {/* Theme Preview */}
                      <div className="space-y-2 mb-3">
                        {/* Color Circles */}
                        <div className="flex gap-1.5 justify-center">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>

                        {/* Background Preview */}
                        <div
                          className="h-12 rounded-lg border border-slate-200 flex items-center justify-center"
                          style={{ backgroundColor: theme.colors.background }}
                        >
                          <div
                            className="px-3 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: theme.colors.primary,
                              color: theme.colors.background
                            }}
                          >
                            Preview
                          </div>
                        </div>
                      </div>

                      {/* Theme Name */}
                      <p className="text-sm font-semibold text-slate-900">{theme.name}</p>
                    </motion.button>
                  ))}
                </div>

                {filteredThemes.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    No themes found matching "{search}"
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitcher;
