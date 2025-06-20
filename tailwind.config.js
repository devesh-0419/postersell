/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1A4645",
        primary_light:"#276967",
        primary_text:"#f2f1d3"
      }
    },
  
  
  },
  plugins: [],
}