/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          700: '#a16207',
        },
        red: {
          500: '#ef4444',
          600: '#dc2626',
        },
        blue: {
          600: '#2563eb',
        },
        green: {
          600: '#16a34a',
        },
      },
    },
  },
  plugins: [],
}