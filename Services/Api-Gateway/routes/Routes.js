const { createProxyMiddleware } = require('http-proxy-middleware');

const PostProxy = createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true
  });

  const commentProxy = createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true
  });
  
  
  const userProxy = createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    // pathRewrite: {
    //   '^/users': '/', // Remove the '/tasks' prefix
    // },
  });
  
//   const paymentProxy = createProxyMiddleware({
//     target: 'http://localhost:3003',
//     changeOrigin: true
//   });

module.exports={
   PostProxy,
    userProxy,
    commentProxy
}