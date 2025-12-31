import { test, expect } from '@playwright/test';

async function setupAgeVerification(page: any) {
    await page.addInitScript(() => {
        localStorage.setItem('balisan-age-verification', JSON.stringify({
            verified: true,
            timestamp: new Date().toISOString()
        }));
    });
}

test.describe('Product Details Page', () => {

    test.beforeEach(async ({ page }) => {
        await setupAgeVerification(page);
    });

    test('PDP: Visual elements render correctly', async ({ page }) => {
        // Go to Shop first to find a link to a product
        await page.goto('/shop');
        await page.waitForSelector('[data-testid="product-card"], .group.relative');

        // Click the first product
        const firstProduct = page.locator('[data-testid="product-card"], .group.relative').first();
        // Links inside the card? 
        // We might need to click the specific link element or the card itself. Easiest is to traverse via the link.
        const productLink = firstProduct.getByRole('link').first();

        // If the card IS the link, this works. If the card contains a link, we need that.
        // Assuming standard behavior:
        const href = await productLink.getAttribute('href');
        if (href) {
            await page.goto(href);
        } else {
            // Fallback: click relevant area
            await firstProduct.click();
        }

        // Now on PDP
        // 1. Check Product Title
        await expect(page.locator('h1')).toBeVisible();

        // 2. Check Price
        await expect(page.getByText('$')).toBeVisible();

        // 3. Check Add to Cart button
        const addToCart = page.getByLabel('Add to cart');
        await expect(addToCart).toBeVisible();

        // 4. Check Image Gallery
        // Look for main image
        const mainImage = page.locator('img[alt]').first(); // Very generic, but should exist
        await expect(mainImage).toBeVisible();
    });

    test('PDP: Add to cart functionality', async ({ page }) => {
        await page.goto('/shop');
        const firstProduct = page.locator('[data-testid="product-card"], .group.relative a').first();
        const href = await firstProduct.getAttribute('href');
        if (href) await page.goto(href);

        const addToCart = page.getByRole('button', { name: /add to cart/i });
        await addToCart.click();

        // Verify cart drawer opens or toast appears
        // Check for "Your Selection" or similar
        await expect(page.getByText('Your Selection').or(page.getByText('Added to cart'))).toBeVisible();
    });

    test('PDP: Related products section exists', async ({ page }) => {
        await page.goto('/shop');
        const firstProduct = page.locator('[data-testid="product-card"], .group.relative a').first();
        const href = await firstProduct.getAttribute('href');
        if (href) await page.goto(href);

        await expect(page.getByText(/related products|you might also like/i)).toBeVisible();
    });
});
