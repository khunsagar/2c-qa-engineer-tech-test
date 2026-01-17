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

   // can be covered in unit test
    test('should show error for missing title', async () => {
        await addBookPage.fillAuthorOnly();
        await addBookPage.verifyTitleErrorMessage();
    });
    // can be covered in unit test
    test('should show error for missing author', async () => {
        await addBookPage.fillTitleOnly();
        await addBookPage.verifyAuthorErrorMessage()
    });
    // can be covered in unit test
    test('should show error for invalid  Published Year', async () => {
        await addBookPage.verifyPublisherErrorMessage()
    });

      // can be covered in unit test
     test('should show error for invalid pages values ', async () => {
        await addBookPage.verifyPagesErrorMessage()
    });

    test('should navigate back to home page when customer clicks cancel', async () => {
        await addBookPage.clickCancel();
        await addBookPage.verifyOnHomePage();
    });

    test('should navigate back to home page when customer clicks ← Back to Library', async () => {
        await addBookPage.clickBackToLibrary();
        await addBookPage.verifyOnHomePage();
    });

})
   test.describe('unit tests', () => {
    test.fixme('should throw an error when customer try to select null or blank Genre', async () => {
     // TODO: Implement test
    });
     test.fixme('should select first genre option', async () => {
        // TODO: Implement test
    });
     test.fixme('should select last genre option', async () => {
        // TODO: Implement test
    });
    test.fixme('shoudl have charater limit for title field ', async () => {
        // TODO: Implement test
    });
    test.fixme('should have character limit for author field ', async () => {
        // TODO: Implement test
    });
    

})
