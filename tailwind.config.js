/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9ff',
          300: '#a4c4ff',
          400: '#7ba8ff',
          500: '#5a85f0',
          600: '#3d5dd3',
          700: '#2f46b8',
          800: '#2a3a9e',
          900: '#273486',
          950: '#0f1535',
        },
        wall: {
          50: '#fdf8f3',
          100: '#f8eddb',
          200: '#f1d9b8',
          300: '#e8bd89',
          400: '#dea25b',
          500: '#d58838',
          600: '#c6702c',
          700: '#a35725',
          800: '#834726',
          900: '#6a3b22',
          950: '#3b1e11',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Noto Serif SC', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
