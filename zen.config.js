const webpackConfig = require('./webpack.config.js')

process.env.NODE_ENV = 'test'
webpackConfig.mode = 'development'
//webpackConfig.entry = {bundle: ['./test/setup.tsx']}
webpackConfig.entry = {
  bundle: ['./zen_test_setup.js']
}
webpackConfig.output.publicPath = 'webpack/'
webpackConfig.devtool = 'eval'

module.exports = {
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    assetBucket: process.env.ZEN_ASSET_BUCKET
  },
  webpack: webpackConfig
}
