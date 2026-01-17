import { Page, expect } from "@playwright/test";

/**
 * Base page class with common navigation and utility methods
 * All page objects should extend this class
 */
export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL path
   */
  async goto(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'networkidle' });
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify current URL matches expected path
   */
  async verifyUrl(expectedPath: string | RegExp) {
    if (typeof expectedPath === 'string') {
      await this.page.waitForURL(expectedPath, { timeout: 5000 });
    } else {
      await this.page.waitForURL(expectedPath, { timeout: 5000 });
    }
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Navigate back to home/landing page
   */
  async navigateToHome() {
    await this.goto('/');
  }

  /**
   * Navigate to add book page
   */
  async navigateToAddBook() {
    await this.goto('/add-book');
  }

  /**
   * Navigate to book details page
   */
  async navigateToBookDetails(id: number | string) {
    await this.goto(`/book/${id}`);
  }

  /**
   * Verify navigated to home page with optional element visibility check
   */
  async verifyOnHomePage(checkElement: boolean = true) {
    await this.page.waitForURL('/', { timeout: 5000 });
    const title = await this.getPageTitle();
    expect(title).toBe('Book Library - QA Engineer Tech Test');
   }

  /**
   * Verify navigated to add book page
   */
  async verifyOnAddBookPage() {
    await this.page.waitForURL('/add-book', { timeout: 5000 });
  }

  /**
   * Verify navigated to book details page
   */
  async verifyOnBookDetailsPage(id?: number | string) {
    if (id) {
      await this.page.waitForURL(`/book/${id}`, { timeout: 5000 });
    } else {
      await this.page.waitForURL(/\/book\/\d+/, { timeout: 5000 });
    }
  }
}
