import { test } from '@playwright/test';
import { checkBrokenLinks } from './../../utility/checkLinks';


test.describe('Landing page links', () => {
  test('Verify all links load successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await checkBrokenLinks(page);

  });
});
