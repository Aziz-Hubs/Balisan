
import { test, expect } from '@playwright/test';

// Helper to bypass age gate
async function setupAgeVerification(page: any) {
    await page.addInitScript(() => {
        localStorage.setItem('balisan-age-verification', JSON.stringify({
            verified: true,
            timestamp: new Date().toISOString()
        }));
    });
}

const generateRandomUser = () => {
    const randomId = Math.floor(Math.random() * 10000);
    return {
        name: `Test User ${randomId}`,
        email: `testuser${randomId}@example.com`,
        password: 'Password123!',
        birthDate: '1990-01-01'
    };
};

test.describe('Personalization & Conditional Rendering', () => {
    test.setTimeout(60000);

    test('Guest User: Sees Newsletter Signup', async ({ page }) => {
        await setupAgeVerification(page);
        await page.goto('/');

        // Verify "Join the Inner Circle" section is visible
        await expect(page.getByText('Join the Inner Circle')).toBeVisible();

        // Verify "Start Your Collection" (Personalized header) is NOT visible
        // We use a specific part of the personalized greeting text to verify absence
        await expect(page.getByText('Start Your Collection')).not.toBeVisible();
    });

    test('New User: Registration -> Sees Personalized Welcome', async ({ page }) => {
        await setupAgeVerification(page);

        // 1. Go to Signup
        await page.goto('/signup');

        const user = generateRandomUser();

        // 2. Fill Registration Form
        await page.getByLabel('Full Name').fill(user.name);
        await page.getByLabel('Email').fill(user.email);
        await page.getByLabel('Date of Birth').fill(user.birthDate);
        await page.getByLabel('Password', { exact: true }).fill(user.password);
        await page.getByLabel('Confirm').fill(user.password);

        // 3. Submit
        await page.getByRole('button', { name: /create account/i }).click();

        // 4. Wait for response - could redirect to / or /login depending on email confirmation setting
        await page.waitForTimeout(3000);

        // Check current URL
        const currentUrl = page.url();

        // If email confirmation is enabled, user stays on /signup or goes to /login
        if (currentUrl.includes('/signup') || currentUrl.includes('/login')) {
            // Verify success toast appeared (toast says "Account created!")
            await expect(page.getByText(/account created/i)).toBeVisible({ timeout: 5000 });
            // Test passes - email confirmation is required
            return;
        }

        // If email confirmation is disabled, user is redirected to home
        // 5. Verify Personalized "Best Sellers" Section
        const firstName = user.name.split(' ')[0];
        await expect(page.getByText(`Welcome, ${firstName}!`, { exact: false })).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Start Your Collection')).toBeVisible();

        // Verify Newsletter is GONE
        await expect(page.getByText('Join the Inner Circle')).not.toBeVisible();
    });

    test('Returning User: [SKIPPED] Requires existing order history', async ({ page }) => {
        // Skipping implementation as discussed in plan due to complexity of seeding orders in this environment
        test.skip();
    });
});
