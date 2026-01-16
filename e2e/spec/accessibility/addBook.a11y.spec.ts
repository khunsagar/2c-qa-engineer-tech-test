import { test } from "@playwright/test";
import { addBookPage } from '../../pages/addbook.page';
import { runAccessibilityScan } from '../../utility/accessibility.utils';

test.describe('Accessibility tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/',{ waitUntil: 'networkidle' });
    });

    test('should have no accessibility violations on add Book page', async ({ page }) => {
     await addBookPage.clickAddBookButton(page);
     await page.waitForTimeout(5000);
     await runAccessibilityScan(page);
    });

    
})
