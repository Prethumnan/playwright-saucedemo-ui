// ─────────────────────────────────────────────────────────────
// BasePage.js
// Base class for all Page Object classes.
// Contains common reusable Playwright actions so individual
// page classes stay clean and don't repeat the same logic.
// All page classes extend this class.
// ─────────────────────────────────────────────────────────────

class BasePage {
  constructor(page) {
    // Playwright page instance — shared across all page classes
    this.page = page;
  }

  /**
   * Navigate to a path relative to the baseURL set in playwright.config.js
   * @param {string} path - e.g. '/' or '/inventory.html'
   */
  async navigateTo(path = '/') {
    await this.page.goto(path);
  }

  /**
   * Wait for an element to be visible before interacting with it
   * @param {import('@playwright/test').Locator} locator
   */
  async waitForElement(locator) {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Get the trimmed text content of an element
   * @param {import('@playwright/test').Locator} locator
   * @returns {Promise<string>}
   */
  async getText(locator) {
    await this.waitForElement(locator);
    return (await locator.textContent()).trim();
  }

  /**
   * Click an element after waiting for it to be visible
   * @param {import('@playwright/test').Locator} locator
   */
  async click(locator) {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Fill an input field after clearing it first
   * @param {import('@playwright/test').Locator} locator
   * @param {string} value
   */
  async fill(locator, value) {
    await this.waitForElement(locator);
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Get the current page URL
   * @returns {Promise<string>}
   */
  async getCurrentURL() {
    return this.page.url();
  }

  /**
   * Get the current page title
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return this.page.title();
  }
}

module.exports = { BasePage };