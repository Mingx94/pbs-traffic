module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://od.moi.gov.tw/MOI/v1/pbs',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
