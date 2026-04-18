// ─────────────────────────────────────────────────────────────
// checkout.spec.js
// End-to-end test suite for the SauceDemo cart and checkout flow.
// Covers adding an item to cart, verifying cart state, filling
// shipping info, and confirming order completion.
// All test data is pulled from config.js and users.json.
// ─────────────────────────────────────────────────────────────

const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage }  = require('../pages/CheckoutPage');
const config            = require('../config/config');
const testData          = require('../test-data/users.json');

test.describe('E2E Checkout Flow', () => {

  // Runs before each test — login with valid user so we start from inventory
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      config.users.validUser.username,
      config.users.validUser.password
    );
  });

  // ── TC04: Add Item to Cart ────────────────────────────────
  test('TC04 - Adding first item to cart should update cart badge to 1', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Act — add first product to cart
    await inventoryPage.addFirstItemToCart();

    // Assert — cart badge should show count of 1
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe('1');
  });

  // ── TC05: Cart Page Title ─────────────────────────────────
  test('TC05 - Navigating to cart should show Your Cart page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage  = new CheckoutPage(page);

    // Act — add item and go to cart
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    // Assert — cart page title should match expected value from test data
    const cartTitle = await checkoutPage.getCartTitle();
    expect(cartTitle).toBe(testData.expectedMessages.cartPageTitle);
  });

  // ── TC06: Full E2E Checkout ───────────────────────────────
  test('TC06 - Full checkout flow should show order confirmation', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage  = new CheckoutPage(page);

    // Act — add item to cart
    await inventoryPage.addFirstItemToCart();

    // Act — navigate to cart
    await inventoryPage.goToCart();

    // Act — proceed to checkout
    await checkoutPage.proceedToCheckout();

    // Act — fill shipping info from test data (no hardcoding)
    await checkoutPage.fillShippingInfo(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );

    // Act — finish the order
    await checkoutPage.finishOrder();

    // Assert — confirmation header should match expected value
    const confirmationHeader = await checkoutPage.getConfirmationHeader();
    expect(confirmationHeader).toBe(testData.expectedMessages.orderConfirmation);
  });

});