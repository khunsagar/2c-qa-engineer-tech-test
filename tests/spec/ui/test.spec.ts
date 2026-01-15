import test, { expect } from "@playwright/test";

test.describe('Landing page', () => {
    test.skip('verify should load and siplay correct book title', async ({ page }) => {
        await page.goto('http://localhost:3000');
})
})