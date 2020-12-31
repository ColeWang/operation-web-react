function resolve (dir) {
  return require('path').join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/common.scss";`
      }
    }
  }
}
