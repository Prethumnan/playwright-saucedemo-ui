// ─────────────────────────────────────────────────────────────
// InventoryPage.js
// Page Object class for the SauceDemo Inventory (Products) page.
// Handles product listing, add to cart, and cart navigation actions.
// Extends BasePage to reuse common browser interaction methods.
// ─────────────────────────────────────────────────────────────

const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    // ── Locators ──────────────────────────────────────────────
    this.pageTitle      = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge      = page.locator('[data-test="shopping-cart-badge"]');
    this.cartIcon       = page.locator('[data-test="shopping-cart-link"]');

    // Targets the Add to Cart button of the first inventory item only
    this.firstItemAddToCartBtn = page
      .locator('[data-test="inventory-item"]')
      .first()
      .locator('button');
  }

  // ── Actions ───────────────────────────────────────────────

  /**
   * Get the page heading text — used to verify successful login
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  /**
   * Get total number of products listed on the inventory page
   * @returns {Promise<number>}
   */
  async getInventoryItemCount() {
    return await this.inventoryItems.count();
  }

  /**
   * Add the first product in the inventory list to the cart
   */
  async addFirstItemToCart() {
    await this.click(this.firstItemAddToCartBtn);
  }

  /**
   * Get the cart badge count shown on the cart icon
   * @returns {Promise<string>}
   */
  async getCartBadgeCount() {
    return await this.getText(this.cartBadge);
  }

  /**
   * Click the cart icon to navigate to the cart page
   */
  async goToCart() {
    await this.click(this.cartIcon);
  }
}

module.exports = { InventoryPage };