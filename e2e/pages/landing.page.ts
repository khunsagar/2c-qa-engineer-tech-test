import { Page, expect } from "@playwright/test";
import { HomePageLocators } from '../locator';
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  page: Page;
  locators: HomePageLocators;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.locators = new HomePageLocators(page);
  }

  async clickAddNewBook() {
    try {
      await this.locators.addNewBookButton.click({ timeout: 5000 });
      await this.verifyUrl('/add-book');
      console.log('✓ Navigated to Add Book page');
    } catch (error) {
      const currentUrl = await this.page.url();
      console.error('✗ Failed to navigate to Add Book page. Current URL:', currentUrl);
      throw new Error(`Navigation to /add-book failed. Current URL: ${currentUrl}`);
    }
  }

  async clickBookCard(index: number = 0) {
    await this.locators.viewDetailsLink(index).click({timeout: 5000});
    await this.waitForPageLoad();
  }

  async getBookCards() {
    return this.locators.bookCards;
  }



  async getBooksCount() {
    return this.locators.bookCards.count();
  }

  async verifyAddBookPageNavigation() {
    await this.verifyUrl('/add-book');
  }

  async verifyOnHomePage() {
    await this.verifyUrl('/');
  }

  async verifyBookDisplayedOnLandingPage(title: string, author: string) {
    await this.page.locator(`text=${title}`).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(`text=${author}`).waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyBookDisplayedWithAllDetails(bookData: any) {
    const { id, title, author, genre, description, rating } = bookData;
  
    const bookCard = this.page.locator(`a[href="/book/${id}"]`);
    await bookCard.waitFor({ state: 'visible', timeout: 5000 });

    await bookCard.locator(`h2`).filter({ hasText: title }).waitFor({ state: 'visible', timeout: 5000 });
    await bookCard.locator(`text=by ${author}`).waitFor({ state: 'visible', timeout: 5000 });
    await bookCard.locator(`text=${genre}`).waitFor({ state: 'visible', timeout: 5000 });
    await bookCard.locator(`text=${description}`).waitFor({ state: 'visible', timeout: 5000 });
    await bookCard.locator(`text=${rating}`).waitFor({ state: 'visible', timeout: 5000 });
  }

  async assertAllBooksHaveTitleAndAuthor() {
    const titles = await this.locators.bookTitles.allTextContents();
    const authors = await this.locators.bookAuthors.allTextContents();

    expect(titles.length).toBeGreaterThan(0);
    titles.forEach((title, i) => {
      expect(title.trim(), `Book at index ${i} title should not be empty`).not.toBe('');
    });

    authors.forEach((author, i) => {
      expect(author.trim(), `Book at index ${i} author should not be empty`).not.toBe('');
    });
  }

  async assertBooksListPersistsAfterRefresh() {
    const initialTitles = await this.locators.bookTitles.allTextContents();
    expect(initialTitles.length).toBeGreaterThan(0);
    await this.page.reload();
    await this.waitForPageLoad();
    const refreshedTitles = await this.locators.bookTitles.allTextContents();
    expect(refreshedTitles).toEqual(initialTitles);
  }
}
