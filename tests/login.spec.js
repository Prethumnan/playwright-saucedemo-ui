// ─────────────────────────────────────────────────────────────
// login.spec.js
// Test suite for SauceDemo Login page functionality.
// Covers valid login, locked out user, and error message validation.
// Credentials are pulled from .env via config.js — nothing hardcoded.
// Test data (expected messages) are pulled from users.json.
// ─────────────────────────────────────────────────────────────

const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const config            = require('../config/config');
const testData          = require('../test-data/users.json');

test.describe('Login Page - Validation Tests', () => {

  // Runs before each test — navigate to login page fresh
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // ── TC01: Valid Login ─────────────────────────────────────
  test('TC01 - Valid user should land on Products page after login', async ({ page }) => {
    const loginPage     = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Act — login with valid credentials from config
    await loginPage.login(
      config.users.validUser.username,
      config.users.validUser.password
    );

    // Assert — verify user lands on the Products page
    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe(testData.expectedMessages.productsPageTitle);
  });

  // ── TC02: Locked Out User ─────────────────────────────────
  test('TC02 - Locked out user should see error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Act — attempt login with locked out credentials from config
    await loginPage.login(
      config.users.lockedUser.username,
      config.users.lockedUser.password
    );

    // Assert — error message should be visible
    const isVisible = await loginPage.isErrorVisible();
    expect(isVisible).toBe(true);

    // Assert — error message text should match expected value from test data
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toBe(testData.expectedMessages.lockedOutError);
  });

  // ── TC03: Empty Credentials ───────────────────────────────
  test('TC03 - Empty credentials should show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Act — click login without entering any credentials
    await loginPage.login('', '');

    // Assert — error should be visible
    const isVisible = await loginPage.isErrorVisible();
    expect(isVisible).toBe(true);
  });

});