/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': '850px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [],
}