// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        // 26 columns fractional grid
        '26': 'repeat(26, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '9': 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
}
