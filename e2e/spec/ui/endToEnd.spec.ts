import { test, expect } from '@playwright/test';
import { HomePage, AddBookPage, BookDetailsPage } from '../../pages';
import { TestDataGenerator } from '../../utility/testDataGenerator';
import { ApiHelper } from '../../utility/apiHelper';

test.describe('End-to-End User Flows', () => {
  let homePage: HomePage;
  let addBookPage: AddBookPage;
  let bookDetailsPage: BookDetailsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    addBookPage = new AddBookPage(page);
    bookDetailsPage = new BookDetailsPage(page);
  });

  test('End-to-end flow: Landing page → Add book → View details → Return to home', async () => {
    await homePage.goto();
    await homePage.verifyOnHomePage();

    await homePage.clickAddNewBook();
    const addedBookTitle = await addBookPage.addCompleteBookWithTitle();
    await addBookPage.verifyBookCreatedAndNavigated();
    expect(addedBookTitle).toBeTruthy();
    await homePage.page.locator(`text=${addedBookTitle}`).click();
    await bookDetailsPage.verifyBookDetailsPageAndAssert(addedBookTitle);
    await bookDetailsPage.clickBackToHome();
    await homePage.verifyOnHomePage();
  });

  test('Validate API status codes and JSON structure for book operations', async ({ page, request, baseURL }) => {
    const apiHelper = new ApiHelper(request, baseURL);
    
    const createdBook = await apiHelper.createBook();
    expect(createdBook.id).toBeTruthy();
    expect(createdBook.title).toBeTruthy();
    expect(createdBook.author).toBeTruthy();
    expect(createdBook.genre).toBeTruthy();
    expect(createdBook.description).toBeTruthy();
    
    const firstGetBook = await apiHelper.getBookById(createdBook.id);
    expect(firstGetBook.id).toBe(createdBook.id);
    expect(firstGetBook.title).toBe(createdBook.title);
    expect(firstGetBook.author).toBe(createdBook.author);
    expect(firstGetBook.genre).toBe(createdBook.genre);
    expect(firstGetBook.description).toBe(createdBook.description);
    expect(firstGetBook.rating).toBe(createdBook.rating);
    expect(firstGetBook.isbn).toBe(createdBook.isbn);
    expect(firstGetBook.pages).toBe(createdBook.pages);
    expect(firstGetBook.publishedYear).toBe(createdBook.publishedYear);
    
    const secondGetBook = await apiHelper.getBookById(createdBook.id);
    expect(secondGetBook.id).toBe(firstGetBook.id);
    expect(secondGetBook.title).toBe(firstGetBook.title);
    expect(secondGetBook.author).toBe(firstGetBook.author);
    expect(secondGetBook.genre).toBe(firstGetBook.genre);
    expect(secondGetBook.description).toBe(firstGetBook.description);
    expect(secondGetBook.rating).toBe(firstGetBook.rating);
  });

  test('Verify newly added book details on landing page using API and UI validation', async ({ page, request, baseURL }) => {
    const apiHelper = new ApiHelper(request, baseURL);
    const createdBook = await apiHelper.createBook();
    await homePage.goto();
    await homePage.verifyBookDisplayedWithAllDetails(createdBook);
  });

  test('Add book with Japanese characters and verify correct display on user interface', async ({ page }) => {
    const japaneseBook = TestDataGenerator.validBook.japanese;
    await homePage.goto();
    await homePage.clickAddNewBook();
    await addBookPage.fillAndSubmit(japaneseBook);
    await addBookPage.verifyBookCreatedAndNavigated();
    expect(await bookDetailsPage.getBookTitle()).toContain('テスト駆動開発');
    await bookDetailsPage.clickBackToHome();
    await homePage.verifyBookDisplayedOnLandingPage('テスト駆動開発', 'ケント・ベック');
  });
});
