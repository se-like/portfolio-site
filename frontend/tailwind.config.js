/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#FF6B6B',
          600: '#FF4848',
        },
        blue: {
          500: '#4ECDC4',
          600: '#2EC3B8',
        },
        green: {
          500: '#4CAF50',
          600: '#388E3C',
        },
        purple: {
          500: '#9C27B0',
          600: '#7B1FA2',
        },
        pink: {
          500: '#E91E63',
          600: '#C2185B',
        },
        gray: {
          500: '#9E9E9E',
          600: '#757575',
        },
      },
    },
  },
  plugins: [],
} 