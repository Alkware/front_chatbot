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
        light: "#fff"
      },
      textColor:{
        dark: "#7672F2",
        light: "#fff"
      },
      animation:{
        "smooth_display_left": "smooth-display-left 500ms ease-in-out",
        "loading": "loading 500ms linear infinite",
        "jump-screen": "jump-screen 1s ease-out ",
        "display-screen": "display-screen 250ms ease-out "
      },
    },
  },
  plugins: [],
}

