// ─────────────────────────────────────────────────────────────
// CheckoutPage.js
// Page Object class for the SauceDemo Cart and Checkout pages.
// Handles cart verification, shipping info form, and order
// confirmation steps.
// Extends BasePage to reuse common browser interaction methods.
// ─────────────────────────────────────────────────────────────

const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // ── Cart Page Locators ────────────────────────────────────
    this.cartTitle      = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');

    // ── Checkout Step One Locators (Shipping Info) ────────────
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.postalInput    = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    // ── Checkout Step Two Locators (Order Summary) ────────────
    this.finishButton   = page.locator('[data-test="finish"]');

    // ── Checkout Complete Locators ────────────────────────────
    this.confirmationHeader  = page.locator('[data-test="complete-header"]');
    this.confirmationMessage = page.locator('[data-test="complete-text"]');
  }

  // ── Cart Page Actions ─────────────────────────────────────

  /**
   * Get the cart page title text
   * @returns {Promise<string>}
   */
  async getCartTitle() {
    return await this.getText(this.cartTitle);
  }

  /**
   * Click the Checkout button on the cart page
   */
  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  // ── Checkout Step One Actions ─────────────────────────────

  /**
   * Fill in the shipping information form
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalInput, postalCode);
    await this.click(this.continueButton);
  }

  // ── Checkout Step Two Actions ─────────────────────────────

  /**
   * Click the Finish button to place the order
   */
  async finishOrder() {
    await this.click(this.finishButton);
  }

  // ── Checkout Complete Actions ─────────────────────────────

  /**
   * Get the order confirmation header text
   * e.g. "Thank you for your order!"
   * @returns {Promise<string>}
   */
  async getConfirmationHeader() {
    return await this.getText(this.confirmationHeader);
  }

  /**
   * Get the order confirmation sub-message text
   * @returns {Promise<string>}
   */
  async getConfirmationMessage() {
    return await this.getText(this.confirmationMessage);
  }
}

module.exports = { CheckoutPage };