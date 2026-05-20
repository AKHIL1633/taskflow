import type { Config } from "jest";

const config: Config = {
  preset:              "ts-jest",
  testEnvironment:     "jsdom",
  setupFilesAfterFramework: ["@testing-library/jest-dom"],
  moduleNameMapper:    { "^@/(.*)$": "<rootDir>/src/$1" },
  transform:           { "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }] },
  testPathPattern:     "src/__tests__",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
};

export default config;
