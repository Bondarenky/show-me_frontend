/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        actor: ["Actor", "sans-serif"],
        arimo: ["Arimo", "sans-serif"]
      },
      colors: {
        "light-gray": "#D9D9D9",
        "dark-blue": "#1424AFA8",
        "dark-gray": "#ADADB3",
        "blue-gray": "#595B69"
      }
    },
  },
  plugins: [],
}