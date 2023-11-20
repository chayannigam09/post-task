/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      fontSize: {
        '10': ['10px', {
          lineHeight: '15px',
        }],
        '12': ['12px', {
          lineHeight: '18px',
        }],
        '14': ['14px', {
          lineHeight: '21px',
        }],
        '16': ['16px', {
          lineHeight: '24px',
        }],
        '18': ['18px', {
          lineHeight: '27px',
        }],
        '20': ['20px', {
          lineHeight: '27px',
        }],
        '24': ['24px', {
          lineHeight: '27px',
        }],
      },
      colors: {
        'sky-blue': '#CFE2F3',
        'light-green': '#B6D7A8',
        'navy-blue': '#0F2128'
      }
    },
  },
  plugins: [],
}

