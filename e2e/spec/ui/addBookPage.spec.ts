import { test } from '@playwright/test';
import { AddBookPage } from '../../pages';

test.describe('Add Book Page', () => {
    let addBookPage: AddBookPage;

    test.beforeEach(async ({ page }) => {
        addBookPage = new AddBookPage(page);
        await addBookPage.goto();
    });

    test.skip('should create book with valid data', async () => {
        await addBookPage.addCompleteBook();
        await addBookPage.verifySuccessMessage();
        await addBookPage.verifyBookCreatedAndNavigated();
    });

    test('should show error for missing title', async () => {
        await addBookPage.fillAuthorOnly();
        await addBookPage.verifyTitleErrorMessage();
    });

    test('should show error for missing author', async () => {
        await addBookPage.fillTitleOnly();
        await addBookPage.verifyAuthorErrorMessage()
    });

    test('should navigate back to home page when customer clicks cancel', async () => {
        await addBookPage.clickCancel();
        await addBookPage.verifyOnHomePage();
    });

    test('should navigate back to home page when customer clicks ← Back to Library', async () => {
        await addBookPage.clickBackToLibrary();
        await addBookPage.verifyOnHomePage();
    });
});
