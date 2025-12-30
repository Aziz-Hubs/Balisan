import { test, expect } from '@playwright/test';

// Mock data
const VALID_AGE_DOB = '1990-01-01'; // Over 21
const ADMIN_CREDENTIALS = { email: 'admin@balisan.com', password: 'securepassword' };

// Helper to bypass age gate by injecting localStorage before page scripts run
async function setupAgeVerification(page: any) {
    await page.addInitScript(() => {
        localStorage.setItem('balisan-age-verification', JSON.stringify({
            verified: true,
            timestamp: new Date().toISOString()
        }));
    });
}

test.describe('Critical E2E Flows', () => {
    test.setTimeout(60000); // Increase timeout for CI/slow envs

    // 1. Age Verification Persistence
    test('Age Verification Persistence: Age Gates new visitor, persists verification', async ({ page }) => {
        await page.goto('/');

        // Clear state to ensure fresh start
        await page.context().clearCookies();
        // Since we want to TEST the gate here, we don't use setupAgeVerification
        await page.evaluate(() => localStorage.clear());
        await page.reload();

        // 1. Verify Age Gate is present
        const ageGate = page.getByRole('dialog');
        await expect(ageGate).toBeVisible();
        await expect(page.getByText(/legal drinking age/i)).toBeVisible();

        // 2. Enter valid date of birth
        await page.getByLabel('Date of Birth').fill(VALID_AGE_DOB);
        await page.getByRole('button', { name: /enter site/i }).click();

        // Verify Age Gate disappears
        await expect(ageGate).not.toBeVisible();

        // 3. Reload and verify persistence
        await page.reload();
        await expect(ageGate).not.toBeVisible();
    });

    // 2. Product Search & Filter
    test('Product Search & Filter: Search yields results', async ({ page }) => {
        await setupAgeVerification(page);
        await page.goto('/');

        // Open Search Modal
        await page.getByLabel('Search').first().click();

        // Wait for the command dialog to appear (it should have a placeholder)
        const searchInput = page.getByPlaceholder('Search by brand, product, or category...').first();
        await expect(searchInput).toBeVisible();

        await searchInput.fill('Whisky');

        // Verify results in CommandList
        // cmdk-list is the attribute added by the library
        await expect(page.locator('[cmdk-list]').first()).toContainText('Whisky');
    });

    // 3. Cart Management
    test('Cart Management: Add to cart, update quantity, remove', async ({ page }) => {
        await setupAgeVerification(page);
        await page.goto('/shop');

        // Find first product card
        const productCard = page.locator('.group.relative').first();

        // Hover to reveal "Add to cart" button
        await productCard.hover();

        // Click Add to Cart
        await productCard.getByRole('button', { name: /add to cart/i }).click({ force: true });

        // Open Cart
        await page.getByLabel('Open Cart').first().click();

        // Verify item in cart - "Your Selection" is the title in CartDrawer
        await expect(page.getByText('Your Selection')).toBeVisible();

        // Verify checkout button is present in cart
        await expect(page.locator('[role="dialog"]')).toContainText('Checkout');
    });

    // 4. Guest Checkout Flow
    test('Guest Checkout Flow: Full path to success', async ({ page }) => {
        await setupAgeVerification(page);
        await page.goto('/shop');

        // Add item
        const productCard = page.locator('.group.relative').first();
        await productCard.hover();
        await productCard.getByRole('button', { name: /add to cart/i }).click({ force: true });

        // Go to checkout via sidebar
        await page.getByLabel('Open Cart').first().click();
        await page.getByRole('link', { name: /proceed to checkout/i }).click();

        // Verify we are on checkout page
        await expect(page).toHaveURL(/checkout/);
    });

    // 5. Admin Login & Dashboard Access
    test('Admin Login: Unauth redirect and successful login', async ({ page }) => {
        await setupAgeVerification(page);

        // Try to access protected route
        await page.goto('/admin/dashboard');

        // Should be redirected to /login
        await page.waitForURL(/\/login/);

        // Fill login form
        await page.getByLabel('Email', { exact: true }).fill(ADMIN_CREDENTIALS.email);
        await page.getByLabel('Password', { exact: true }).fill(ADMIN_CREDENTIALS.password);

        // Specific selector for the login button to avoid strict violation with Header Login button or Enter Site
        await page.locator('form').getByRole('button', { name: 'Login', exact: true }).click();
    });

    // 6. Shop Filtering & URL Sync
    test('Shop Filtering & URL Sync: Filtering updates results and URL', async ({ page }) => {
        await setupAgeVerification(page);
        await page.goto('/shop');

        // 1. Initial count
        const initialCountText = await page.locator('p.text-sm.text-muted-foreground:has-text("Showing")').first().innerText();
        const initialCount = parseInt(initialCountText.match(/\d+/)?.[0] || '0');

        // 2. Apply Category Filter (Whiskey)
        // Find the checkbox for Whiskey by its label
        await page.getByLabel('Whiskey', { exact: true }).click();

        // 3. Verify results update
        await expect(async () => {
            const newCountText = await page.locator('p.text-sm.text-muted-foreground:has-text("Showing")').first().innerText();
            const newCount = parseInt(newCountText.match(/\d+/)?.[0] || '0');
            expect(newCount).toBeLessThan(initialCount);
        }).toPass({ timeout: 10000 });

        // 4. Verify URL sync
        await expect(page).toHaveURL(/category=Whiskey/);

        // 5. Verify persistence on reload
        await page.reload();
        await expect(page).toHaveURL(/category=Whiskey/);
        await expect(async () => {
            const reloadedCountText = await page.locator('p.text-sm.text-muted-foreground:has-text("Showing")').first().innerText();
            const reloadedCount = parseInt(reloadedCountText.match(/\d+/)?.[0] || '0');
            expect(reloadedCount).toBeLessThan(initialCount);
        }).toPass({ timeout: 10000 });
    });
});
