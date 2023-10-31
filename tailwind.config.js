/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#121114",
        blue_main: "#66adc5",
        blue_main2: "#0197ec",
        blue_dark: "#364045",
        yellow_oposite: "#EFAC30",
        green_main: "#008069",
        green_light: "#00a884"
      }
    },
  },
  plugins: [],
}

