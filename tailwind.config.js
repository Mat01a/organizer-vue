/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1/16': '16.66667vh'
      },
      colors: {
        'custom-slate': {
          450: '#677C99',
          350: '#b6bcc5',
          550: '#7D91AD',
        }
      },

    },
  },
  plugins: [],
}

