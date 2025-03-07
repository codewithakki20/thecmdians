/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          300: "#C4B5FD",
          400: "#A78BFA",
        },
        purple: {
          800: "#4C1D95",
          900: "#581C87",
        },
      },
    },
  },
  plugins: [],
};