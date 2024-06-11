/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#FE4F00"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
