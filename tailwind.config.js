/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#3C8DBC',
        "primary-hover":'#367fa9',
        colorText:'var(--colorText)',
        bgBody:'var(--bgBody)',
        bgBox:'var(--bgBox)',
        colorBorder:'var(--colorBorder)',
      }
    },
  },
  plugins: [],
}

