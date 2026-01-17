import { Page, expect } from "@playwright/test";
import { BookDetailsPageLocators } from '../locator';
import { BasePage } from "./base.page";


export class BookDetailsPage extends BasePage {
  page: Page;
  locators: BookDetailsPageLocators;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.locators = new BookDetailsPageLocators(page);
  }

  async goto(id?: number | string) {
    if (id !== undefined) {
      await this.page.goto(`/book/${id}`);
    }
    else
    {
      await this.page.goto('/books')
  }
  }

  async getBookTitle() {
    return this.locators.bookTitle.textContent();
  }

 get errorMsg() {
  return this.page.locator("//p[text() ='Book not found']");
}

  async getBookDetails() {
    const title = await this.locators.bookTitle.textContent();
    const author = await this.locators.bookAuthor.textContent();
    const genre = await this.locators.bookGenre.textContent();
    return { title, author, genre };
  }



  async clickBackToLibrary() {
    await this.locators.backToLibraryLink.click();
    await this.waitForPageLoad();
  }

  async clickBackToHome() {
    await this.locators.backToLibraryLink.click();
    await this.waitForPageLoad();
  }


  async isBookDisplayed() {
    const title = await this.locators.bookTitle.count();
    return title > 0;
  }

  async verifyBookDetailsPage() {
    await this.page.waitForURL(/\/book\/\d+/, { timeout: 5000 });
    const title = await this.getBookTitle();
    expect(title).toBeTruthy();

  }

  async verifyBookDetailsPageAndAssert(addedBookTitle: string) {
    await this.page.waitForURL(/\/book\/\d+/, { timeout: 5000 });
    const title = await this.getBookTitle();
    expect(title).toContain(addedBookTitle);

  }



  async checkForEmptyDetails() {
    const details = await this.getBookDetails();

    return {
      isTitleEmpty: !details.title || details.title.trim() === '',
      isAuthorEmpty: !details.author || details.author.trim() === '',
      isGenreEmpty: !details.genre || details.genre.trim() === '',
      hasEmptyFields:
        !details.title || details.title.trim() === '' ||
        !details.author || details.author.trim() === '' ||
        !details.genre || details.genre.trim() === ''
    };
  }

  /**
   * Verify that none of the book details are empty
   * @throws Error if any required field is empty
   */
  async verifyNoEmptyDetails() {
    const result = await this.checkForEmptyDetails();

    if (result.isTitleEmpty) {
      throw new Error('Book title is empty');
    }
    if (result.isAuthorEmpty) {
      throw new Error('Book author is empty');
    }
    if (result.isGenreEmpty) {
      throw new Error('Book genre is empty');
    }

    return true;
  }
}