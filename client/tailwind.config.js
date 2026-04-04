/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#2D4EAA',
          dark: '#152D6E',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          light: '#FBB740',
          dark: '#D97706',
        },
        tertiary: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
        neutral: {
          DEFAULT: '#F9FAFB',
          dark: '#F3F4F6',
        }
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}