// ─────────────────────────────────────────────────────────────
// LoginPage.js
// Page Object class for the SauceDemo Login page.
// Contains all locators and actions related to login functionality.
// Extends BasePage to reuse common browser interaction methods.
// ─────────────────────────────────────────────────────────────

const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    // Pass page instance to BasePage constructor
    super(page);

    // ── Locators ──────────────────────────────────────────────
    // Using data-test attributes where available — most stable locator strategy
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  // ── Actions ───────────────────────────────────────────────

  /**
   * Navigate to the login page (root URL)
   */
  async navigate() {
    await this.navigateTo('/');
  }

  /**
   * Perform login with given credentials
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Get the error message text displayed on failed login
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is visible on the page
   * @returns {Promise<boolean>}
   */
  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = { LoginPage };