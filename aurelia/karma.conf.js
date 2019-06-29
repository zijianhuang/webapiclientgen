module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "src/**/*.ts" // *.tsx for React Jsx
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript" // *.tsx for React Jsx
        },
        reporters: ["kjhtml", "karma-typescript"],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
        browsers: ["Chrome"]
    });
};