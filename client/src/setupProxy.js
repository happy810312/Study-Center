const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/auth/google", {
      target: "https://accounts.google.com",
      changeOrigin: true,
    })
  );
};
