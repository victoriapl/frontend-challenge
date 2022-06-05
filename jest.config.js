module.exports = {
  transformIgnorePatterns: [],
  moduleDirectories: ["node_modules", "js", "spec"],
  testRegex: "(src/).*\\.spec\\.js$",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["src/**/*"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jest-environment-jsdom-global",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/src/__tests__/__mocks__/fileMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
