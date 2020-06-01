module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "node_modules/reflect-metadata/Reflect.js", include: true },
            "src/**/*.ts" // *.tsx for React Jsx
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript" // *.tsx for React Jsx
        },
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json'
        },
        reporters: ["kjhtml", "karma-typescript"],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        browsers: ["Chrome"]
    });

    process.on('infrastructure_error', (error) => {
        console.error('infrastructure_error', error);
    });
};