const path = require('path')
const LessPlugin = require('craco-less')
const theme = require('./theme')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve('src')
    }
  },
  style: {
    sass: {
      loaderOptions: {
        prependData: `@import "~@/assets/css/common.scss";`
      }
    }
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ]
  },
  plugins: [
    {
      plugin: LessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
