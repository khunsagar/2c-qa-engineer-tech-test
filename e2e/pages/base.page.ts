import { Page } from "@playwright/test";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUrl(expectedPath: string | RegExp) {
    if (typeof expectedPath === 'string') {
      await this.page.waitForURL(expectedPath, { timeout: 5000 });
    } else {
      await this.page.waitForURL(expectedPath, { timeout: 5000 });
    }
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async navigateToBookDetails(id: number | string) {
    await this.goto(`/book/${id}`);
  }
}
