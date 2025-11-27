import { defineConfig, devices } from "donobu";

export default defineConfig({
  testDir: "./tests",
  workers: 4,
  retries: 1,
  projects: [
    {
      name: "dashboard-login-rw",
      testMatch: "tests/auth/dashboard-login-rw.spec.ts",
      metadata: {
        SELF_HEAL_TESTS_ENABLED: false,
      },
    },
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
      name: "d2c-login",
      testMatch: "tests/auth/d2c-login.spec.ts",
      metadata: {
        SELF_HEAL_TESTS_ENABLED: false,
      },
    },
    {
      name: "b2b-smoke-test-login",
      testMatch: "tests/smoke-tests/b2b-login-smoke-test.spec.ts",
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
      testMatch: "tests/logged-in/dashboard/learner-onboarding-workflow.spec.ts",
      dependencies: ["dashboard-login-rw"],
      use: { storageState: "login-state.json" },
    },
    {
      name: "logged-in-tests",
      testMatch: "tests/logged-in/**/*.spec.ts",
      testIgnore: [
        "tests/logged-in/dashboard/learner-onboarding-workflow.spec.ts",
        "tests/logged-in/dashboard/d2c-schedule-workflow.spec.ts",
        "tests/logged-in/dashboard/d2c-nvidia-launch-workflow.spec.ts"
      ],
      dependencies: ["dashboard-login"],
      use: { storageState: "login-state.json" },
    },
    {
      name: "d2c-logged-in-tests",
      testMatch: "tests/logged-in/dashboard/d2c-*.spec.ts",
      dependencies: ["d2c-login"],
      use: { storageState: "d2c-login-state.json" },
    },
    {
      name: "logged-in-smoke-tests",
      testMatch: "tests/smoke-tests/logged-in/**/*.spec.ts",
      metadata: {
        SELF_HEAL_TESTS_ENABLED: false,
      },
      dependencies: ["b2b-smoke-test-login"],
      use: { storageState: "b2b-login-state.json" },
    },
    {
      name: "logged-out-tests",
      testMatch: "tests/logged-out/**/*.spec.ts",
    },
  ],
  timeout: 360000, // 360 seconds timeout for each test to give enough time for LLM API calls for smart assertions
  // Global test configuration
  use: {
    screenshot: "on",
    video: "on",
    // Add action timeout for individual actions like clicks
    actionTimeout: 30000, // 30 seconds for individual actions
    // Add navigation timeout
    navigationTimeout: 60000, // 60 seconds for page navigation
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
