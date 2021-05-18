module.exports = {
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './utils/styles/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
