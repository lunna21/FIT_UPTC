const config = {
  darkMode: ['class'],
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   montserrat: ['var(--font-montserrat)'],
      //   poppins: ['var(--font-poppins)'],
      // },
      colors: {
        primary: {
          DEFAULT: '#FFCC00',
          light: '#FDE381',
          medium: '#FFCC29',
          dark: '#917100',
        },
        neutral: {
          white: '#F1F1F1',
          black: '#000101',
          gray: {
            light: '#D9D9D9',
            medium: 'rgba(49, 49, 49, 0.72)',
            dark: '#373634',
          },
        },
        accent: {
          red: '#FF1302',
          darkRed: '#800000',
          redLight: '#FF1717',
        },
      },
    },
  },
  plugins: [],
};

export default config;