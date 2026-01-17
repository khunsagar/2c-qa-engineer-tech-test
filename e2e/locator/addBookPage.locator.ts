import { Page } from '@playwright/test';

const SUCCESS_MESSAGE = 'Book Added Successfully';

export class AddBookPageLocators {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getFieldByLabel(labelPattern: string | RegExp) {
    return this.page.getByLabel(labelPattern);
  }

  get titleField() {
    return this.page.getByLabel(/title/i);
  }

  get authorField() {
    return this.page.getByLabel(/author/i);
  }

  get genreField() {
    return this.page.getByLabel(/genre/i);
  }

  get publishedYearField() {
    return this.page.getByLabel(/published year/i);
  }

  get descriptionField() {
    return this.page.getByLabel(/description/i);
  }

  get isbnField() {
    return this.page.getByLabel(/isbn/i);
  }

  get pagesField() {
    return this.page.getByLabel(/pages/i);
  }

  get ratingField() {
    return this.page.getByLabel(/rating/i);
  }

  get submitButton() {
    return this.page.getByRole('button', { name: /add book/i });
  }

  get successMessage() {
    return this.page.locator(`text=${SUCCESS_MESSAGE}`);
  }

  get errorMessage() {
    return this.page.locator('[class*="error"], [class*="text-red"]');
  }

  get backToHomeLink() {
    return this.page.getByRole('link', { name: /back|home/i });
  }
}