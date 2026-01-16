import { test } from "@playwright/test";
import { runAccessibilityScan } from '../../utility/accessibility.utils';

test.describe('Accessibility tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/',{ waitUntil: 'networkidle' });
    });

    test('should have no accessibility violations on landing page', async ({ page }) => {
     await runAccessibilityScan(page);

    });

    
})
