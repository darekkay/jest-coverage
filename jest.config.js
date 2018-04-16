const jestConfig = {
  automock: false,
  collectCoverageFrom: [
    "app/**/*.js"
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
  
    "app/**/*.js": {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  },

  moduleDirectories: ["node_modules", "app"],
  testRegex: ".*\\.test\\.js$"
};

module.exports = jestConfig;
