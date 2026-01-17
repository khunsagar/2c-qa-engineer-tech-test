import { Page, expect } from '@playwright/test';

export async function checkBrokenLinks(page: Page) {
  const links = await page.locator('a').all();

  for (const link of links) {
    const href = await link.getAttribute('href');
    if (!href || href.startsWith('javascript:')) continue;

    const response = await page.request.get(href);
    expect(response.status(), `Broken link: ${href}`).toBeLessThan(400);
  }
}
