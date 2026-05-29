const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://thehouseofrare.com';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
  });

  test('should have valid page title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav, [role="navigation"], header').first();
    await expect(nav).toBeVisible();
  });
});

test.describe('Product Catalog', () => {
  test('should display product collections', async ({ page }) => {
    await page.goto('/collections/all');
    const products = page.locator('[class*="product"]');
    await expect(products.first()).toBeVisible({ timeout: 10000 });
  });

  test('should show pricing on products', async ({ page }) => {
    await page.goto('/collections/all');
    await page.waitForTimeout(2000);
    const prices = page.locator('[class*="price"]');
    const count = await prices.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Navigation', () => {
  test('should navigate to collections page', async ({ page }) => {
    await page.goto('/');
    await page.goto('/collections/all');
    await expect(page).toHaveURL(/collections/);
  });

  test('should handle 404 page gracefully', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-xyz');
    expect(response.status()).toBe(404);
  });
});

test.describe('Performance & Quality', () => {
  test('page should load within timeout', async ({ page }) => {
    test.setTimeout(5000);
    await page.goto('/collections/all');
    await page.waitForSelector('[class*="product"]', { timeout: 3000 });
    await page.waitForTimeout(4000);
  });

  test('images should have alt attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    const images = page.locator('img');
    const totalImages = await images.count();
    const missingAlt = page.locator('img:not([alt]), img[alt=""]');
    const missingCount = await missingAlt.count();
    const coverage = ((totalImages - missingCount) / totalImages) * 100;
    expect.soft(coverage).toBeGreaterThan(90);
  });

  test.skip('should meet contrast ratio requirements', async ({ page }) => {
    await page.goto('/');
  });
});
