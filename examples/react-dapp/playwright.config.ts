import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 2000,
  },
  reporter: "html",
  use: {
    headless: true,
    viewport: { width: 1440, height: 960 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
})
