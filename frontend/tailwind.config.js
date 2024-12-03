/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Include paths to your source files
  ],
  theme: {
    extend: {
      fontFamily:{
        'lucida':['"Trebuchet MS"', '"Lucida Sans Unicode"', '"Lucida Grande"', '"Lucida Sans"', '"Arial"', '"sans-serif"']
      }
    },
  },
  plugins: [], // Add Tailwind plugins here if needed (e.g., forms, typography)
};
