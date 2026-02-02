import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// DaisyUI theme list (35+ themes)
export const themes = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'cupcake', name: 'Cupcake' },
  { id: 'bumblebee', name: 'Bumblebee' },
  { id: 'emerald', name: 'Emerald' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'synthwave', name: 'Synthwave' },
  { id: 'retro', name: 'Retro' },
  { id: 'cyberpunk', name: 'Cyberpunk' },
  { id: 'valentine', name: 'Valentine' },
  { id: 'halloween', name: 'Halloween' },
  { id: 'garden', name: 'Garden' },
  { id: 'forest', name: 'Forest' },
  { id: 'aqua', name: 'Aqua' },
  { id: 'lofi', name: 'Lo-fi' },
  { id: 'pastel', name: 'Pastel' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'wireframe', name: 'Wireframe' },
  { id: 'black', name: 'Black' },
  { id: 'luxury', name: 'Luxury' },
  { id: 'dracula', name: 'Dracula' },
  { id: 'cmyk', name: 'CMYK' },
  { id: 'autumn', name: 'Autumn' },
  { id: 'business', name: 'Business' },
  { id: 'acid', name: 'Acid' },
  { id: 'lemonade', name: 'Lemonade' },
  { id: 'night', name: 'Night' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'winter', name: 'Winter' },
  { id: 'dim', name: 'Dim' },
  { id: 'nord', name: 'Nord' },
  { id: 'sunset', name: 'Sunset' },
  { id: 'caramellatte', name: 'Caramel Latte' },
  { id: 'abyss', name: 'Abyss' },
  { id: 'silk', name: 'Silk' },
];

const darkThemes = new Set([
  'dark',
  'night',
  'coffee',
  'dracula',
  'black',
  'luxury',
  'halloween',
  'business',
  'forest',
  'synthwave',
  'cyberpunk',
  'dim',
  'abyss',
]);

export const ThemeProvider = ({ children }) => {
  // Initialize with saved theme or default to 'light'
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme && themes.some((theme) => theme.id === savedTheme)) ? savedTheme : 'light';
  });

  useEffect(() => {
    if (!currentTheme) return;

    console.log('Applying theme:', currentTheme);
    const root = document.documentElement;

    // Apply daisyUI theme only to root (body and #root will inherit)
    root.setAttribute('data-theme', currentTheme);

    // Keep Tailwind dark: classes in sync for dark-ish themes
    if (darkThemes.has(currentTheme)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    console.log('Changing theme to:', themeName);
    if (themes.some((theme) => theme.id === themeName)) {
      setCurrentTheme(themeName);
      console.log('Theme changed successfully to:', themeName);
    }
  };

  const value = {
    currentTheme,
    themes,
    changeTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
