import { test, expect } from '@playwright/test';
import { AddBookPage, BookDetailsPage, HomePage } from '../../pages';

test.describe('Book Details Page', () => {
    let bookDetailsPage: BookDetailsPage;
    let addBookPage: AddBookPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        bookDetailsPage = new BookDetailsPage(page);
        addBookPage = new AddBookPage(page);
        homePage = new HomePage(page);
        await homePage.goto();
        await homePage.clickBookCard(1);
    });

    test('should display book details for valid ID', async ({ page }) => {
       
        await homePage.clickBookCard(1);
        expect(await bookDetailsPage.isBookDisplayed()).toBeTruthy();
        await bookDetailsPage.verifyBookDetailsPage();
    });

    test('should show 404 for invalid book ID', async ({ page }) => {
        await bookDetailsPage.goto(99999);

        const hasError = await bookDetailsPage.hasError();
        expect(hasError).toBeTruthy();
    });

    test('should navigate back to home page when customer clicks Back to Library button', async () => {
        
        await addBookPage.clickBackToLibraryButton();
        await addBookPage.verifyOnHomePage();
    });

    test('should navigate back to home page when customer clicks ← Back to Library link ', async () => {
        
        await addBookPage.clickBackToLibrary();
        await addBookPage.verifyOnHomePage();
    });


});
