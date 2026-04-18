// ─────────────────────────────────────────────────────────────
// playwright.config.js
// Central Playwright configuration file.
// All browser, reporter, and execution settings are defined here.
// Values are pulled from config.js — nothing is hardcoded here.
// ─────────────────────────────────────────────────────────────

const { defineConfig, devices } = require('@playwright/test');
const config = require('./config/config');

module.exports = defineConfig({

  // Directory where all test files are located
  testDir: './tests',

  // Run tests in parallel across files
  fullyParallel: true,

  // Retry failed tests once — useful in CI environments
  retries: 1,

  // Number of parallel workers (2 is safe for most machines)
  workers: 2,

  // Global timeout for each test
  timeout: config.timeouts.default,

  // Reporters — HTML for local viewing, list for terminal output
 reporter: [
  ['list'],
  ['allure-playwright', { outputFolder: 'allure-results' }]
],

  // Shared settings applied to all tests
  use: {
    // Base URL from config — all page.goto('/') calls resolve against this
    baseURL: config.baseURL,

    // Run headless in CI, headed locally (change to true for Jenkins)
    headless: true,

    // Capture screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Record video only when a test fails — helps debugging
    video: 'retain-on-failure',

    // Timeout for individual actions like click, fill, etc.
    actionTimeout: config.timeouts.action,

    // Timeout for page navigations
    navigationTimeout: config.timeouts.navigation,
  },

  // Browser projects — we use Chromium only (clean for portfolio)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Output folder for test artifacts (screenshots, videos)
  outputDir: 'test-results/',
});