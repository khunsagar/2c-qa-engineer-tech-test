import { Page } from '@playwright/test';

export class HomePageLocators {
  constructor(private page: Page) {}

  get pageTitle() {
    return this.page.locator('h1:has-text("Book Library")');
  }

  get addNewBookButton() {
    return this.page.locator('a[href="/add-book"]');
  }

  get bookCards() {
    return this.page.locator('a[href^="/book/"]');
  }

  get viewDetailsLinks() {
    return this.page.getByText('View details →');
  }

  viewDetailsLink(index: number) {
    return this.viewDetailsLinks.nth(index);
  }

  get loadingSpinner() {
    return this.page.locator('text=Loading books...');
  }

  get errorMessage() {
    return this.page.locator('text=Error');
  }

  get bookTitles() {
    return this.page.locator('a[href^="/book/"] h2');
  }

  get bookAuthors() {
    return this.page.locator('a[href^="/book/"] p.text-gray-600.font-medium');
  }

  bookTitle(index: number) {
    return this.bookCards.nth(index).locator('h2, h3, [data-testid="book-title"], .book-title').first();
  }

  bookAuthor(index: number) {
    return this.bookCards.nth(index).locator('[data-testid="book-author"], .book-author, p:has-text(/Author:|by /i)').first();
  }

  bookRating(index: number) {
    return this.bookCards.nth(index).locator('[data-testid="book-rating"], .book-rating, [class*="rating"]:has-text(/⭐|Rating/)').first();
  }
}