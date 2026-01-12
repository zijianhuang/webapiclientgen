module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: ["<rootDir>/jest.setup.js"]
};