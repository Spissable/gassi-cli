module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src/"],
  testMatch: ["**/*.test.+(ts|tsx|js)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["index.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  setupFilesAfterEnv: ["./jest.setup.js"]
};
