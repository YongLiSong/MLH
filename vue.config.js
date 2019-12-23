module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/appapi': {
        target: 'http://www.mei.com',
        // ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
