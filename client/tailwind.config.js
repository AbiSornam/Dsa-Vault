/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
  theme: {
    extend: {
      colors: {
        'app-bg': '#FBF7F3',
        'section-purple': '#EDE7FF',
        'section-green': '#E6F3EF',
        'card-white': '#FFFFFF',
        'brand': '#5B4BDB',
        'accent-yellow': '#F4B860',
        'text-primary': '#2E2A3A',
        'text-secondary': '#6B6A75',
        'border-light': '#ECEAF1',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0,0,0,0.05)',
        'soft-md': '0 4px 20px rgba(0,0,0,0.08)',
        'soft-lg': '0 8px 30px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
    },
  },
};
