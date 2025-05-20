/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-primary': '#d35400',
        'wedding-secondary': '#fff5e6',
        'wedding-text': '#2c3e50',
        'border': '#e2e8f0',
      },
      fontFamily: {
        'sans': ['Raleway', 'sans-serif'],
        'cursive': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}