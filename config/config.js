// ─────────────────────────────────────────────────────────────
// config.js
// Central configuration module for the entire framework.
// Reads all values from the .env file using dotenv.
// All other files import from here — nothing reads .env directly.
// ─────────────────────────────────────────────────────────────

require('dotenv').config();

const config = {
  // Application base URL — loaded from .env
  baseURL: process.env.BASE_URL,

  // Test user credentials — loaded from .env
  users: {
    validUser: {
      username: process.env.VALID_USERNAME,
      password: process.env.VALID_PASSWORD,
    },
    lockedUser: {
      username: process.env.LOCKED_USERNAME,
      password: process.env.LOCKED_PASSWORD,
    },
  },

  // Playwright timeout settings (in milliseconds)
  timeouts: {
    default: 30000,   // Global test timeout
    action: 10000,    // Timeout for individual actions (click, fill, etc.)
    navigation: 15000 // Timeout for page navigations
  },
};

module.exports = config;