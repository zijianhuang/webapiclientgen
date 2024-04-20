module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {//the content you'd placed at "global"
      babel: true,
      tsconfig: 'tsconfig.json',
    }]
  },
}