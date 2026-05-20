/** @type {import('jest').Config} */
const config = {
  preset:           "ts-jest",
  testEnvironment:  "jsdom",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  transform:        { "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }] },
  testMatch:        ["<rootDir>/src/__tests__/**/*.test.{ts,tsx}"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
};

module.exports = config;