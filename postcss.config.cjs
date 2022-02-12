module.exports = {
  plugins: {
    'postcss-import': {
      path: ['src/css']
    },
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 2,
      browsers: ['>0.3%', 'Firefox ESR', 'not dead', 'not ie 11', 'not op_mini all'],
      features: {
        'custom-properties': {
          strict: false,
          warnings: false,
          preserve: true
        },
        'custom-media-queries': true
      }
    },
    'postcss-browser-reporter': {},
    'postcss-reporter': {}
  }
}
