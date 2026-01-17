import { Page } from '@playwright/test';

export class BookDetailsPageLocators {
  constructor(private page: Page) {}

  get bookTitle() {
    return this.page.locator('h1');
  }

  get bookAuthor() {
    return this.page.locator('text=/by .*/');  
  }

  get bookGenre() {
    return this.page.locator('[class*="genre"]');
  }

  get backToLibraryLink() {
    return this.page.getByRole('link', { name: /← Back to Library|home/i });
  }

  get loadingSpinner() {
    return this.page.locator('text=Loading book details...');
  }

  get errorMessage() {
    return this.page.locator('text=Error');
  }

  get notFoundMessage() {
    return this.page.locator('text=/Book not found|Error/');
  }
}