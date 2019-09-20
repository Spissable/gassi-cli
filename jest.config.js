module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["src/"],
  testMatch: ["**/*.test.+(ts|tsx|js)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["index.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: true
    }
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  setupFilesAfterEnv: ["./jest.setup.js"]
};
