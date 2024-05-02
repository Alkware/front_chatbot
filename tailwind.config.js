import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#7672F2",
          200: "#363473",
          300: "#222140",
        },
        dark: "#0C0C0D",
        gray: "#191919",
        gray_light: "#353535",
        light: "#fff"
      },
      textColor:{
        dark: "#111111",
        light: "#fff"
      },
      screens:{
        "2xs": "380px",
        "xs": "480px",
        'tall-8': { 'raw': '(min-height: 800px)' },
        'tall-7': { 'raw': '(min-height: 700px)' },
        'tall-6': { 'raw': '(min-height: 600px)' },
        'tall-5': { 'raw': '(min-height: 500px)' },
      },
      animation:{
        "smooth_display_left": "smooth-display-left 500ms ease-in-out",
        "loading": "loading 500ms linear infinite",
        "jump-screen": "jump-screen 1s ease-out ",
        "display-screen": "display-screen 250ms ease-out ",
        "rising-10": "rising-and-disappears 10s linear 3s infinite",
        "rising-14": "rising-and-disappears 14s linear 1s infinite",
        "rising-18": "rising-and-disappears 18s linear infinite",
        "rising-reverse-10": "rising-and-disappears-reverse 10s linear infinite",
        "rising-reverse-14": "rising-and-disappears-reverse 14s linear 1s infinite",
        "rising-reverse-18": "rising-and-disappears-reverse 18s linear 3s infinite",
        "down-and-display": "down-and-display 350ms linear "
      },
    },
  },
  plugins: [],
}

