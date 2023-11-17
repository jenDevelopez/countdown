/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'max': '0px 0px 15px orange, inset 0px 0px 15px orange'
      },
      keyframes: {
        'slide': {
          '0%':{
            'margin-left': '-30%'
          },
          
          '100%': {
            'margin-left':'110%'
          }
          
        }
      },
      animation:{
        'slide': 'slide 15s ease-in-out infinite'
      }
    },
  },
  plugins: [],

}

