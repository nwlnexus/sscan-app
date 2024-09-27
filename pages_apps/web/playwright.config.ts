import { defineConfig, devices } from 'playwright/test'

export default defineConfig({
  testDir: './e2e',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    locale: 'en-US',
    permissions: ['geolocation'],
    timezoneId: 'America/New_York',
    channel: 'chrome',
  },
  projects: [{ name: 'chrome', ...devices['Desktop Chrome'] }],
})
