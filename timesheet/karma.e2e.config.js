module.exports = function(config) {
    config.set({
        frameworks: ['ng-scenario'],

        files: [
            "client/test/e2e/**/*.spec.js"
        ],

        proxies: {
            '/' : 'http://localhost:3000'
        },

        urlRoot: "__karma__",

        browsers: ['Chrome', 'Firefox'],

        plugins: ['karma-chrome-launcher', 'karma-firefox-launcher', 'karma-ng-scenario']
    });
};
