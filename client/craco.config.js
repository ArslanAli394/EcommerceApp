// craco.config.js
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ],
      },
    },
  }