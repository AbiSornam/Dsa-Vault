import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// 32+ Theme definitions
export const themes = {
  // Light Themes
  default: {
    name: 'Default Light',
    colors: {
      primary: '#7c3aed',
      secondary: '#6366f1',
      accent: '#8b5cf6',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  ocean: {
    name: 'Ocean Blue',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#22d3ee',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      textSecondary: '#475569',
      border: '#bae6fd',
      success: '#14b8a6',
      warning: '#fbbf24',
      error: '#f43f5e'
    }
  },
  sunset: {
    name: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fdba74',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#7c2d12',
      textSecondary: '#78716c',
      border: '#fed7aa',
      success: '#84cc16',
      warning: '#eab308',
      error: '#dc2626'
    }
  },
  forest: {
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#064e3b',
      textSecondary: '#6b7280',
      border: '#bbf7d0',
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  lavender: {
    name: 'Lavender Dream',
    colors: {
      primary: '#a855f7',
      secondary: '#c084fc',
      accent: '#d8b4fe',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87',
      textSecondary: '#6b7280',
      border: '#e9d5ff',
      success: '#4ade80',
      warning: '#facc15',
      error: '#fb7185'
    }
  },
  rose: {
    name: 'Rose Pink',
    colors: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      accent: '#fda4af',
      background: '#fff1f2',
      surface: '#ffffff',
      text: '#881337',
      textSecondary: '#6b7280',
      border: '#fecdd3',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#dc2626'
    }
  },
  
  // Dark Themes
  darkDefault: {
    name: 'Dark Mode',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  darkOcean: {
    name: 'Dark Ocean',
    colors: {
      primary: '#06b6d4',
      secondary: '#22d3ee',
      accent: '#67e8f9',
      background: '#082f49',
      surface: '#0e7490',
      text: '#ecfeff',
      textSecondary: '#a5f3fc',
      border: '#155e75',
      success: '#14b8a6',
      warning: '#fbbf24',
      error: '#fb7185'
    }
  },
  darkForest: {
    name: 'Dark Forest',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      background: '#022c22',
      surface: '#065f46',
      text: '#d1fae5',
      textSecondary: '#86efac',
      border: '#064e3b',
      success: '#22c55e',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  darkPurple: {
    name: 'Dark Purple',
    colors: {
      primary: '#c084fc',
      secondary: '#d8b4fe',
      accent: '#e9d5ff',
      background: '#1e1b4b',
      surface: '#312e81',
      text: '#f5f3ff',
      textSecondary: '#c4b5fd',
      border: '#4c1d95',
      success: '#4ade80',
      warning: '#facc15',
      error: '#fb7185'
    }
  },
  
  // Vibrant Themes
  neonCyan: {
    name: 'Neon Cyan',
    colors: {
      primary: '#00d9ff',
      secondary: '#00f0ff',
      accent: '#7dffff',
      background: '#001f26',
      surface: '#003440',
      text: '#e0ffff',
      textSecondary: '#7dffff',
      border: '#00a8cc',
      success: '#00ff88',
      warning: '#ffd700',
      error: '#ff1744'
    }
  },
  neonPink: {
    name: 'Neon Pink',
    colors: {
      primary: '#ff006e',
      secondary: '#ff4d8f',
      accent: '#ff80ab',
      background: '#1a0010',
      surface: '#330020',
      text: '#ffe0f0',
      textSecondary: '#ff80ab',
      border: '#cc0058',
      success: '#00ff88',
      warning: '#ffd700',
      error: '#ff1744'
    }
  },
  electricBlue: {
    name: 'Electric Blue',
    colors: {
      primary: '#0066ff',
      secondary: '#3399ff',
      accent: '#66b3ff',
      background: '#000d1a',
      surface: '#001a33',
      text: '#e6f2ff',
      textSecondary: '#99ccff',
      border: '#004d99',
      success: '#00ff88',
      warning: '#ffd700',
      error: '#ff1744'
    }
  },
  
  // Pastel Themes
  pastelPink: {
    name: 'Pastel Pink',
    colors: {
      primary: '#ff99cc',
      secondary: '#ffb3d9',
      accent: '#ffcce6',
      background: '#fff0f5',
      surface: '#ffffff',
      text: '#4d1a33',
      textSecondary: '#804d66',
      border: '#ffe6f2',
      success: '#99ff99',
      warning: '#ffcc99',
      error: '#ff9999'
    }
  },
  pastelBlue: {
    name: 'Pastel Blue',
    colors: {
      primary: '#99ccff',
      secondary: '#b3d9ff',
      accent: '#cce6ff',
      background: '#f0f5ff',
      surface: '#ffffff',
      text: '#1a334d',
      textSecondary: '#4d6680',
      border: '#e6f2ff',
      success: '#99ff99',
      warning: '#ffcc99',
      error: '#ff9999'
    }
  },
  pastelMint: {
    name: 'Pastel Mint',
    colors: {
      primary: '#99ffcc',
      secondary: '#b3ffe6',
      accent: '#ccfff2',
      background: '#f0fff5',
      surface: '#ffffff',
      text: '#1a4d33',
      textSecondary: '#4d8066',
      border: '#e6fff2',
      success: '#66ff99',
      warning: '#ffcc99',
      error: '#ff9999'
    }
  },
  
  // Material Themes
  materialIndigo: {
    name: 'Material Indigo',
    colors: {
      primary: '#3f51b5',
      secondary: '#5c6bc0',
      accent: '#7986cb',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#212121',
      textSecondary: '#757575',
      border: '#e0e0e0',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336'
    }
  },
  materialTeal: {
    name: 'Material Teal',
    colors: {
      primary: '#009688',
      secondary: '#26a69a',
      accent: '#4db6ac',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#212121',
      textSecondary: '#757575',
      border: '#e0e0e0',
      success: '#66bb6a',
      warning: '#ffa726',
      error: '#ef5350'
    }
  },
  materialDeepOrange: {
    name: 'Material Deep Orange',
    colors: {
      primary: '#ff5722',
      secondary: '#ff7043',
      accent: '#ff8a65',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#212121',
      textSecondary: '#757575',
      border: '#e0e0e0',
      success: '#66bb6a',
      warning: '#ffca28',
      error: '#ef5350'
    }
  },
  
  // Monochrome Themes
  grayscale: {
    name: 'Grayscale',
    colors: {
      primary: '#525252',
      secondary: '#737373',
      accent: '#a3a3a3',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#171717',
      textSecondary: '#525252',
      border: '#e5e5e5',
      success: '#404040',
      warning: '#737373',
      error: '#262626'
    }
  },
  blackWhite: {
    name: 'Black & White',
    colors: {
      primary: '#000000',
      secondary: '#1a1a1a',
      accent: '#333333',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
      success: '#000000',
      warning: '#4d4d4d',
      error: '#000000'
    }
  },
  
  // Nature Themes
  autumn: {
    name: 'Autumn Leaves',
    colors: {
      primary: '#d97706',
      secondary: '#ea580c',
      accent: '#f59e0b',
      background: '#fffbeb',
      surface: '#ffffff',
      text: '#78350f',
      textSecondary: '#92400e',
      border: '#fde68a',
      success: '#84cc16',
      warning: '#f59e0b',
      error: '#dc2626'
    }
  },
  spring: {
    name: 'Spring Bloom',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#f9a8d4',
      background: '#fdf2f8',
      surface: '#ffffff',
      text: '#831843',
      textSecondary: '#9f1239',
      border: '#fbcfe8',
      success: '#22c55e',
      warning: '#facc15',
      error: '#f43f5e'
    }
  },
  winter: {
    name: 'Winter Ice',
    colors: {
      primary: '#0ea5e9',
      secondary: '#38bdf8',
      accent: '#7dd3fc',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      textSecondary: '#075985',
      border: '#bae6fd',
      success: '#06b6d4',
      warning: '#fbbf24',
      error: '#f43f5e'
    }
  },
  
  // Retro Themes
  retro80s: {
    name: 'Retro 80s',
    colors: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      accent: '#ffff00',
      background: '#1a0033',
      surface: '#330066',
      text: '#ffffff',
      textSecondary: '#ff00ff',
      border: '#660099',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000'
    }
  },
  retro90s: {
    name: 'Retro 90s',
    colors: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      accent: '#fdc82f',
      background: '#004e89',
      surface: '#1a659e',
      text: '#ffffff',
      textSecondary: '#f7931e',
      border: '#1a659e',
      success: '#2ec4b6',
      warning: '#fdc82f',
      error: '#e63946'
    }
  },
  
  // Professional Themes
  corporate: {
    name: 'Corporate Blue',
    colors: {
      primary: '#1e40af',
      secondary: '#2563eb',
      accent: '#3b82f6',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#cbd5e1',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    }
  },
  elegant: {
    name: 'Elegant Gold',
    colors: {
      primary: '#ca8a04',
      secondary: '#eab308',
      accent: '#facc15',
      background: '#fefce8',
      surface: '#ffffff',
      text: '#713f12',
      textSecondary: '#854d0e',
      border: '#fef08a',
      success: '#16a34a',
      warning: '#ea580c',
      error: '#dc2626'
    }
  },
  minimalist: {
    name: 'Minimalist',
    colors: {
      primary: '#18181b',
      secondary: '#27272a',
      accent: '#3f3f46',
      background: '#fafafa',
      surface: '#ffffff',
      text: '#09090b',
      textSecondary: '#71717a',
      border: '#e4e4e7',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  
  // Candy Themes
  candyPop: {
    name: 'Candy Pop',
    colors: {
      primary: '#ff1493',
      secondary: '#ff69b4',
      accent: '#ffb6c1',
      background: '#fff0f5',
      surface: '#ffffff',
      text: '#8b008b',
      textSecondary: '#da70d6',
      border: '#ffe4e1',
      success: '#00ff7f',
      warning: '#ffd700',
      error: '#ff6347'
    }
  },
  blueberry: {
    name: 'Blueberry',
    colors: {
      primary: '#4169e1',
      secondary: '#6495ed',
      accent: '#87ceeb',
      background: '#f0f8ff',
      surface: '#ffffff',
      text: '#191970',
      textSecondary: '#4682b4',
      border: '#b0e0e6',
      success: '#32cd32',
      warning: '#ffa500',
      error: '#dc143c'
    }
  },
  
  // Tech Themes
  hacker: {
    name: 'Hacker Green',
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#00ff66',
      background: '#000000',
      surface: '#0a0a0a',
      text: '#00ff00',
      textSecondary: '#00cc00',
      border: '#003300',
      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      primary: '#ff00de',
      secondary: '#00f0ff',
      accent: '#ffff00',
      background: '#0a0014',
      surface: '#1a0028',
      text: '#ffffff',
      textSecondary: '#ff00de',
      border: '#330052',
      success: '#00ff88',
      warning: '#ffff00',
      error: '#ff0055'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
