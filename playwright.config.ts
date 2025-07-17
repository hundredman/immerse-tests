import { defineConfig, devices } from "donobu";

export default defineConfig({
  testDir: "./tests",
  projects: [
    {
      name: "login",
      testMatch: "tests/auth/login.spec.ts",
      metadata: {
        SELF_HEAL_TESTS_ENABLED: false,
      },
    },
    {
      name: "logged-in-tests",
      testMatch: "tests/logged-in/**/*.spec.ts",
      dependencies: ["login"],
      use: { storageState: "login-state.json" },
    },
    {
      name: "logged-out-tests",
      testMatch: "tests/logged-out/**/*.spec.ts",
    },
  ],
  use: {
    screenshot: "on",
    video: "on",
  },
  reporter: [
    ["github"],
    ["json", { outputFile: "test-results/playwright-report.json" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  metadata: {
    selfHealingOptions: {
      areElementIdsVolatile: false,
      disableSelectorFailover: false,
    },
  },
});
