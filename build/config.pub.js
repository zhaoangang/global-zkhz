const utils = require('./utils')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.resolve('src'),
      'src': utils.resolve('src'),
      'packages': utils.resolve('packages'),
      'components': utils.resolve('packages/components'),
      'global-ui': utils.resolve('packages/index.js'),
    }
  },
}