/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'saira': ['Saira', 'sans-serif'], // Define la fuente personalizada
      },
      colors: {
        pink: {
          500: '#f43f5e',
        },
        gray: {
          200: '#e5e7eb',
        },
      },
    },
  },
  plugins: [],
}

