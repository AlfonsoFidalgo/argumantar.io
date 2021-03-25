const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
      "/questions",
      createProxyMiddleware({
        target: "http://localhost:3001",
      })
    );
  };