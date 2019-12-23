module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/appapi': {
        target: 'http://www.meihigo.hk/',
        changeOrigin: true
      }
    }
  }
}
