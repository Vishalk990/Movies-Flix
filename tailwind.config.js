/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}