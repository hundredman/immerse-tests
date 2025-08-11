import { defineConfig, devices } from "donobu";

export default defineConfig({
  testDir: "./tests",
  projects: [
    {
      name: "dashboard-login",
      testMatch: "tests/auth/dashboard-login.spec.ts",
      metadata: {
        SELF_HEAL_TESTS_ENABLED: false,
      },
    },
    {
      name: "b2b-login",
      testMatch: "tests/auth/b2b-login.spec.ts",
      metadata: {
        SELF_HEAL_TESTS_ENABLED: false,
      },
      use: {
        // Grant permissions for this origin
        permissions: [
          "microphone", // mic input
        ],
        launchOptions: {
          args: [
            "--use-fake-ui-for-media-stream", // auto-allow prompt
            "--use-fake-device-for-media-stream" // synthetic mic
          ],
          headless: false // real mic won't work in headless
        },
      },
    },
    {
      name: "logged-in-tests",
      testMatch: "tests/logged-in/**/*.spec.ts",
      dependencies: ["dashboard-login"],
      use: { storageState: "login-state.json" },
    },
    {
      name: "logged-out-tests",
      testMatch: "tests/logged-out/**/*.spec.ts",
    },
  ],
  timeout: 90000, // 90 seconds timeout for each test to give enough time for LLM API calls for smart assertions
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
