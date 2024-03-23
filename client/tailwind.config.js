/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        chakraPetch: ["Chakra Petch", "sans-serif"],
      },
      screens: {
        'sm': '940px',
        // => @media (min-width: 640px) { ... }

        'md': '1200px',
        // => @media (min-width: 1024px) { ... }

        'lg': '1440px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}

