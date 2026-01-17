import { Page, expect } from "@playwright/test";
import { AddBookPageLocators } from '../locator';
import { HomePage } from "./landing.page";
import { RandomDataGenerator } from "../utility/randomDataGenerator";
import { BasePage } from "./base.page";


export class AddBookPage extends BasePage{
  page: Page;
  locators: AddBookPageLocators;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.locators = new AddBookPageLocators(page);
  }

  async goto() {
    await this.page.goto('/add-book', { waitUntil: 'networkidle' });
  }

  async fillField(labelPattern: string | RegExp, value: string | number) {
    await this.locators.getFieldByLabel(labelPattern).fill(value.toString());
  }

  async submitForm() {
    await this.locators.submitButton.click();
  }

  async addCompleteBookWithTitle() {
    const apiResponsePromise = this.page.waitForResponse(
      response => response.url().includes('/api/books') && response.status() === 201,
      { timeout: 10000 }
    );
    
    await this.fillAndSubmit();
    
    try {
      const response = await apiResponsePromise;
      const bookData = await response.json();
      return bookData.title;
    } catch (error) {
      console.error('Failed to capture API response:', error);
      throw error;
    }
  }

  async fillAndSubmit(bookData?: any) {
    const data = bookData || {};
    
    await this.fillField(/title/i, data.title || RandomDataGenerator.randomTitle());
    await this.fillField(/author/i, data.author || RandomDataGenerator.randomAuthor());
    await this.locators.genreField.selectOption({ value: data.genre || 'Fiction' });
    await this.locators.publishedYearField.fill(data.publishedYear?.toString() || '2024');
    await this.fillField(/description/i, data.description || RandomDataGenerator.randomDescription());
    await this.fillField(/isbn/i, data.isbn || RandomDataGenerator.randomISBN());
    await this.fillField(/pages/i, data.pages || RandomDataGenerator.randomPages());
    await this.fillField(/rating/i, data.rating || RandomDataGenerator.randomRating());
    await this.submitForm();
  }



async isSuccessDisplayed() {
  try {
    await this.locators.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    return true;
  } catch (e) {
    return false; 
  }
}

  async getErrorMessage() {
    return this.locators.errorMessage.textContent();
  }

  async verifySuccessMessage() {
    expect(await this.isSuccessDisplayed()).toBeTruthy();
  }

  async verifyBookCreatedAndNavigated() {
    await this.page.waitForURL(/\/book\/\d+/, { timeout: 5000 });

  }

  async verifyTitleErrorMessage() {
    await expect(this.locators.titleField).toHaveJSProperty('validationMessage', 'Please fill out this field.');
  }

  async verifyAuthorErrorMessage() {
    await expect(this.locators.authorField).toHaveJSProperty('validationMessage', 'Please fill out this field.');
  }

  async verifyPublisherErrorMessage() {
    await this.locators.authorField.fill('Test Author');
    await this.locators.titleField.fill('Test Title');
    await this.locators.publishedYearField.fill('000000');
    await this.submitForm();
    await expect(this.locators.publishedYearField).toHaveJSProperty('validationMessage', 'Value must be greater than or equal to 1000.');
  }

   async verifyPagesErrorMessage() {
    await this.locators.authorField.fill('Test Author');
    await this.locators.titleField.fill('Test Title');
    await this.locators.publishedYearField.fill('1001');
    await this.locators.pagesField.fill('-1');
    await this.submitForm();
    await expect(this.locators.pagesField).toHaveJSProperty('validationMessage', 'Value must be greater than or equal to 1.');
  }

  async verifyAddBookPage() {
    try {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForURL('/add-book', { timeout: 3000 });
      await expect(this.page.getByRole('heading', { name: 'Add New Book' })).toBeVisible({ timeout: 3000 });
    } catch (error) {
      throw new Error(`Add Book page verification failed. Current URL}`);
    }
  }

  async clickBackToHome() {
    await this.locators.backToHomeLink.click();
    return new HomePage(this.page);
  }

  async clickCancel() {
    await this.page.getByRole('link', { name: /cancel/i }).click({timeout: 5000});
  }

  async clickBackToLibrary() {
    await this.page.getByRole('link', { name:/← back to library/i}).click({timeout: 5000});
  }

  async clickBackToLibraryButton() {
    await this.page.getByRole('link', { name:/Back to Library/i }).first().click({timeout: 5000});
  }
 
  async addCompleteBook() {
    await this.fillAndSubmit();
  }


  async fillAuthorOnly() {
    await this.fillField(/author/i, 'Test Author');
    await this.submitForm();
  }

  async fillTitleOnly() {
    await this.fillField(/title/i, 'Test Title');
    await this.submitForm();
  }

  async verifyOnHomePage() {
    await this.page.waitForURL('/', { timeout: 5000 });
  }
}

export const addBookPage = {
  clickAddBookButton: async (page: Page) => {
    await page.getByRole('link', { name: 'Add New Book' }).click();
    await page.waitForLoadState('networkidle');
  },

  clickViewDetailsLink: async (page: Page) => {
    await page.getByText('View details →').click();
  }
};