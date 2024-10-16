/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor:"#FB6107",
        hoverColor:"#E85C0D"
      }
    },
  },
  plugins: [],
}

