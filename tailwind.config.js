/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#3d352a',
        'primary-light': '#f5f5f5',
        'accent': '#ffb800',
      }
    },
  },
  plugins: [],
}