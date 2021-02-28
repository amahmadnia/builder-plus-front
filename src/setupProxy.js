const {createProxyMiddleware} = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
    target: 'http://bp.buildtech:8000',
    changeOrigin: true,
});

module.exports = function (app) {
    app.use(
        '/api',
        function (req, res, next) {
            setTimeout(function () {
                proxy(req, res, next);
            }, 1000)
        }
    );
    app.use(
        '/statics',
        function (req, res, next) {
            proxy(req, res, next);
        }
    );
};